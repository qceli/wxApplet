// pages/login/login.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }

    that.setData({
      endtime: util.formatTime1(new Date(new Date())),
    })
  },

  personTel: function (e) {
    this.setData({
      personTel: e.detail.value
    })
    wx.setStorageSync('mobile', e.detail.value);
  },
  login: function (e) {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    // var code = wx.getStorageSync('code'); 
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(JSON.stringify(res))
        // var code = code;
        let loginData = {
          'code': res.code,
          'access_token': apiToken.access_token
        }
        esTools.fn.setEmpty().setHeader({
          'content-type': 'application/x-www-form-urlencoded'
        }).signData(loginData).setMethod('post').setExtraUrl('sessionCode').login(function (res) {
          // console.log(res)
          if (res.statusCode === 1) {
            let userInfo = {
              'access_token': apiToken.access_token,
              'sessionkey': res.data.sessionkey,
              'mobile': that.data.personTel,
              'type': 'login'
            }
            esTools.fn.setEmpty().setHeader({
              'content-type': 'application/x-www-form-urlencoded'
            }).signData(userInfo).setMethod('post').setExtraUrl('codeLogin').auth(function (res) {
              if (res.statusCode === 1) {
                console.log("codeLogin---" + JSON.stringify(res))
                wx.setStorageSync('sessionkey', res.data.sessionkey);
                wx.redirectTo({
                  url: '../mine/mine',
                })

              } else if (res.statusCode === -1) {
                wx.showModal({
                  title: '提示',
                  content: res.data,
                })
              }
            });

          }

        });

      }
    })

  },
  register: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})
