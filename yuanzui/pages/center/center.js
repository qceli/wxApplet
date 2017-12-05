// pages/center/center.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

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
      url: '../search/search',
    })
  },
  selected2: function (e) {
    wx.redirectTo({
      url: '../teacherList/teacherList',
    })
  },
  selected3: function (e) {
    wx.redirectTo({
      url: '../course/course',
    })
  }
})