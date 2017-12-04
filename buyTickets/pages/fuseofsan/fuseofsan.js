// pages/fuseofsan/fuseofsan.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  produce: function () {
    wx.navigateTo({
      url: '../produce/produce',
    })
  },
  life: function () {
    wx.navigateTo({
      url: '../life/life',
    })
  },
  fuseofsan1: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  }
})