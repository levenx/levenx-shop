// pages/pay/pay.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      orderId,
      totalPrice
    } = options;
    this.setData({
      orderId,
      totalPrice
    });
  },

  //订单支付
  payEvent: function() {
    const {
      orderId,
      totalPrice
    } = this.data;

    wx.startSoterAuthentication({
      requestAuthModes: ["fingerPrint", "facial"],
      challenge: "pay",
      success: function(e) {
        wx.showModal({
          title: '支付',
          content: `需要支付${totalPrice}元`,
          success: async(res) => {
            if (res.confirm) {
              let result = await app.request("/order/pay", "post", {
                orderId
              });
              wx.showToast({
                title: '支付成功',
                duration: 1000,
                complete: function(e) {
                  setTimeout(() => {
                    wx.reLaunch({
                      url: '/pages/order/list/list?type=1'
                    })
                  }, 1000)
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: function(err) {

      }
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