//index.js
//获取应用实例
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
    }).signData(memberInfo).setMethod('get').setExtraUrl('wxappadvs').wxappadvs(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var result = res.data;
        that.setData({
          thumb: result.thumb
        })
      }

    });
  },
  produceLists: function (e) {
    wx.navigateTo({
      url: '../produceList/produceList',
    })
  },
  reserve: function() {
    wx.navigateTo({
      url: '../reserve/reserve',
    })
  },
  searchStore: function () {
    wx.redirectTo({
      url: '../searchStore/searchStore',
    })
  },
  integrationStore: function () {
    wx.redirectTo({
      url: '../integrationStore/integrationStore',
    })
  },
  mine: function () {
    util.login();
  }
})
