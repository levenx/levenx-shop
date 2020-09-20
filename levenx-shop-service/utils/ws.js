const url = require("url");

const wsMap = new Map();
const loginMap = new Map();

//ws 处理器
const webSocket = (wss) => {
    wss.on("connection", (ws, req) => {
        const customUrl = url.parse(req.url).pathname;
        switch (customUrl) {
            case "/login/scan":
                scanLogin(ws, req);
                break

        }
    });
};

function scanLogin(ws, req) {
    const uid = url.parse(req.url, true).query.uid;
    console.log("uid:", uid);
    loginMap.set(uid, ws);

    //发送信息
    ws.on("message", (data) => {
        console.log(data)
        // const reciverWs = loginMap.get(uid);
        // reciverWs.send("xxxxx")
        // const { reciver, message } = JSON.parse(data);
        // const reciverWs = wsMap.get(reciver);
        // if (reciverWs) {
        //     reciverWs.send(`${openid}:${message}`);
        // } else {
        //     console.log(`reciver ${reciver} Miss`);
        // }
    });

    //关闭连接
    ws.on("close", () => {
        wsMap.delete(uid);
    });
}

const socketCache = {
    loginMap: () => {
        return loginMap;
    }
}


module.exports = { WebSocketApi: webSocket, socketCache };
