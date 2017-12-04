// pages/service/service.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl,
    centerX: 120.51065,
    centerY: 31.50291,
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  home: function () {
    wx.redirectTo({
      url: '../home/home',
    })
  },
  mapIntroduce: function () {
    wx.redirectTo({
      url: '../map1/map1',
    })
  },
  buyTicket: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  mapNav: function () {
    // wx.navigateTo({
    //   url: '../mapnav/mapnav',
    // })
    console.log('地图定位！')
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        console.log(res.latitude)
        console.log("res.longitude" + res.longitude)
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        console.log("globalPlace")
        wx.openLocation({
          longitude: Number(this.data.centerX),
          latitude: Number(this.data.centerY)
        })
      }
    });
  },
  eGuide: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
  airMonitor: function () {
    wx.navigateTo({
      url: '../airmonitor/airmonitor',
    })
  },
  weatherReport: function () {
    wx.navigateTo({
      url: '../weather/weather',
    })
  },
  busSearch: function () {
    wx.navigateTo({
      url: '../bussearch/bussearch',
      // url: 'http://wuxi.8684.cn/so.php',
      // url: 'http://wuxicitizen001.wxbus.com.cn/line_search.html',
    })
  },
  wdPark: function () {
    wx.navigateTo({
      url: '../wdpark/wdpark',
    })
  },
  wdCustom: function () {
    wx.navigateTo({
      url: '../wdcustom/wdcustom',
    })
  },
  shareBike: function () {
    // wx.navigateTo({
    //   url: '../wdcustom/wdcustom',
    // })
    wx.showModal({
      title: '暂未开放',
      content: '敬请期待',
    })
  },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: app.globalData.imgUrl + "location.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 25,
      height: 48
    };
    return marker;
  }
})