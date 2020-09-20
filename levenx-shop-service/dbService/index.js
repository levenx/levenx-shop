const { db } = require("./database");


//初始化云数据库的表连接
module.exports = {
    UserDB: db.collection('user'),
    GoodsDB: db.collection('goods'),
    ShopCarDB: db.collection('shopCar'),
    ImagesDB: db.collection("images"),
    UserDB: db.collection("user"),
    ClassifyDB: db.collection("classify"),
    ClassifyGoodsDB: db.collection("classify-goods-r"),
    CollectDB: db.collection("collect"),
    OrderDB: db.collection("order"),
    AddressDB: db.collection("address")
}