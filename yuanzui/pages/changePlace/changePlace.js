// pages/changePlace/changePlace.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  addPlace: function () {
    wx.navigateTo({
      url: '../addPlace/addPlace',
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    wx.navigateBack();
  },
  write: function (e) {
    console.log(JSON.stringify(e))
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../addPlace/addPlace?id=' + id,
    })
  }
})