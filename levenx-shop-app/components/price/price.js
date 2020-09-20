// components/price.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: "0.00"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},
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
      const {
        num
      } = this.data;
      let prices = String(num).split(".");
      this.setData({
        priceInteger: prices[0],
        priceDecimal: `.${prices.length > 1? prices[1] : '00'}`
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

  }
})