// components/empty/empty.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    description: {
      type: String,
      value: "暂时没有信息"
    },
    btnVisible: {
      type: Boolean,
      value: false
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
    gotoHome: function(event) {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})