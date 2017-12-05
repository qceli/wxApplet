// pages/addPlace/addPlace.js
//获取应用实例
Page({
  data: {
    region: ['江苏省', '无锡市', '滨湖区'],
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var id = options.id;
    if (id != undefined) {
      

    }

  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  personName: function (e) {
    this.setData({
      personName: e.detail.value
    })
  },
  personTel: function (e) {
    this.setData({
      personTel: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  personArea: function (e) {
    this.setData({
      personArea: e.detail.value
    })
  },
  personPostcode: function (e) {
    this.setData({
      personPostcode: e.detail.value
    })
  },
  personAddress: function (e) {
    this.setData({
      personAddress: e.detail.value
    })
  },
  save: function () {
    wx.navigateBack();
  }
})