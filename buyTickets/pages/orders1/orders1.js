// pages/orders/orders.js
var app = getApp()
Page({
  data: {
    domain: app.globalData.domain,
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.domain + 'Home/TicketOrder/unpay',
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
  allList3: function () {
    wx.redirectTo({
      url: '../orders3/orders3',
    })
  },
  unpaidInfos: function (e) {
    var tid = e.target.dataset.id;
    wx.navigateTo({
      url: '../unpaid/unpaid?tid=' + tid,
    })
  }
})