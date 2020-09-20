// pages/scan/scan.js
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
      uid
    } = options;
    this.setData({
      uid
    })
  },
  login: async function() {
    const {
      uid
    } = this.data;
    let {
      code
    } = await app.request("/login/doScan/author", "post", {
      uid
    })
    if (code === 0) {
      wx.showToast({
        title: '登陆成功'
      })
      setTimeout(() => {
        wx.navigateBack({

        })
      }, 1000);
    }
  },
  cancel: function() {
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