// pages/orders2/orders2.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {
    var that = this
    console.log("app.globalData.openId:" + app.globalData.openId)
    wx.request({
      url: app.globalData.domain + 'Home/TicketOrder/paied',
      data: {
        openid: app.globalData.openId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res.data.msg:" + res.data.msg);
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
  allList1: function () {
    wx.redirectTo({
      url: '../orders1/orders1',
    })
  },
  allList3: function () {
    wx.redirectTo({
      url: '../orders3/orders3',
    })
  },
  unusedInfos: function (e) {
    var tid = e.target.dataset.id;
    wx.redirectTo({
      url: '../noused/noused?tid=' + tid,
    })
  },
  orderInfos: function (e) {
    var tid = e.target.id;
    wx.redirectTo({
      url: '../codeinfo/codeinfo?tid=' + tid,
    })
  }
})