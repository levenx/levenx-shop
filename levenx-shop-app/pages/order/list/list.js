// pages/order/list/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', '待付款', '待收货', '已完成'],
    active: 1,
    orderMap: {},
    pageMap: {
      1: {
        pn: 0,
        ps: 10,
        loading: false
      },
      2: {
        pn: 0,
        ps: 10,
        loading: false
      },
      3: {
        pn: 0,
        ps: 10,
        loading: false
      },
      4: {
        pn: 0,
        ps: 10,
        loading: false
      }
    },
    currentOrders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      type
    } = options;
    type = type ? Number(type) : type;
    if (typeof type === 'number' && type) {
      this.setData({
        active: type
      })
    } 
      this.initOrders(type);
  },
  typeChange: async function(event) {
    const {
      index
    } = event.detail;
    this.setData({
      active: index + 1
    })
    this.initOrders(index + 1);
  },

  //初始化订单数据
  initOrders: async function(type = 1) {
    let {
      orderMap,
      pageMap,
    } = this.data;
    let {
      pn,
      ps,
      count,
      loading
    } = pageMap[type];

    if (!orderMap[type]) {
      this.setData({
        currentOrders: [],
        loading: true
      })
      let {
        code,
        data,
        count: total
      } = await app.request("/order/list", "post", {
        type,
        pn,
        ps
      });
      orderMap[type] = data;
      pageMap[type] = {
        pn,
        ps,
        count: total
      }
    }
    this.setData({
      currentOrders: orderMap[type],
      loading: false,
      pageMap: Object.assign({}, pageMap)
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
    debugger
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {
    const {
      orderMap,
      pageMap,
      active,
    } = this.data;
    const order = orderMap[active] || [];
    const {
      pn,
      ps,
      count,
      loading
    } = pageMap[active];
    if (pageMap[active].loading) {
      return false;
    }
    if ((pn + 1) * ps > count) {
      return false;
    }
    pageMap[active] = {
      pn: pn + 1,
      ps,
      loading: true
    }
    this.setData({
      pageMap: Object.assign({}, pageMap)
    })
    let {
      code,
      count: total,
      data
    } = await app.request("/order/list", "post", {
      pn: pn + 1,
      ps,
      type: active
    })
    orderMap[active] = order.concat(data);
    pageMap[active] = {
      pn: pn + 1,
      ps,
      count: total,
      loading: false
    }
    this.setData({
      currentOrders: orderMap[active],
      pageMap: Object.assign({}, pageMap)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})