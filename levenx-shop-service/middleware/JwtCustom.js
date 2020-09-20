const koaJwt = require("koa-jwt");
const jwtToken = require("jsonwebtoken");
const config = require("../config");

/**
 * jwt签名和校验方法集
 */
const AuthCustom = {
  //jwt 生成 token
  sigin: (payload, options = { expiresIn: "1h" }) => {
    const { expiresIn } = options;
    const token = jwtToken.sign({ payload }, config.jwtKey, { expiresIn });
    return token;
  },
  //jwt 校验 token
  verify: (ctx, decodedToken, token) => {
    const { payload } = decodedToken;
    ctx.openid = payload;
    ctx.control = payload;
    return false;
  },
};


/**
 * jwt鉴权中间件
 * @param {[]}} unAuths
 */
const JwtCustom = (unAuths) => {
  return koaJwt({
    secret: config.jwtKey,
    isRevoked: AuthCustom.verify,
  }).unless({
    path: unAuths,
  });
};

module.exports = { JwtCustom, AuthCustom };
