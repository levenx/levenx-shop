// pages/search/search.js
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
  searchEvent: async function(e) {
    if (this.data.searchTimer) {
      clearTimeout(this.data.searchTimer);
      this.data.searchTimer = null;
    }
    this.data.searchTimer = setTimeout(() => {
      this.search(e);
    }, 1000);

  },
  search: async function(e) {
    let {
      code,
      data
    } = await app.request(`/common/search?q=${e.detail}`);
    this.setData({
      searchs: data
    })
  },
  gotoDetail: function(event) {
    const {
      id
    } = event.currentTarget.dataset;
    wx.redirectTo({
      url: `/pages/details/details?id=${id}`,
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