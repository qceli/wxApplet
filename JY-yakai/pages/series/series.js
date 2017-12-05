// pages/series/series.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this
    var seriesId = options.seriesId;
    console.log(seriesId);
    var apiToken = wx.getStorageSync('apiToken');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'id': seriesId
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('serieses').serieses(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var result = res.data;
        that.setData({
          result: result
        })
      }

      // wx.setNavigationBarTitle({ title: result.title })
    });
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  produceInfos: function (e) {
    var produceId = e.currentTarget.dataset.id;
    console.log("produceId:" + produceId);
    util.produceLogin(produceId);
    // wx.navigateTo({
    //   url: '../produceInfo/produceInfo?produceId=' + produceId,
    // })
  }
})