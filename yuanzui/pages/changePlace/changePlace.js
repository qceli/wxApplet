// pages/changePlace/changePlace.js
var app = getApp();
var util = require('../../utils/util');
var esTools = require('../../utils/eshop/tools');

Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionKey = wx.getStorageSync('sessionKey');
    console.log(sessionKey.sessionkey);
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('Addresses').addresses(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var list = res.data.list;
        that.setData({
          list: list
        })
      }
    });
  },
  onReady: function () {

  },
  onShow: function () {
    // var that = this;
    // var apiToken = wx.getStorageSync('apiToken');
    // var sessionKey = wx.getStorageSync('sessionKey');
    // console.log(sessionKey.sessionkey);
    // var memberInfo = {
    //   'access_token': apiToken.access_token,
    //   'sessionkey': sessionKey.sessionkey
    // }
    // esTools.fn.setEmpty().setHeader({
    //   'content-type': 'application/x-www-form-urlencoded'
    // }).signData(memberInfo).setMethod('get').setExtraUrl('Addresses').addresses(function (res) {
    //   if (res.statusCode === 1) {
    //     console.log(res.data)
    //     var list = res.data.list;
    //     that.setData({
    //       list: list
    //     })
    //   }
    // });
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  addPlace: function () {
    wx.navigateTo({
      url: '../addPlace/addPlace',
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    wx.navigateBack();
  },
  write: function (e) {
    console.log(JSON.stringify(e))
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../addPlace/addPlace?id=' + id,
    })
  }
})