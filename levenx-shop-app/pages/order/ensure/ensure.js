// pages/order/ensure/ensure.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      detail
    } = options;
    if (!detail) {
      wx.navigateTo({
        url: '/pages/shopCar/shopCar',
      })
    }
    const orders = JSON.parse(detail);
    let total = 0;
    for (let {
        price,
        num
      } of orders) {
      total += Number(price) * Number(num);
    }
    this.setData({
      orders,
      total: total * 100
    })
    this.initAddress();
  },
  initAddress: async function() {
    let {
      code,
      data
    } = await app.request("/address");
    if (data) {
      this.setData({
        address: data
      })
    }
  },
  sendChange: function(event) {
    console.log(event.detail)
  },

  //选择收货地址
  addressSelelct: function(event) {
    wx.chooseAddress({
      success: ({
        userName,
        telNumber,
        provinceName,
        cityName,
        countyName,
        detailInfo
      }) => {
        this.setData({
          address: {
            userName,
            telNumber,
            provinceName,
            cityName,
            countyName,
            detailInfo
          }
        })
      }
    })
  },

  // 确认订单
  orderEnsure: async function() {
    this.setData({
      loading: true
    })
    const {
      orders,
      sendType,
      address
    } = this.data;
    if (!address && sendType === 0) {
      wx.showModal({
        title: '提示',
        content: '请选择收货地址'
      })
      this.setData({
        loading: false
      })
      return;
    }
    let {
      code,
      data
    } = await app.request("/order", "post", {
      orders,
      sendType,
      address
    });
    if (code === 0) {
      const {
        orderId,
        totalPrice
      } = data;
      wx.redirectTo({
        url: `/pages/pay/pay?orderId=${orderId}&totalPrice=${totalPrice}`
      })
    } else {
      wx.showToast({
        title: '下单失败'
      })
    }
    this.setData({
      loading: false
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