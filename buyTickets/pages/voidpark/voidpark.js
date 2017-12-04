// pages/voidpark/voidpark.js
var app = getApp()
Page({
  data: {
    domain: app.globalData.domain,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    }
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: that.data.domain + 'Home/Park/query',
      success: function (res) {
        console.log("res.data:" + res.data)
        that.setData({
          freeParkingSpace: res.data.data.freeParkingSpace
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
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  }
})