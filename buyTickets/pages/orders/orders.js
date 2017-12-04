// pages/orders/orders.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.domain + 'Home/TicketOrder/all',
      data: {
        openid: app.globalData.openId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData ({
          orderLists: res.data
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
  trickList: function() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  allList1: function () {
    wx.redirectTo({
      url: '../orders1/orders1',
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
  },
  unusedInfos: function (e) {
    var tid = e.target.dataset.id;
    wx.navigateTo({
      url: '../noused/noused?tid=' + tid,
    })
  },
  orderInfos: function (e) {
    var tid = e.target.id;
    wx.navigateTo({
      url: '../codeinfo/codeinfo?tid=' + tid,
    })
  },
  beUsedInfos: function (e) {
    var tid = e.target.dataset.id;
    wx.navigateTo({
      url: '../beused/beused?tid='+ tid,
    })
  },
  refundInfos: function (e) {
    var tid = e.target.dataset.id;
    wx.navigateTo({
      url: '../refund/refund?tid=' + tid,
    })
  }
})