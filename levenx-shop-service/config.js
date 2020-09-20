const config = {
    //app路由前缀
    appPrefix: "",
    //鉴权 jwt 加密key
    jwtKey: "xxxx",
    //微信小程序配置信息
    wxConfig: {
        appid: "xxxxx",
        secret: "xxxxx"
    },
    //云开发配置信息
    cloudbaseConfig: {
        env: 'xxxxx',
        secretId: 'xxxxx',
        secretKey: 'xxxxx'
    },
    //缓存redis配置信息
    redisConfig: {
        host: '127.0.0.1',
        password: 'xxxxx'
    }
}

module.exports = config;