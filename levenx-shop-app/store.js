export default {
  data: {
    motto: 'Hello World',
  },
  globalData: ['globalPropTest', 'ccc.ddd'],
  logMotto: function() {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}