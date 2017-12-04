// pages/bussearch/bussearch.js
var app = getApp()
Page({
  data: {
    domain: app.globalData.domain,
    inputValue: ''
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  bindKeyInput: function (e) {
    var that = this
    var value = e.detail.value
    console.log("value:" + value)
    that.setData({
      inputValue: value
    })
    wx.request({
      url: app.globalData.domain + 'Home/Bus/search',
      data: {
        q: value
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res.data:" + JSON.stringify(res.data))
        var stations = res.data[0].stats;
        that.setData({
          stations: stations
        })
      }
    })
  }
  
})