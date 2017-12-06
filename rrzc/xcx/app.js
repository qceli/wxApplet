var wshoto = require('./utils/wshoto.js');

App({
  onLaunch: function () {
    var that = this
    if (wshoto.config.debug) {
      console.log('app run getSessionSync.');
    }
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.wwWidth = res.windowWidth
        that.globalData.wwHeight = res.windowHeight
      }
    })

  },
  getSessionKey: function (cb) {
    var that = this;
    console.log(this.globalData.sessionkey);
    console.log(wx.getStorage("keythree"))
    if (this.globalData.sessionkey != null) {
      wshoto.func.callback(wshoto.func.setData(that.globalData.sessionkey, 0), cb);
    } else {
      wshoto.func.getSession(function (sessionKey) {
        if (sessionKey) {
          var nowTime = Math.floor(Date.now() / 1000);
          sessionKey = sessionKey.data;

          if (sessionKey.time > nowTime) {
            /*
             * 测试session是否过期（因过期问题，出现很多异常问题。
             */
            wshoto.func.getSessionCheck(sessionKey, {
              success: function (checkRes) {
                that.globalData.sessionkey = checkRes.data.key;
                wshoto.func.callback(wshoto.func.setData(checkRes.data.key, 0), cb);
              },
              fail: function () {
                wshoto.func.wechatLogin(cb);
              }
            });
          } else {
            wshoto.func.wechatLogin(cb);
          }

        } else {
          wshoto.func.wechatLogin(cb);
        }
      });
    }
  },
  getUserInfo: function (cb) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wshoto.func.getUserInfo(function (res) {
        that.globalData.userInfo = res;
        typeof cb == "function" && cb(that.globalData.userInfo)
      });
    }
  },
  globalData: {
    sessionkey: null,
    userInfo: null
  },

  getstorge:function(){
    var that = this
    wx.getStorage({
      key: 'keythree',
      success: function (res) {
        console.log("res.data--------------" + res.data)  
      }
    })
  },
  getuserinfo:function(){
    
  },

});