// pages/details/details.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast.js';
import store from '../../store'
import create from '../../utils/create'
import util from '../../utils/util'
const app = getApp();

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    showShare: false,
    active: 1,
    options: [{
        name: '微信',
        icon: 'wechat',
        openType: 'share',
        image: "https://img.yzcdn.cn/vant/share-icon-wechat.png"
      },
      {
        name: '二维码',
        icon: 'qrcode',
        image: "https://img.yzcdn.cn/vant/share-icon-qrcode.png"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const {
      id
    } = options;
    //请求接口
    this.initGoods(id);
    this.initShopCar();
  },

  //初始化数据
  initGoods: async function(id) {
    let {
      code,
      data
    } = await app.request(`/goods/detail/${id}`);
    if (code === 0) {
      if (data.comments) {
        const newComments = data.comments.map(item => ({ ...item,
          createAt: util.formatTime(new Date(), item.createAt)
        }));
        this.setData({
          comments: newComments
        })
      }
      this.setData({
        detail: data
      })
    };
  },
  initShopCar: async function() {
    const {
      data
    } = await app.request("/shopcar/count");
    this.setData({
      shopChar: data.total
    })
  },

  //加入购物车
  addShopCar: async function() {
    const isLogin = wx.getStorageSync("isLogin");
    if (!isLogin) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    const {
      detail
    } = this.data;
    let result = await app.request("/shopcar/create", "post", {
      _id: detail._id
    })
    this.initShopCar();
    this.setData({
      addFlag: true
    }, () => {
      setTimeout(() => {
        this.setData({
          addFlag: false
        })
      }, 2000);
    })
  },

  //立即购买
  immediateOrder: function(event) {
    const isLogin = wx.getStorageSync("isLogin");
    if (!isLogin) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    const {
      detail
    } = event.currentTarget.dataset;
    const targeOrder = Object.assign({}, detail, {
      num: 1,
      goodsId: detail._id,
      totalPrice: detail.price
    });
    wx.redirectTo({
      url: `/pages/order/ensure/ensure?detail=${JSON.stringify([targeOrder])}`,
    })
  },
  gotoShopCar: function() {
    const isLogin = wx.getStorageSync("isLogin");
    if (!isLogin) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/shopCar/shopCar'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  //点击预览图片
  previewImage(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.detail.images
    })
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
    const {
      detail
    } = this.data;
    return {
      title: `${detail.name}-掌上花店`,
      imageUrl: `${detail.graph}`,
      path: `/pages/details/details?id=${detail._id}`
    }
  },

  //分享
  shareClick(event) {
    const isLogin = wx.getStorageSync("isLogin");
    if (!isLogin) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    this.setData({
      showShare: !this.data.showShare
    });
  },

  //收藏
  async toCollect() {
    const isLogin = wx.getStorageSync("isLogin");
    if (!isLogin) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    const {
      detail
    } = this.data;
    this.setData({
      detail: Object.assign({}, detail, {
        isCollect: !detail.isCollect
      })
    })
    if (detail.isCollect) {
      Toast("取消收藏")
    } else {
      Toast("收藏成功")
    }
    let res = await app.request("/collect/star", "post", {
      goodsId: this.data.detail._id
    });
  },

})