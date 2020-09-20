// components/order/order.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orders: {
      type: Array,
      value: []
    },
    loading: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    //去支付
    payEvent: function(event) {
      const {
        detail
      } = event.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/pay/pay?orderId=${detail._id}`,
      })
    },

    //确认收货
    ensureOrderEvent: async function(event) {
      const {
        detail
      } = event.currentTarget.dataset;
      let {
        code,
        data
      } = await app.request("/order/ensure", "post", {
        orderId: detail._id
      });
      if (code === 0) {
        wx.showModal({
          title: '收货确认',
          content: "确认收货吗？",
          success(res) {
            if (res.confirm) {
              wx.showToast({
                title: '收货成功',
                duration: 1000
              })
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/order/list/list?type=3'
                })
              }, 1000)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },

    //再次购买
    buyAgain: async(event) => {
      wx.showLoading({
        title: '加载中..'
      })
      const {
        detail
      } = event.currentTarget.dataset;
      let goods = detail.detail;
      let goodsIds = goods.map(item => item.goodsId);
      for (let goodsId of goodsIds) {
        let result = await app.request("/shopcar/create", "post", {
          _id: goodsId
        })
      }
      wx.hideLoading();
      wx.navigateTo({
        url: `/pages/shopCar/shopCar`
      })
    },

    //添加评论
    gotoComment: function(event) {
      const {
        detail
      } = event.currentTarget.dataset;
      let goods = detail.detail;
      let goodsIds = goods.map(item => item.goodsId);
      //评论
      wx.navigateTo({
        url: `/pages/addComment/addComment?orderId=${detail._id}&goodsId=${goodsIds}`,
      })
    }
  }
})