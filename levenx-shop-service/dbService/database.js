const tcb = require('@cloudbase/node-sdk');
const { cloudbaseConfig } = require("../config");
const { env, secretId, secretKey } = cloudbaseConfig;
//初始化云数据库连接
const app = tcb.init({
    env,
    secretId,
    secretKey
})

const db = app.database();
const _ = db.command;

//文件上传
const uploadFile = async (cloudPath, fileContent) => {
    let result = await app.uploadFile({ cloudPath, fileContent });
    let urlRet = await app.getTempFileURL({ fileList: [result.fileID] });
    return urlRet.fileList;
}

module.exports = {
    db,
    uploadFile,
    _
}