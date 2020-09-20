// pages/collect/collect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: {
      pn: 0,
      ps: 10,
      num: 0,
      loading: false
    },
    loading: true,
    collections: [],
    currentCollections: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //请求接口
    this.loadCollections();
  },

  //加载收藏数据
  loadCollections: async function() {
    let {
      collections,
      page
    } = this.data;
    let {
      pn,
      ps,
      num
    } = page;
    
    let {
      code,
      count,
      data
    } = await app.request("/collect/list", "post", {
      pn,
      ps
    });

    Object.assign(page, {
      pn,
      ps,
      num: count
    })
    this.setData({
      collections: data,
      currentCollections: data,
      page,
      loading: false
    })
  },

  onClick: function(e) {
    const {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const {
      page,
      collections
    } = this.data;
    const collection = collections || [];
    const {
      pn,
      ps,
      num,
      loading
    } = page;
    if (page.loading) {
      return false;
    }
    if ( num &&  (pn + 1) * ps > num) {
      return false;
    }
    Object.assign(page, {
      pn: pn + 1,
      ps,
      loading: true
    })
    this.setData({
      page
    })
    let {
      code,
      count,
      data
    } = await app.request("/collect/list", "post", {
      pn: pn + 1,
      ps
    })
    const collectionMap = collection.concat(data);
    Object.assign(page, {
      pn: pn + 1,
      ps,
      num: count,
      loading: false
    })
    this.setData({
      currentCollections: collectionMap,
      page
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  methods: {
    
  }
})