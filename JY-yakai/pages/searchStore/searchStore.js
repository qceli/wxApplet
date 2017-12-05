// pages/searchStore/searchStore.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      //定位类型 wgs84, gcj02
      type: 'gcj02',
      success: function(res) {
        console.log(res)
        //当前经纬度
        var latitude = res.latitude;
        var longitude = res.longitude;
        var apiToken = wx.getStorageSync('apiToken');
        var memberInfo = {
          'access_token': apiToken.access_token,
          'lng': longitude,
          'lat': latitude
        }
        esTools.fn.setEmpty().setHeader({
          'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('stores').stores(function (res) {
          if (res.statusCode === 1) {
            console.log(res.data)
            var stores = res.data;
            that.setData({
              stores: stores
            })
          }
        });
      }
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  }, 
  home: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  integrationStore: function () {
    wx.redirectTo({
      url: '../integrationStore/integrationStore',
    })
  },
  mine: function () {
    util.login();
  }
})