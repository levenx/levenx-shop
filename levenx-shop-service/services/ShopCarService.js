const { Result } = require('../common/Result');
const { GoodsDB, ShopCarDB } = require("../dbService");

class ShopCarService {

    static async create(ctx, next) {
        const { _id } = ctx.request.body;
        let { data: goodsDatas } = await GoodsDB.where({ _id }).get();
        let { data: shopDatas } = await ShopCarDB.where({ goodsId: _id, openid: ctx.openid }).get();
        let goodsData = goodsDatas[0];
        delete goodsData.images;
        delete goodsData._id;

        let result;
        if (!!shopDatas.length) {
            let shopCar = shopDatas[0];
            result = await ShopCarDB.doc(shopCar._id)
                .update({ num: shopCar.num + 1, totalPrice: goodsData.price * (shopCar.num + 1), done: true });
        } else {
            Object.assign(goodsData, { num: 1, openid: ctx.openid, goodsId: _id, totalPrice: goodsData.price });
            result = await ShopCarDB.add(goodsData);
        }
        let { total } = await ShopCarDB.where({ goodsId: _id, openid: ctx.openid }).count();
        return new Result({ total, result })
    }

    static async search(ctx, next) {
        let { data } = await ShopCarDB.where({ openid: ctx.openid }).get();
        return new Result(data)
    }

    static async alter(ctx, next) {
        const { num, id } = ctx.request.body;
        let result = await ShopCarDB.doc(id).update({ num });
        return new Result(result)
    }

    static async count(ctx, next) {
        let { total } = await ShopCarDB.where({ openid: ctx.openid }).count();
        return new Result({ total })
    }

    static async del(ctx, next) {
        const { id } = ctx.params;
        let result = await ShopCarDB.doc(id).remove();
        return new Result(result)
    }

}

module.exports = ShopCarService;