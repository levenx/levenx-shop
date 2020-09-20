// pages/shopCar/shopCar.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allCheck: true,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initShopCar();
  },

  //初始化数据
  initShopCar: async function() {
    let {
      code,
      data: shopCars
    } = await app.request("/shopcar/search");
    let totalPrice = 0;
    let totalNum = 0;
    let checks = this.data.checks || {};
    for (let {
        _id,
        price,
        num
      } of shopCars) {
      checks[_id] = checks.hasOwnProperty(_id) ? checks[_id] : true;
      if (checks[_id]) {
        totalPrice += price * num;
        totalNum += num;
      }
    }
    totalPrice *= 100;
    this.setData({
      shopCars,
      checks,
      totalNum,
      totalPrice,
      loading: false
    })
  },
  
  //删除购物车商品
  shopcarDel: async function(event) {
    const {
      position,
      instance
    } = event.detail;
    const {
      detail
    } = event.currentTarget.dataset;
    let {
      code,
      data
    } = await app.request(`/shopcar/del/${detail._id}`, "delete");
    if (code === 0) {
      this.initShopCar();
    }
    instance.close();
  },

  //选择商品
  checkChange: function(event) {
    const {
      checks,
      shopCars
    } = this.data;
    const {
      index,
      detail
    } = event.currentTarget.dataset;
    const flag = event.detail;
    checks[detail["_id"]] = flag;

    let totalPrice = 0;
    let totalNum = 0;
    for (let {
        _id,
        price,
        num
      } of shopCars) {
      if (checks[_id]) {
        totalPrice += price * num;
        totalNum += num;
      }
    }
    totalPrice *= 100;

    this.setData({
      checks,
      totalPrice,
      totalNum,
      allCheck: flag
    })
  },

  //全选
  checkAllChange: function(event) {
    const {
      shopCars
    } = this.data;
    const flag = event.detail;
    if (!flag) {
      this.setData({
        checks: {},
        allCheck: false,
        totalPrice: 0,
        totalNum: 0
      })
    } else {
      let totalPrice = 0;
      let totalNum = 0;
      let checks = this.data.checks || {};
      for (let {
          _id,
          price,
          num
        } of shopCars) {
        checks[_id] = checks.hasOwnProperty(_id) ? checks[_id] : true;
        if (checks[_id]) {
          totalPrice += price * num;
          totalNum += num;
        }
      }
      totalPrice *= 100;
      this.setData({
        checks,
        allCheck: true,
        totalPrice,
        totalNum
      })
    }
  },
  numChange: async function(event) {
    const num = event.detail;
    const {
      index,
      detail
    } = event.currentTarget.dataset;
    let result = await app.request("/shopcar/alter", "post", {
      num,
      id: detail._id
    });
    this.initShopCar();
  },

  //结算
  ensureOrder: function() {
    const {
      shopCars,
      checks
    } = this.data;
    let targeOrder = shopCars.map(item => {
      if (checks[item._id]) {
        return item;
      }
    }).filter(it => {
      if (it) {
        return it;
      }
    })
    wx.navigateTo({
      url: `/pages/order/ensure/ensure?detail=${JSON.stringify(targeOrder)}`,
    })
  },
  gotoHome: function() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})