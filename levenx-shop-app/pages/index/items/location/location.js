// pages/index/items/location/location.js
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
    markers: {
      iconPath: "http://custom.static.levenx.com/flower",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 80,
      height: 80
    },
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: 'http://custom.static.levenx.com/flower',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    mapClick: function() {
      const {
        markers
      } = this.data;
      wx.openLocation({
        latitude: markers.latitude,
        longitude: markers.longitude,
        scale: 28
      })
    },
    callPhone: function() {
      wx.makePhoneCall({
        phoneNumber: '1340000'
      })
    }
  }
})