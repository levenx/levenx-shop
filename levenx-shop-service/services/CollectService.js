const { PageResult, Result } = require('../common/Result');
const { CollectDB, GoodsDB } = require("../dbService");
const { _ } = require('../dbService/database');

class CollectService {

    static async isStart(ctx, next) {
        const openid = ctx.openid;
        const { id } = ctx.params;
        let { data: result } = await CollectDB.where({ goodsId: id, openid }).get();
        return new Result(!!result.length)
    }

    static async start(ctx, next) {
        const openid = ctx.openid;
        const { goodsId } = ctx.request.body;
        let { data } = await CollectDB.where({ goodsId }).get();
        let result;
        if (!!data.length) {
            result = await CollectDB.doc(data[0]._id).remove();
        } else {
            result = await CollectDB.add({ openid, goodsId });
        }
        return new Result(result)
    }

    static async list(ctx, next) {
        const openid = ctx.openid;
        const { pn, ps } = ctx.request.body;
        let { total } = await CollectDB.where({ openid }).count();
        let { data } = await CollectDB.where({ openid }).skip(pn * ps).limit(ps).get();
        let goodsIds = data.map(goods => goods.goodsId);
        let { data: result } = await GoodsDB.where({ _id: _.in(goodsIds) }).get();
        return new PageResult(result, { pn, ps, count: total });
    }


}

module.exports = CollectService;