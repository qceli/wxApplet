// pages/wdtourism/wdtourism.js
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
  wdtourism1: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  wdtourism2: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  wdtourism3: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  wdtourism4: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  }
})