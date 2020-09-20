const { Result } = require('../common/Result');
const { GoodsDB, CollectDB, ShopCarDB } = require("../dbService");
const { redis, get } = require("../dbService/redis");

class HomeServices {

    static async detail(ctx, next) {
        const openid = ctx.openid;
        const { id } = ctx.params;
        let goodsCache = await get(`goods:${id}`);
        let details;
        if (goodsCache) {
            details = JSON.parse(goodsCache);
        } else {
            let { data } = await GoodsDB.doc(id).get();
            details = data[0];
            redis.set(`goods:${id}`, JSON.stringify(details));
        }
        let { total: collects } = await CollectDB.where({ goodsId: id, openid }).count();
        Object.assign(details, { isCollect: collects > 0 });
        return new Result(details)
    }

}

module.exports = HomeServices;