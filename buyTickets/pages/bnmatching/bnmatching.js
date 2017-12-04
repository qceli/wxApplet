// pages/bnmatching/bnmatching.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  bnmatching1: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  bnmatching2: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  bnmatching3: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  }
})