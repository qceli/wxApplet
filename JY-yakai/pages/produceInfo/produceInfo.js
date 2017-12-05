// pages/produceInfo/produceInfo.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    produceId: ''
  },
  onLoad: function (options) {
    var that = this
    var produceId = options.produceId;
    console.log("produceId:" + produceId);
    that.setData({
      produceId: produceId
    })
    var apiToken = wx.getStorageSync('apiToken');
    var sessionkey = wx.getStorageSync('sessionkey');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionkey,
      'id': produceId
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('products').creditshops(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var goods = res.data;
        that.setData({
          goods: goods
        })
      }
    });
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  reserve: function () {
    var that = this
    var produceId = that.data.produceId;
    wx.redirectTo({
      url: '../produceReserve/produceReserve?produceId=' + produceId,
    })
  }
})