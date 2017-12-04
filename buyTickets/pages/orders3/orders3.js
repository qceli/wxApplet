// pages/orders3/orders3.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {
    var that = this
    console.log("app.globalData.openId:" + app.globalData.openId)
    wx.request({
      url: app.globalData.domain + 'Home/TicketOrder/rebacked',
      data: {
        openid: app.globalData.openId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          orderLists: res.data,
          msg: res.data.msg
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
  trickList: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  allList: function () {
    wx.redirectTo({
      url: '../orders/orders',
    })
  },
  allList2: function () {
    wx.redirectTo({
      url: '../orders2/orders2',
    })
  },
  allList1: function () {
    wx.redirectTo({
      url: '../orders1/orders1',
    })
  },
  refundInfos: function (e) {
    var tid = e.target.dataset.id;
    wx.navigateTo({
      url: '../refund/refund?tid=' + tid,
    })
  }
})