// pages/register/register.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    dateValue: ''
  },
  onLoad: function (options) {
    var that = this
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(JSON.stringify(res))
    //     var code = res.code;
    //     wx.setStorageSync('code', code);
    //   }
    // })
    that.setData({
      endtime: util.formatTime1(new Date(new Date())),
    })
    // var apiToken = wx.getStorageSync('apiToken');
    // var code = wx.getStorageSync('code');
    // let loginData = {
    //   'code': code,
    //   'access_token': apiToken.access_token
    // }
    // esTools.fn.setEmpty().setHeader({
    //   'content-type': 'application/x-www-form-urlencoded'
    // }).signData(loginData).setMethod('post').setExtraUrl('sessionCode').login(function (res) {
    //   // console.log(res)
    //   if (res.statusCode === 1) {
    //     wx.setStorageSync('sessionkey', res.data.sessionkey);
        
    //   }

    // });
    // util.getSessionkey();
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  personTel: function (e) {
    this.setData({
      personTel: e.detail.value
    })
    wx.setStorageSync('mobile', e.detail.value);
  },
  personName: function (e) {
    this.setData({
      personName: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log("datePickerBindchange:" + e.detail.value)
    this.setData({
      dateValue: e.detail.value
    })
  },
  register: function (e) {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    console.log(JSON.stringify(apiToken))
    var mobile = that.data.personTel; 
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(JSON.stringify(res))
        // var code = res.code;
        let loginData = {
          'code': res.code,
          'access_token': apiToken.access_token
        }
        esTools.fn.setEmpty().setHeader({ 'content-type': 'application/x-www-form-urlencoded' }).signData(loginData).setMethod('post').setExtraUrl('sessionCode').login(function (res) {
          // console.log(res)
          if (res.statusCode === 1) {
            let userInfo = {
              'access_token': apiToken.access_token,
              'sessionkey': res.data.sessionkey,
              'mobile': mobile,
              'realname': that.data.personName,
              'birth': that.data.dateValue
            }
            esTools.fn.setEmpty().setHeader({
              'content-type': 'application/x-www-form-urlencoded'
            }).signData(userInfo).setMethod('post').setExtraUrl('codeLogin').auth(function (res) {
              console.log("codeLogin---" + JSON.stringify(res))
              if (res.statusCode === 1) {
                wx.setStorageSync('sessionkey', res.data.sessionkey);
                wx.redirectTo({
                  url: '../getCard/getCard',
                })

              } else {
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

  }
})