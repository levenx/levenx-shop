const http = require('http');
const url = require("url");
const WebSocket = require('ws');
const Redis = require('./Redis');
const qr = require('qr-image');

// http服务器初始化
const server = http.createServer(function (request, response) {
    const customUrl = url.parse(request.url).pathname;
    switch (customUrl) {
        case "/levenx-shop-ws/login/qr":
            qrImages(request, response);
            break;
    }
});

//初始化 服务的 ws 实例
const ws = new WebSocket.Server({ server });

//登陆 ws 缓存集合
const loginMap = new Map();
// 订单 ws 集合
const orderList = [];

//login 订阅者
new Redis().subscribe("login", (topic, message) => {
    const msg = JSON.parse(message);
    const reciverWs = loginMap.get(msg.uid);
    if (reciverWs) {
        reciverWs.send(message);
    }
})

//order 订阅者
new Redis().subscribe("order", (topic, message) => {
    for (let ws of orderList) {
        ws.send(message)
    }
})

//websocket 连接
ws.on('connection', function connection(ws, req) {
    const customUrl = url.parse(req.url).pathname;
    console.log("customUrl:", customUrl)
    switch (customUrl) {
        case "/levenx-shop-ws/login/scan":
            scanLogin(ws, req);
            break
        case "/levenx-shop-ws/order":
            orderEvent(ws, req);
            break
    }
});

//登陆二维码生成接口
function qrImages(request, response) {
    const uid = url.parse(request.url).query.split("=")[1];
    var img = qr.image(uid, { size: 10 });
    response.writeHead(200, { 'Content-Type': 'image/png' });
    var responseData = [];//存储文件流
    if (img) {//判断状态
        img.on('data', function (chunk) {
            responseData.push(chunk);
        });
        img.on('end', function () {
            var finalData = Buffer.concat(responseData);
            response.write(finalData);
            response.end();
        });
    }
}

function orderEvent(ws, req) {
    if (ws) {
        orderList.push(ws);
    }
}

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
        loginMap.delete(uid);
    });
}

server.listen(8800, () => {
    console.log("app started on 8800")
});