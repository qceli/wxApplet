// pages/recentlist/recentlist.js
var app = getApp()
Page({
  data: {
    token: '',
    record: '',
    orders: '',
    newNums: ''
  },
  onLoad: function (options) {
    var that = this
    var token = options.chatToken;
    wx.request({
      url: app.globalData.URL + '/pss/discuss/last?chatToken=' + options.chatToken + '&pageSize=10',
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        // 非法用户
        if (res.data.result == 20001) {
          wx.redirectTo({
            url: '../index/index?chatToken=' + wx.getStorageSync('chatToken')
          })
          return
        }
        var newNums = data.records.length;
        that.setData({
          records: data.records,
          orders: data.orders,
          token: options.chatToken,
          newNums: newNums
        })
      }
    })   
  },
  onShow: function () {
    clearInterval(wx.getStorageSync('interval'));
  },
  onShareAppMessage: function () {
    return {
      title: 'CAD设计交流',
      desc: '同步',
      path: '/pages/recentlist/recentlist?chatToken='
    }
  },
  allList: function (e) {
    console.log('全部订单列表');
    wx.redirectTo({
      url: '../alllist/alllist?chatToken=' + wx.getStorageSync('chatToken')
    })
  },
  discussTalk: function (e) {
    console.log('最近列表页跳转到聊天页');

    var designCode = e.currentTarget.id;
    console.log("designCode" + designCode)
    wx.navigateTo({
      url: '../discuss/discuss?designCode=' + designCode + '&chatToken=' + this.data.token
    })
  },
  fedTalk: function (e) {
    console.log('最近列表页跳转到反馈页');
    var designCode = e.currentTarget.id;
    wx.navigateTo({
      url: '../feds/feds?&chatToken=' + this.data.token + '?designCode=' + designCode
    })
  },
  changeData: function (data) {
    var newNums = data.records.length;
    this.setData({
      records: data.records,
      orders: data.orders,
      newNums: newNums
    })
  }
})