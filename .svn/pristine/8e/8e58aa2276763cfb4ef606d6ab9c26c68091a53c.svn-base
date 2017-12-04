// pages/alllist/alllist.js
var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    allOrders: '',
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var token = options.chatToken;
    wx.request({
      url: app.globalData.URL + '/pss/order/list?chatToken=' + options.chatToken,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        console.log("data:" + data);
        that.setData({
          allOrders: data.orders,
          token: options.chatToken
        })

      }
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
    clearInterval(wx.getStorageSync('interval'));
  },
  onShareAppMessage: function () {
    return {
      title: 'CAD设计交流',
      desc: '同步',
      path: '/pages/alllist/alllist?chatToken='
    }
  },
  recentList: function () {
    console.log('最近列表');
    wx.redirectTo({
      url: '../recentlist/recentlist?chatToken=' + wx.getStorageSync('chatToken')
    })
  },
  discussTalk: function (e) {
    console.log('全部订单页跳转到聊天页');

    var designCode = e.currentTarget.id;
    console.log("designCode" + designCode)
    wx.navigateTo({
      url: '../discuss/discuss?designCode=' + designCode + '&chatToken=' + this.data.token
    })
  },
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log('bindInput' + this.data.inputValue)
  },
  bindconfirm: function (e) {
    var that = this
    console.log('this.inputValue:' + this.data.inputValue);
    wx.request({
      url: app.globalData.URL + '/pss/order/condition?chatToken=' + this.data.token + '&condition=' + this.data.inputValue,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        console.log("data.orders:" + data.orders);
        that.setData({
          allOrders: data.orders,
          // latestStateTime: lastTime
        })

      }
    })
  }
})