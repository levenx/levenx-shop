const { Result } = require("../common/Result");
const wxUtils = require("../utils/wx");
const { UserDB } = require("../dbService");
const { AuthCustom } = require("../middleware/JwtCustom");
const { redis } = require("../dbService/redis");
const qr = require("qr-image");
class LoginService {

    static async sign(ctx, next) {
        const { code } = ctx.request.body;
        const { openid } = await wxUtils.code2Session(code);
        let result = await AuthCustom.sigin(openid);
        return new Result({ token: result });
    }

    static async qr(ctx) {
        const { uid } = ctx.query;
        var img = qr.image(uid, { size: 10 });
        ctx.type = 'image/png';
        return img;
    }

    static async scan(ctx) {
        const { operate } = ctx.params;
        const { uid } = ctx.request.body;
        const openid = ctx.openid;
        const { data: users } = await UserDB.where({ openid }).get();
        const [user] = users;
        let result = {};
        switch (operate) {
            case "author":
                let token = AuthCustom.sigin(openid);
                Object.assign(result, { uid, token, operate: "done" });
                break;
            case "scan":
                Object.assign(result, { uid, operate: "scan", ...user });
                break;
        }
        redis.publish("login", JSON.stringify(result));
        return new Result();
    }
}
module.exports = LoginService;