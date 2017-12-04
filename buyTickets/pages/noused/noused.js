// pages/noused/noused.js
var app = getApp()
Page({
  data: {
    domain: app.globalData.domain
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
        console.log("noused--------orders:" + res.data);
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
  
  },
  returnTicket: function (e) {
    var tid = e.target.id;
    wx.redirectTo({
      url: '../returnTicket/returnTicket?tid=' + tid,
    })
  }
})