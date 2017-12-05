// pages/reserveInfo/reserveInfo.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
  
  },
  onLoad: function (options) {
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  personName: function (e) {
    this.setData({
      personName: e.detail.value
    })
  },
  personTel: function (e) {
    this.setData({
      personTel: e.detail.value
    })
  },
  personAddress: function (e) {
    this.setData({
      personAddress: e.detail.value
    })
  },
  personInt: function (e) {
    this.setData({
      personInt: e.detail.value
    })
  },
  reserve: function () {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    var sessionkey = wx.getStorageSync('sessionkey');
    if (sessionkey == undefined) {
      wx.redirectTo({
        url: '../register/register',
      })
    } else {
      var memberInfo = {
        'access_token': apiToken.access_token,
        'sessionkey': sessionkey,
        'name': that.data.personName,
        'mobile': that.data.personTel,
        'address': that.data.personAddress,
        'interesting': that.data.personInt
      }
      esTools.fn.setEmpty().setHeader({
        'content-type': 'application/x-www-form-urlencoded'
      }).signData(memberInfo).setMethod('post').setExtraUrl('confirm').appoints(function (res) {
        if (res.statusCode === 1) {
          console.log(res.data);

          wx.redirectTo({
            url: '../reserveState/reserveState',
          })
        } else if (res.statusCode === -1) {
          console.log(res.data)
          wx.showModal({
            title: '提示',
            content: res.data,
          })
        } else if (res.statusCode === '10005') {
          console.log(res)
          wx.redirectTo({
            url: '../register/register',
          })
        }

      });

    }
  }
})