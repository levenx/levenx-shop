// pages/index/items/classify/classify.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    defaultIndex: {
      type: String,
      value: 0
    }
  },
  observers: {
    'defaultIndex': function(classifyId) {
      if (classifyId) {
        const {
          classify = [],
            detailsCache
        } = this.data;
        let index = classify.findIndex(it => it._id === classifyId);
        this.setData({
          classifyIndex: index,
        })
        this.classifyDetail(classifyId);
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    classify: [],
    detailsCache: {},
    currentDetails: [],
    classifyIndex: 0
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
      this.classifyInit();
      this.classifyDetail();

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
    watchOther: function() {
      const {
        classify
      } = this.data;
      this.setData({
        classifyIndex: 0
      })
      this.classifyDetail(classify[0]._id);
    },
    classifyClick: function(event) {
      const {
        index,
        detail
      } = event.currentTarget.dataset;
      this.classifyDetail(detail._id);
      this.setData({
        classifyIndex: index,
      })
    },
    classifyInit: async function() {
      let {
        code,
        data
      } = await app.request("/classify/all");
      this.setData({
        classify: data
      })
    },
    classifyDetail: async function(id = "aa133ce55f588a4800fa030c5282daf6") {
      const {
        detailsCache
      } = this.data;
      if (!detailsCache[id]) {
        this.setData({
          loading: true
        })
        let {
          code,
          data
        } = await app.request(`/classify/goods/relation/${id}`);
        detailsCache[id] = data;
      }
      this.setData({
        currentDetails: detailsCache[id],
        loading: false
      })
    },
    detailClick: function(event) {
      const {
        id
      } = event.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/details/details?id=${id}`,
      })
    },
    searchFocus: function() {
      wx.navigateTo({
        url: '/pages/search/search'
      })
    }
  }
})