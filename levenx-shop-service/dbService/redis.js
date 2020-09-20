const redis = require('redis');
const { redisConfig } = require("../config");
const { host, password } = redisConfig;

//初始化redis连接
const client = redis.createClient(6379, host, { password, db: 5, prefix: 'shop_' });

//get放假 promise 化
const get = (key) => new Promise((resolve, reject) => {
    client.get(key, (err, v) => {
        if (err) {
            reject(err);
        } else {
            resolve(v);
        }
    })
});

module.exports = {
    redis: client,
    get: get,
    set: client.set,
    del: client.del,
    publish: client.publish
}