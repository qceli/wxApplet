//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    domain: app.globalData.domain,
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: that.data.domain + 'Home/Ticket/index',
      data: {},
      success: function (res) {
        that.setData ({
          tricketList: res.data
        })
        
      }
    })
  },
  reserveTrick: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../reserve/reserve?id=' + id,
    })
  },
  mineTrick: function () {
    wx.redirectTo({
      url: '../orders/orders',
    })
  }
})
