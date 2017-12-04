// pages/wdpark/wdpark.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl,
    domain: app.globalData.domain
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: that.data.domain + 'Home/Park/query',
      success: function (res) {
        console.log("res.data:" + res.data)
        var freeParkingSpace = res.data.data.freeParkingSpace;
        // wx.showModal({
        //   title: '提示',
        //   content: '剩余空车位:' + freeParkingSpace,
        // })
        that.setData({
          freeParkingSpace: res.data.data.freeParkingSpace
        })
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  mineCar: function () {
    // wx.navigateTo({
    //   url: ("../voidpark/voidpark")
    // })
    wx.showModal({
      title: '我的车',
      content: '敬请期待',
    })
    
  },
  voidPark: function () {
    wx.navigateTo({
      url: ("../voidpark/voidpark")
    })

  }
})