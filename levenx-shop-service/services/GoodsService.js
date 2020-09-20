const { Result, PageResult } = require('../common/Result');
const { GoodsDB, ShopCarDB } = require("../dbService");

class GoodsService {

    constructor() {

    }

    static async create(ctx, next) {
        let body = ctx.request.body;
        let result;
        const _id = body._id;
        if (_id) {
            delete body._id;
            Object.assign(body, { updateAt: new Date() })
            result = await GoodsDB.doc(_id).update(body);
        } else {
            Object.assign(body, { createAt: new Date(), updateAt: new Date() })
            result = await GoodsDB.add(body);
        }
        return new Result(result);
    }


    static async adminSearch(ctx) {
        const { pn, ps } = ctx.request.body;
        let count = await GoodsDB.where({}).count();
        let result = await GoodsDB.where({}).orderBy("updateAt", "desc").skip(pn * ps).limit(ps).get();
        return new PageResult(result.data, { pn, ps, count: count.total });
    }

    static async adminAll(ctx) {
        let { data: result } = await GoodsDB.orderBy("updateAt", "desc").field({ name: true, graph: true }).get();
        return new Result(result);
    }

    static async adminDel(ctx) {
        const { id } = ctx.params;
        let result = await GoodsDB.doc(id).remove();
        return new Result(result);
    }

    static async waterfalls(ctx, next) {
        const { pn, ps } = ctx.request.body;
        const { pictureUrl } = ctx;
        let count = await GoodsDB.where({}).count();
        let result = await GoodsDB.where({}).orderBy("updateAt", "desc").field({ name: true, graph: true }).skip(pn * ps).limit(ps).get();
        return new PageResult(result.data, { pn, ps, count: count.total });
    }

}

module.exports = GoodsService