const { wxConfig } = require("../config");
const { appid, secret } = wxConfig;
const axios = require("axios");

class WxUtils {

    static async code2Session(code) {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
        const result = await axios.get(url);
        console.log("===>", result)
        return { openid: result.data.openid }
    }


}

module.exports = WxUtils;