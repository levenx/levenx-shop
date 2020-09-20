const redis = require("redis");

//redis 连接封装
class Redis {

    constructor() {
        this.client = this.init();
    }


    //初始化
    init() {
        const client = redis.createClient(6379, '39.108.168.104', { password: "Levenx0314!", db: 1, prefix: 'shop_' });
        return client;
    }

    //订阅者方法
    subscribe(topic, hook) {
        this.client.subscribe(topic);
        this.client.on("message", hook);
    }

    //发布者方法
    publish(topic, content) {
        this.client.publish(topic, content);
    }

}

module.exports = Redis;