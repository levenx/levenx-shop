const { Result } = require('../common/Result');
const { UserDB } = require("../dbService");

class UsersServices {

    static async register(ctx, next) {
        const openid = ctx.openid;
        let { data } = await UserDB.where({ openid }).get();
        const body = ctx.request.body;
        Object.assign(body, { openid, updataAt: new Date() });
        let result;
        if (!!data.length) {
            result = await UserDB.doc(data[0]._id).update(body);
        } else {
            Object.assign(body, { createAt: new Date() })
            result = await UserDB.add(body);
        }
        return new Result(body);
    }

}

module.exports = UsersServices;