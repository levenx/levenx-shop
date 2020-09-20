//app.js
import wxUtil from 'minapp-promise';
import store from './store';
App({
  onLaunch: async function() {
    let {
      code,
      data = {}
    } = await this.request("/common/my");
    this.globalData.userInfo = data;
    this.globalData.openid = data.openid;
  },
  globalData: {
    userInfo: null,
    URL: "http://localhost:8801"
    // URL: 'https://miniapp.shop.levenx.com/shop'
  },
  request: function(url, method = "get", data = {}) {
    return new Promise((resolve, reject) => {
      const customUrl = this.globalData.URL + url;
      wx.request({
        url: customUrl,
        method: method || "GET",
        data: data,
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json',
          'authorization': wx.getStorageSync("TOKEN") && `Bearer ${wx.getStorageSync("TOKEN")}`
        },
        dataType: 'json',
        success: async(res) => {
          const {
            status
          } = res.data;
          switch (status) {
            case 0:
              resolve(res.data);
              break;
            case 401:
              await this.tokenRetry();
              let targetRet = await this.request(
                url,
                method,
                data
              )
              resolve(targetRet);
              break;
            default:
              resolve(res.data);
              break;
          }
        },
        fail: function(err) {
          wx.redirectTo({
            url: '/pages/login/login',
          })
          reject(err);
        }
      })
    })
  },
  tokenRetry: async function() {
    let {
      errMsg,
      code
    } = await wxUtil.login();
    if (errMsg === 'login:ok') {
      let {
        data
      } = await this.request(`/login/sign`, "post", {
        code
      })
      wx.setStorageSync("TOKEN", data.token);
    }
  }
})