// pages/getCard/getCard.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    var sessionkey = wx.getStorageSync('sessionkey');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionkey
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('memberInfo').members(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var result = res.data;
        that.setData({
          result: result
        })
      }
    })
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  comeIn: function () {
    wx.redirectTo({
      url: '../mine/mine',
    })
  }
})