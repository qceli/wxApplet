// pages/wdcustom/wdcustom.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  telephoneCall1: function () {
    wx.makePhoneCall({
      phoneNumber: '0510-88580732',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  telephoneCall2: function () {
    wx.makePhoneCall({
      phoneNumber: '0510-88586289',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  telephoneCall3: function () {
    wx.makePhoneCall({
      phoneNumber: '0510-88529556',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  telephoneCall4: function () {
    // wx.makePhoneCall({
    //   phoneNumber: '12345678900',
    //   success: function () {
    //     console.log("拨打电话成功！")
    //   },
    //   fail: function () {
    //     console.log("拨打电话失败！")
    //   }
    // })
    wx.showModal({
      title: '提示',
      content: '敬请期待',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})