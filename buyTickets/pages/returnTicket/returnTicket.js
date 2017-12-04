// pages/returnTicket/returnTicket.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {
    var that = this
    var tid = options.tid;
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
        that.setData({
          orderInfo: res.data,
          price: res.data.price
        })
      }
    })
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  returnInfos: function (e) {
    var that = this
    var tid = e.target.id;
    wx.request({
      url: app.globalData.domain + 'Home/Pay/refund',
      data: {
        trade_no: tid,
        price: that.data.price
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        var msg = res.data.msg;
        if (msg == '退款成功！') {
          wx.showModal({
            title: '提示',
            content: '退款成功！',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../orders3/orders3',
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../orders3/orders3',
                })
              }
            }
          })
        } else {

          wx.showModal({
            title: '提示',
            content: '退款失败,请联系商家。',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../orders3/orders3',
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../orders3/orders3',
                })
              }
            }
          })
        }
      }
    })
  }
})