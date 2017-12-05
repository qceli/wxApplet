//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(JSON.stringify(res))
    //     var code = res.code;
    //     wx.setStorageSync('code', code);
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // wx.request({
    //   url: 'https://yakai.wshoto.com/login/ApiLogin',
    //   method: 'GET',
    //   data: {
    //     apiname: 'yakai',
    //     apipass: '69534b32ab51f8cb802720d30fedb523'
    //   },
    //   success: function (res) {
    //    var apiToken = res.data.result;
    //    console.log(apiToken)
    //    wx.setStorageSync('apiToken', apiToken);
    //   }

    // })
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb === "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          that.globalData.userInfo = res
          typeof cb === "function" && cb(that.globalData.userInfo)
        },
        fail: function (res) {
          console.log('app.js getUserInfo fail.');
          // that.globalData.userInfo = res
          typeof cb === "function" && cb(res)
        }
      })
    }
  },
  authorize : function (type, cb) {
    let that = this;
    // $scopeLists = ['scope.userInfo', 'scope.address', 'scope.userLocation'];

    wx.getSetting({
      success: (res) => {
        if (res.authSetting[type] === false) {

          wx.authorize({
            scope: type,
            success() {
              that.callback({ statusCode: 1, data: true }, cb)
            },
            fail() {
              that.callback({ statusCode: 0, data: false }, cb)
            }
          });

        } else {
          that.callback({ statusCode: 1, data: true }, cb)
        }
      }
    })

  },
  callback: function (res, cb) {
    if (typeof cb === "object" || typeof cb === "function") {
      if (typeof cb === "function") {
        cb(res);
        return true;
      }

      if (res.statusCode === 1) {
        if (typeof cb.success === "function") {
          cb.success(res);
        }
      } else {
        if (typeof cb.fail === "function") {
          cb.fail(res);
        }
      }

      if (typeof cb.complete === 'function') {
        cb.complete(res);
      }
    }

    return res;
  },
  globalData: {
    userInfo: null,
    debug: true
  }
})