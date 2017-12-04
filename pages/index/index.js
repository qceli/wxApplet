//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    displaySend: '',
    displayNext: 'none',
    displayTips: '',
    displayMobile: '',
    displayCode: 'none',
    displayErrorCode: 'none',
    buttonDisable: 'true',
    verifyCodeTime: ''
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      // if (userInfo)
      console.log("userInfo" + userInfo);
      that.setData({
        userInfo:userInfo
      })
    })  
  },
  usernameInputEvent: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  mobileInputEvent: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getCode: function(e) {
    var mobile = this.data.mobile;
    var username = this.data.username; 
    console.log("username" + username) 
    var regMobile = /^1\d{10}$/;
    if (username == undefined || username == '') {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'loading'
      })
      return false;
    }
    if (!regMobile.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading'
      })
      return false;
    } else {
      var displayNext = this.data.displayNext == '' ? 'none' : '';
      var displaySend = this.data.displaySend == '' ? 'none' : '';
      var displayMobile = this.data.displayMobile == '' ? 'none' : '';
      var displayCode = this.data.displayCode == '' ? 'none' : '';
      var displayTips = this.data.displayTips == '' ? 'none' : '';
      this.setData({
        displayNext: displayNext,
        displaySend: displaySend,
        displayMobile: displayMobile,
        displayCode: displayCode,
        displayTips: displayTips
      });
      var that = this     
      var c = 60;
      var intervalId = setInterval(function () {
        c = c - 1;
        that.setData({
          verifyCodeTime: c + 's后',
          buttonDisable: true
        })
        if (c == 0) {
          clearInterval(intervalId);
          that.setData({
            verifyCodeTime: ' ',
            buttonDisable: false
          })
        }
      }, 1000)
      this.setData({
        intervalId: intervalId
      });
      console.log("发送短信验证码")
      wx.request({
        url: app.globalData.URL + '/pss/validate/authCode?mobile=' + mobile,
        data: {},
        method: 'GET',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          var data = res.data;
          console.log("发送短信接口调用成功")

        }
      })
    }
    
  },
  getCodes: function (e) {
    console.log('获取验证码');
    var mobile = this.data.mobile;
    var that = this
    var c = 60;
    var intervalIds = setInterval(function () {
      c = c - 1;
      that.setData({
        verifyCodeTime: c + 's后',
        buttonDisable: true
      })
      if (c == 0) {
        clearInterval(intervalIds);
        that.setData({
          verifyCodeTime: ' ',
          buttonDisable: false
        })
      }
    }, 1000)
    this.setData({
      intervalIds: intervalIds
    });
    console.log("重新发送短信验证码")
    wx.request({
      url: app.globalData.URL + '/pss/validate/authCode?mobile=' + mobile,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        console.log("重新发送验证码成功")
        this.setData({
          displayErrorCode: 'none'
        })

      }.bind(this)
    })
  },
  goBackEvent: function (e) {
    console.log("back");
    var displayNext = this.data.displayNext == '' ? 'none' : '';
    var displaySend = this.data.displaySend == '' ? 'none' : '';
    var displayMobile = this.data.displayMobile == '' ? 'none' : '';
    var displayCode = this.data.displayCode == '' ? 'none' : '';
    var displayTips = this.data.displayTips == '' ? 'none' : '';
    this.setData({
      displayNext: displayNext,
      displaySend: displaySend,
      displayMobile: displayMobile,
      displayCode: displayCode,
      displayErrorCode: 'none',
      displayTips: displayTips
    });
    clearInterval(this.data.intervalId);
    clearInterval(this.data.intervalIds);
    
  },
  codeInputEvent: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  identifyCode: function(e) {
    var that = this
    console.log('验证 验证码');
    var verificationCode = /^1\d{10}$/; 
    wx.request({  // that.data.rCode
      url: app.globalData.URL + '/pss/validate/chatAuth?openId=' + wx.getStorageSync('openid') + '&unionid=' + wx.getStorageSync('unionid') + '&mobile=' + that.data.mobile + '&smCode=' + this.data.code + '&name=' + this.data.username,
      data: {},
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        if (data.result == 0) {
          if (data.user != '') {
            var token = data.token;
            try {
              wx.setStorageSync('chatToken', token)
            } catch (e) {
            }
            wx.redirectTo({
              url: '../recentlist/recentlist?chatToken=' + token
            })
          } else {
            var token = data.token;
            try {
              wx.setStorageSync('chatToken', token)
            } catch (e) {
            }
            wx.navigateTo({
              url: '../complete/complete?chatToken=' + token
            })

          }
        }
        if (data.result == 20007){
          var displayErrorCode = this.data.displayErrorCode == 'none';
          this.setData({
            displayErrorCode: displayErrorCode
          });
        }
        if (data.result == 20012) {
          wx.redirectTo({
            url: '../nomate/nomate'
          })
        }
        
      }.bind(this)
    })

  }
})
