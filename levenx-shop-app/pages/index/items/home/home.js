// pages/index/items/home/home.js
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
    goods: [{
      icon: 'https://6c65-levenx-shop-5g87ysxef8ce26a0-1253629794.tcb.qcloud.la/60ebb36b2ab14d879d79999c0ead84fb.jpg',
      name: '单品',
      classify: "aa133ce55f588a4800fa030c5282daf6"
    }, {
      icon: 'https://6c65-levenx-shop-5g87ysxef8ce26a0-1253629794.tcb.qcloud.la/beabfd4833614fedb74bf8e0103f437b.jpg',
      name: '混合',
      classify: "aa133ce55f58f01200fe08fa6b206509"
    }, {
      icon: 'https://6c65-levenx-shop-5g87ysxef8ce26a0-1253629794.tcb.qcloud.la/704b402de32c482b9c712f06ac1a2bf5.jpg',
      name: '礼品',
      classify: "65825b355f588a5f01089fd47e2cadb9"
    }, {
      icon: 'https://6c65-levenx-shop-5g87ysxef8ce26a0-1253629794.tcb.qcloud.la/704b402de32c482b9c712f06ac1a2bf5.jpg',
      name: '花剪',
      classify: '7498b5fe5f58cdb9014030c72ede155b'
    }, {
      icon: 'https://6c65-levenx-shop-5g87ysxef8ce26a0-1253629794.tcb.qcloud.la/704b402de32c482b9c712f06ac1a2bf5.jpg',
      name: '花艺课',
      classify: "b5416b755f58cdd1017216720155e928"
    }, {
      icon: 'https://6c65-levenx-shop-5g87ysxef8ce26a0-1253629794.tcb.qcloud.la/704b402de32c482b9c712f06ac1a2bf5.jpg',
      name: '鲜花包月',
      classify: "8a6c3bf65f58cdec0104fedf1efe4c23"
    }],
    banners: [],
    page: {
      pn: 0,
      ps: 10,
      count: 0
    },
    waterfalls: {}
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      console.log("页面被展示")

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

      this.homeInit();

      this.setData({
        URL: app.globalData.URL
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
    bannerClick: function(e) {
      const {
        id
      } = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/details/details?id=${id}`,
      })
    },

    //加载页面数据
    loadImages: async function() {
      let {
        waterfalls,
        page
      } = this.data;
      let {
        pn,
        ps,
        count: all
      } = page;
      if (all && pn * ps >= all) {
        this.setData({
          loading: false,
          done: true
        })
        return;
      }

      this.setData({
        loading: true,
      });
      let {
        code,
        count,
        data
      } = await app.request("/goods/waterfalls", "post", {
        pn,
        ps
      });
      let mid = Math.floor(data.length / 2);
      waterfalls.left = waterfalls.left.concat(data.splice(0, mid));
      waterfalls.right = waterfalls.right.concat(data);

      Object.assign(page, {
        pn: pn + 1,
        count
      })
      this.setData({
        waterfalls,
        page,
        loading: false,
      })
    },
    menuClick: function(event) {
      const {
        classify
      } = event.currentTarget.dataset;
      this.triggerEvent("MenusClick", {
        classify
      });
    },
    homeInit: async function() {
      let {
        code,
        data
      } = await app.request("/home");
      if (code === 0) {
        this.setData({
          banners: data.banners,
          waterfalls: data.waterfalls
        })
      }
    },
    gotoShopCar: function() {
      wx.navigateTo({
        url: '/pages/shopCar/shopCar',
      })
    },
    searchFocus: function() {
      wx.navigateTo({
        url: '/pages/search/search'
      })
    }
  }
})