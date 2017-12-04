// pages/article/article.js
var WxParse = require('../../utils/wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    domain: app.globalData.domain
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: that.data.domain + 'Home/Index/articleDetail/id/' + options.id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data;
        var content = result.content;
        console.log(JSON.stringify(content))
        that.setData({
          content: content,
          hidden: true
        });
        WxParse.wxParse('content', 'html', content, that, 5);
      }
    });

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})