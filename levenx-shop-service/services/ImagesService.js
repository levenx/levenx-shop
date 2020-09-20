const { Result } = require('../common/Result');
const { ImagesDB } = require("../dbService");

class ImagesServices {

    static async search(ctx, next) {
        const { pn, ps } = ctx.request.body;
        ctx.body = new Result({ banners, waterfalls })
    }

}

module.exports = ImagesServices;