// pages/codeinfo/codeinfo.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.domain + 'Home/TicketOrder/ticketInfo',
      data: {
        openid: app.globalData.openId,
        tid: options.tid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("codeinfo--------orders:" + res.data);
        that.setData({
          orderInfo: res.data
        })
      }
    })

  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})