// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (wx.getStorageSync('chatToken') != '') {
      wx.redirectTo({
        url: '../recentlist/recentlist?chatToken=' + wx.getStorageSync('chatToken')
      })
    } else {
      wx.redirectTo({
        url: '../index/index'
      })
    }
  }

})