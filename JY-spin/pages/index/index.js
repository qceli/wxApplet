//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    var that = this
    wx.request({
      url: 'https://yunrui.wshoto.com/wxappadvs/wxappadvs',
      data: {
        access_token: 'a3d9720108aee96753a84b852fa66c85',
        identification: 'index'
      },
      header: { 'addons': 'ewei_shop' },
      success: function (res) {
        var thumb = res.data.result.thumb;
        that.setData({
          thumb: thumb
        })
      }
    })
    wx.request({
      url: 'https://yunrui.wshoto.com/index/products',
      data: {
        access_token: 'a3d9720108aee96753a84b852fa66c85',
        isshow: 1
      },
      header: { 'addons': 'ewei_shop' },
      success: function (res) {
        var lists = res.data.result;
        that.setData({
          lists: lists
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  produceDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../produceDetail/produceDetail?id=' + id,
    })
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})
