// pages/mapnav/mapnav.js
var app = getApp()
Page({
  data: {
    imgUrl: app.globalData.imgUrl,
    centerX: 120.51065,
    centerY: 31.50291,
    markers: [
      {
        iconPath: app.globalData.imgUrl + "location.png",
        id: 0,
        name: '鸿山物联网小镇',
        latitude: 31.50291,
        longitude: 120.51065,
        width: 35,
        height: 35
      }
    ],
    controls: [{
      id: 1,
      iconPath: '../img/location-control.png',
      position: {
        left:20,
        top: 40,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
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
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(111111111111)
  },
  controltap(e) {
    console.log(e.controlId)
    console.log(2222222)
    let that = this
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