const { redis, get } = require("../dbService/redis");
const { UserDB ,GoodsDB} = require("../dbService");
const { Result } = require("../common/Result");
class CommonService {

    static async upload(ctx) {
        const files = ctx.request.files;
        const fileContent = fs.createReadStream(files.file.path);
        const cloudPath = `${uuidv4().replace(/-/g, '')}.${files.file.name.split('.')[1]}`;
        const [result] = await uploadFile(cloudPath, fileContent);
        let { fileID, mime_type, tempFileURL } = result;
        ImagesDB.add({ fileID, mime_type, url: tempFileURL, createAt: new Date() });
        return {
            name: cloudPath,
            status: "done",
            thumbUrl: result.tempFileURL,
            url: result.tempFileURL
        };
    }

    static async search(ctx) {
        const { q } = ctx.query;
        if (!q) {
            return new Result([]);
        } else {
            let { data: list } = await GoodsDB.where({
                name: new RegExp(q)
            }).get();
            return new Result(list);
        }
    }

    static async my(ctx) {
        const openid = ctx.openid;
        let userCache = await get(`user:${openid}`);
        let user;
        if (userCache) {
            userCache = JSON.parse(userCache);
            user = userCache;
        } else {
            const { data: users } = await UserDB.where({ openid }).get();
            user = users[0];
            if(user){
                redis.set(`user:${openid}`, JSON.stringify(user));
            }
        }
        return new Result(user);
    }

}

module.exports = CommonService;