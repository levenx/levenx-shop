const { PageResult, Result } = require('../common/Result');
const { OrderDB, ShopCarDB, AddressDB } = require("../dbService");
const { redis, publish } = require("../dbService/redis");
const { _ } = require('../dbService/database');

class OrderService {

    static async doOrder(ctx, next) {
        const openid = ctx.openid;
        const { orders: detail, sendType, address } = ctx.request.body;
        //校验是否付款成功
        Object.assign(address, { openid, updateAt: new Date() })

        const { data: addressRet } = await AddressDB.where({ openid }).get();
        if (!!addressRet.length) {
            const _id = addressRet[0]._id;
            delete address._id;
            await AddressDB.doc(_id).set(address);
        } else {
            await AddressDB.add(address);
        }

        let shopcarIds = [];
        let totalPrice = 0;
        for (let { _id, price, num } of detail) {
            shopcarIds.push(_id);
            totalPrice += Number(price) * Number(num);
        }
        const params = Object.assign({}, { openid, detail, sendType, address, pay: false, totalPrice, createAt: new Date(), updateAt: new Date() })
        let result = await OrderDB.add(params);

        // 删除购物车
        await ShopCarDB.where({ _id: _.in(shopcarIds) }).remove();
        return new Result({ orderId: result.id, totalPrice });
    }

    static async doPay(ctx) {
        const { orderId } = ctx.request.body;
        //校验是否付款成功

        //修改状态
        let { data: orderes } = await OrderDB.doc(orderId).get();
        let result = await OrderDB.doc(orderId).update({ pay: true, send: false });

        //发送订单推送
        redis.publish("order", JSON.stringify(orderes[0]));
        return new Result(result);
    }

    static async ensure(ctx) {
        const openid = ctx.openid;
        const { orderId } = ctx.request.body;

        //修改状态
        let result = await OrderDB.doc(orderId).update({ send: true });

        return new Result(result);
    }


    static async list(ctx) {
        const openid = ctx.openid;
        const { type, pn, ps } = ctx.request.body;
        let params = {};
        switch (type) {
            case 2:
                Object.assign(params, { pay: false, openid });
                break
            case 3:
                Object.assign(params, { pay: true, send: false, openid });
                break;
            case 4:
                Object.assign(params, { pay: true, send: true, openid });
                break;
        }
        let { data: result } = await OrderDB.where(params).orderBy("createAt", "desc").skip(pn * ps).limit(ps).get();
        let { total: count } = await OrderDB.where(params).count();
        return new PageResult(result, { pn, ps, count });
    }

    static async adminList(ctx) {
        const { type, pn, ps } = ctx.request.body;
        let params = {};
        switch (type) {
            case 2:
                Object.assign(params, { pay: false });
                break
            case 3:
                Object.assign(params, { pay: true, send: false });
                break;
            case 4:
                Object.assign(params, { pay: true, send: true });
                break;
        }
        let { data: result } = await OrderDB.where(params).orderBy("createAt", "desc").skip(pn * ps).limit(ps).get();
        let { total: count } = await OrderDB.where(params).count();
        return new PageResult(result, { pn, ps, count });
    }

    static async adminDel(ctx) {
        const openid = ctx.openid;
        const { id } = ctx.params;
        let result = await OrderDB.doc(id).remove();
        return new Result(result);
    }

}

module.exports = OrderService;