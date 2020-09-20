 // pages/comment/comment.js
 const app = getApp();
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     star: 0,
     content: ''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     const {
       orderId = "b5416b755f58458e0168df0a35076f8a",
         goodsId = "ac5f38825f5e3195017b043928587f96"
     } = options;
     this.setData({
       orderId: orderId,
       goodsId: goodsId
     })
     //请求接口
     this.commentGood(goodsId)
   },

   //初始化数据
   commentGood: async function(id) {
     let {
       code,
       data
     } = await app.request(`/goods/detail/${id}`);
     if (code === 0) {
       this.setData({
         commentDetail: data
       })
     }
   },

   //编辑评论内容
   onChange(event) {
     this.setData({
       star: event.detail,
     });
   },

   onComment: function(e) {
     this.setData({
       content: e.detail.text
     })
   },

   //提交评论
   onSubmit: async function() {
     wx.showLoading({
       title: '评论中...'
     })
     const data = this.data;
     const comments = [{
       "goodsId": data.goodsId,
       "content": data.content,
       "star": data.star
     }];
     let res = await app.request("/comment", "post", {
       orderId: data.orderId,
       comments: comments
     });
     wx.hideLoading();
     wx.showToast({
       title: '评论成功',
       duration: 1500
     })
     setTimeout(() => {
       wx.reLaunch({
         url: '/pages/order/list/list?type=3',
       });
     }, 1500)
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

   }
 })