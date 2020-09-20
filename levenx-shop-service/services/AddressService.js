const { PageResult, Result } = require('../common/Result');
const { AddressDB } = require("../dbService");
const { _ } = require('../dbService/database');

class ClassifyService {

    static async address(ctx, next) {
        const openid = ctx.openid;
        const { data: addresses } = await AddressDB.where({ openid }).get();
        const [address] = addresses;
        return new Result(address);
    }

}

module.exports = ClassifyService;