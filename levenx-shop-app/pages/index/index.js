//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentPage: 0,
    liveItems: [true]
  },
  onLoad: function() {

  },
  pageChange: function(e) {
    const index = typeof(e.detail.current) === 'number' ? e.detail.current : e.detail;
    const {
      liveItems
    } = this.data;
    liveItems[index] = true;
    this.setData({
      currentPage: index,
      liveItems: [].concat(liveItems)
    })
  },
  bindMenusClick: function(event) {
    const {
      classify
    } = event.detail;
    this.setData({
      currentPage: 1,
      defaultIndex: classify
    })
  }
})