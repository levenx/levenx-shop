// pages/login/login.js
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

  },
  loginEvent: async function(e) {
    const {
      avatarUrl,
      gender,
      nickName
    } = e.detail.userInfo;
    let result = await app.request("/users/register", "post", e.detail.userInfo);
    wx.setStorageSync("avatar", avatarUrl);
    wx.setStorageSync("nickname", nickName);
    wx.setStorageSync("isLogin", true);
    let {
      code,
      data = {}
    } = await app.request("/common/my");
    app.globalData.userInfo = data;
    app.globalData.openid = data.openid;
    wx.navigateBack({

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