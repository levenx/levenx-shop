// pages/index/items/user/user.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    menus: [{
        icon: 'balance-list-o',
        name: '待付款',
        type: 'pay'
      },
      {
        icon: 'logistics',
        name: '待收货',
        type: 'wait'
      },
      {
        icon: 'completed',
        name: '已完成',
        type: 'done'
      }, {
        icon: 'orders-o',
        name: '全部订单',
        type: 'all'
      }
    ]
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
      console.log("页面被隐藏")
    },
    resize: function(size) {
      // 页面尺寸变化
      console.log("页面尺寸变化")
    }
  },
  lifetimes: {
    created: function() {
      //在组件实例刚刚被创建时执行
      console.log("在组件实例刚刚被创建时执行")

    },
    attached: function() {
      //在组件实例进入页面节点树时执行
      console.log("在组件实例进入页面节点树时执行")
    },
    ready: function() {
      //在组件在视图层布局完成后执行
      console.log("在组件在视图层布局完成后执行")
      const userInfo = app.globalData.userInfo;
      const {
        avatarUrl,
        nickName,
        admin
      } = userInfo;
      this.setData({
        avatar: avatarUrl,
        nickName,
        admin
      })
    },
    moved: function() {
      //在组件实例被移动到节点树另一个位置时执行
      console.log("在组件实例被移动到节点树另一个位置时执行")
    },
    detached: function() {
      //在组件实例被从页面节点树移除时执行
      console.log("在组件实例被从页面节点树移除时执行")
    },
    error: function(err) {
      //每当组件方法抛出错误时执行
      console.log("每当组件方法抛出错误时执行")
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    gotoLogin: function() {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },
    menusClick: function(event) {
      const isLogin = wx.getStorageSync("isLogin");
      if (!isLogin) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
        return;
      }
      const {
        type
      } = event.currentTarget.dataset;
      switch (type) {
        case "wait":
          wx.navigateTo({
            url: `/pages/order/list/list?type=3`
          })
          break;
        case "done":
          wx.navigateTo({
            url: `/pages/order/list/list?type=4`
          })
          break;
        case "all":
          wx.navigateTo({
            url: `/pages/order/list/list?type=1`
          })
          break;
        case "pay":
          wx.navigateTo({
            url: `/pages/order/list/list?type=2`
          })
          break;
        case "collect":
          wx.navigateTo({
            url: '/pages/collect/collect'
          })
          break
      }
    },
    scan: function() {
      wx.scanCode({
        scanType: 'qrCode',
        success: function({
          result
        }) {
          wx.navigateTo({
            url: `/pages/scan/scan?uid=${result}`
          })
          app.request("/login/doScan/scan", "post", {
            uid: result
          });
        },
        fail: function(err) {

        }
      })
    }
  }
})