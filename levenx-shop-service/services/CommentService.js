const { PageResult, Result } = require('../common/Result');
const { GoodsDB, OrderDB, UserDB } = require("../dbService");
const { redis } = require("../dbService/redis");
const { _ } = require('../dbService/database');

class CommentService {

    static async comment(ctx, next) {
        const openid = ctx.openid;
        const { data: users } = await UserDB.where({ openid }).get();
        const [user] = users;
        const body = ctx.request.body;
        const { comments: newComments, orderId } = body;

        for (let newComment of newComments) {
            const { goodsId } = newComment;
            let comment = { openid, nickName: user.nickName, avatar: user.avatarUrl, ...newComment, createAt: new Date() };

            const { data: goodses } = await GoodsDB.doc(goodsId).get();
            const [goods] = goodses;
            const comments = goods.comments || [];
            comments.push(comment);

            const result = await GoodsDB.doc(goodsId).update({ comments });
            redis.del(`goods:${goodsId}`)
        }

        const orderRet = await OrderDB.doc(orderId).update({ comment: true });

        return new Result(orderRet)
    }

}

module.exports = CommentService;