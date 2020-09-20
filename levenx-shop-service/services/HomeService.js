const { Result } = require('../common/Result');
const { GoodsDB, ShopCarDB, ClassifyDB, OrderDB } = require("../dbService");
const { redis, get } = require("../dbService/redis");

class HomeServices {

    static async home(ctx, next) {
        const openid = ctx.openid;
        let homeCache = await get("home");
        let banners;
        let waterfalls;
        let shopCar;
        if (homeCache) {
            homeCache = JSON.parse(homeCache);
            banners = homeCache.banners;
            waterfalls = homeCache.waterfalls;
        } else {
            const { data } = await GoodsDB.field({ name: true, graph: true }).limit(4).get();
            banners = data;
            waterfalls = {
                left: banners.slice(0, 2),
                right: banners.slice(2)
            }
            redis.set("home", JSON.stringify({ banners, waterfalls }))
        }

        let shopCarCache = await get(`shopCar:${openid}`);
        if (shopCarCache) {
            shopCar = shopCarCache;
        } else {
            const { total } = await ShopCarDB.where({ openid }).count();
            shopCar = total;
            redis.set(`shopCar:${openid}`, total);
        }
        return new Result({ banners, waterfalls, shopCar })
    }


    static async adminHome(ctx) {
        let { total: Order } = await OrderDB.where({ pay: true, send: false }).count();
        let { total: Classify } = await ClassifyDB.count();
        let { total: AllOrder } = await OrderDB.count();
        let { total: Goods } = await GoodsDB.count();
        return new Result({ Order, AllOrder, Classify, Goods });
    }

}

module.exports = HomeServices;