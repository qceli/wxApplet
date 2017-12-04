//app.js
App({
  globalData: {
    appID: 'wx249efc3abe5c0462',
    secret: '088270832768c0b189681b4ed8101aa4',
    domain: 'https://api.smalltown.wshoto.com/',
    imgUrl: 'https://api.smalltown.wshoto.com/Public/images/microprogram/',
    userInfo: '',
    openId: ''
  },
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: function (loginCode) {
        var appid = 'wx249efc3abe5c0462'; //填写微信小程序appid  
        var secret = '088270832768c0b189681b4ed8101aa4'; //填写微信小程序secret  
        var code = loginCode.code;
        console.log("code:" + loginCode.code)
        wx.request({
          url: 'https://api.smalltown.wshoto.com/Home/WxOpt/getOpenid',
          data: {
            code: loginCode.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            getApp().globalData.openId = res.data.openid;        //获取openid  
          }
        })
      }
    })  

  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          console.log("res.userInfo:" + res.userInfo)
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

})
