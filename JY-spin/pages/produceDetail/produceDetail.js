// pages/produceDetail/produceDetail.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this
    var id = options.id;
    wx.request({
      url: 'https://yunrui.wshoto.com/index/products',
      data: {
        access_token: 'a3d9720108aee96753a84b852fa66c85',
        id: id
      },
      header: { 'addons': 'ewei_shop' },
      success: function (res) {
        var goods = res.data.result.goods;
        var isshow = res.data.result.goods.isshow;
        var goodState = '现货';
        if (isshow == 0) {
          goodState = "无货";
        }
        that.setData({
          goods: goods,
          goodState: goodState
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
  telephoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '0510-86363288',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }
})