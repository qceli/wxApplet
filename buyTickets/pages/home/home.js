// pages/home/home.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl,
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log("getUserInfo")
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  mapIntroduce: function() {
    wx.redirectTo({
      url: '../map1/map1',
    })
  },
  townServe: function () {
    wx.redirectTo({
      url: '../service/service',
    })
  },
  townIntroduce: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  intelligentApp: function () {
    wx.navigateTo({
      url: '../intelligent/intelligent',
    })
  },
  townFuture: function (e) {
    wx.navigateTo({
      url: '../townfurture/townfurture',
    })
    // var id = e.currentTarget.dataset.id;
    // wx.navigateTo({
    //   url: '../article/article?id=' + id,
    // })
  },
  fuseSan: function () {
    wx.navigateTo({
      url: '../fuseofsan/fuseofsan',
    })
  },
  townBusiness: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
    // wx.navigateTo({
    //   url: '../townbusiness/townbusiness',
    // })
  }
})