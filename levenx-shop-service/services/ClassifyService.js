const { PageResult, Result } = require('../common/Result');
const { ClassifyDB, ClassifyGoodsDB, GoodsDB } = require("../dbService");
const { _ } = require('../dbService/database');

class ClassifyService {

    static async create(ctx, next) {
        const body = ctx.request.body;
        Object.assign(body, { updateAt: new Date() })
        const _id = body._id;
        if (_id) {
            delete body._id;
            let result = await ClassifyDB.doc(_id).update(body);
        } else {
            Object.assign(body, { createAt: new Date() })
            let result = await ClassifyDB.add(body);
        }
        return new Result()
    }

    static async search(ctx, next) {
        const { pn, ps } = ctx.request.body;
        let { data } = await ClassifyDB.skip(pn * ps).limit(ps).orderBy("weight", "asc").get();
        let { total } = await ClassifyDB.count();
        return new PageResult(data, { pn, ps, count: total });
    }

    static async all(ctx, next) {
        let { data: result } = await ClassifyDB.orderBy("weight", "asc").get();
        return new Result(result);
    }


    static async relationAdd(ctx, next) {
        const { classifyId, goodsIds } = ctx.request.body;
        for (let goodsId of goodsIds) {
            let result = await ClassifyGoodsDB.add({ classifyId, goodsId, createAt: new Date(), updateAt: new Date() });
        }
        return new Result();
    }

    static async relationSearch(ctx, next) {
        const { id } = ctx.params;
        let { data } = await ClassifyGoodsDB.where({ classifyId: id }).field({ 'goodsId': true }).get();
        let goodsIds = [];
        for (let { goodsId } of data) {
            goodsIds.push(goodsId);
        }
        let { data: restult } = await GoodsDB.where({ _id: _.in(goodsIds) }).field({ name: true, price: true, graph: true, updateAt: true }).get();
        return new Result(restult);
    }

    static async del(ctx, next) {
        const { id } = ctx.params;
        let { data: relations } = await ClassifyGoodsDB.where({ classifyId: id }).remove();
        let result = await ClassifyDB.doc(id).remove();
        return new Result(result)
    }

}

module.exports = ClassifyService;