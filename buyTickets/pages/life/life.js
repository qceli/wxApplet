// pages/life/life.js
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
  businessMatching: function () {
    wx.navigateTo({
      url: '../bnmatching/bnmatching',
    })
  },
  wisdomTourism: function () {
    wx.navigateTo({
      url: '../wdtourism/wdtourism',
    })
  },
  life1: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  life2: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  life3: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  life4: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  }
})