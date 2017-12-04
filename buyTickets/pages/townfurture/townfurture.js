// pages/townfurture/townfurture.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  // bindButtonTap: function () {
  //   var that = this;
  //   wx.chooseVideo({
  //     sourceType: ['album', 'camera'],
  //     maxDuration: 60,
  //     camera: ['front', 'back'],
  //     success: function (res) {
  //       that.setData({
  //         src: res.tempFilePath
  //       })
  //     }
  //   })
  // },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:');
    console.log(e.detail.errMsg);
  }
})