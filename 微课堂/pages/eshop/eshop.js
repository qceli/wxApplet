// pages/eshop/eshop.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  selected: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  selected1: function (e) {
    wx.redirectTo({
      url: '../course/course',
    })
  },
  selected2: function (e) {
    wx.redirectTo({
      url: '../community/community',
    })
  },
  selected4: function (e) {
    wx.redirectTo({
      url: '../center/center',
    })
  },
  jewelry: function (e) {
    var jewelryId = e;
    wx.navigateTo({
      url: '../jewelry/jewelry?jewelryId=',
    })
  }
})