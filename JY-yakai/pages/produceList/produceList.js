
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false
  },
  onLoad: function () {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    console.log("index------------apiToken:" + apiToken.access_token)
    var accessToken = apiToken.access_token;
    var memberInfo = {
      'access_token': accessToken
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

    });
  },
  Series: function (e) {
    var seriesId = e.currentTarget.dataset.id;
    console.log("seriesId:" + seriesId)
    wx.navigateTo({
      url: '../series/series?seriesId=' + seriesId,
    })
  }
})
