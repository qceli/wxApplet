// pages/reserve/reserve.js
var app = getApp()
Page({
  data: {
    domain: app.globalData.domain,
    imgUrl: app.globalData.imgUrl,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    }, 
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: that.data.domain + 'Home/Ticket/detail/id/' + options.id,
      data: {},
      success: function (res) {
        var sightInfo = res.data.sight_info;
        var array = sightInfo.split("\n");
        var infoArray = {}; 
        for (var i = 0; i < array.length; i++) {
          infoArray[i] = array[i];
        }
        var warning = res.data.warning;
        var arrays = warning.split("\n");
        var warningArray = {};
        for (var j = 0; j < arrays.length; j++) {
          warningArray[j] = arrays[j];
        }
        that.setData({
          tricketDetail: res.data,
          ticketName: res.data.ticket_name,
          ticketPrice: res.data.ticket_price,
          infoArray: infoArray,
          warningArray: warningArray
        })

      }
    })
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  mineTrick: function () {
    wx.redirectTo({
      url: '../orders/orders',
    })
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
  }, 
  commitTrick: function () {
    var that = this
    wx.redirectTo({
      url: '../commit/commit?ticket_name=' + that.data.ticketName + '&ticket_price=' + that.data.ticketPrice,
    })
  }
})