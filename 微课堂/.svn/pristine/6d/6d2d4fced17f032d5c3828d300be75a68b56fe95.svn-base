// pages/addPlace/addPlace.js
var app = getApp();
var util = require('../../utils/util');
var esTools = require('../../utils/eshop/tools');
//获取应用实例
Page({
  data: {
    region: ['江苏省', '无锡市', '滨湖区'],
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionKey = wx.getStorageSync('sessionKey');
    console.log(sessionKey.sessionkey);
    var addressid = options.id;
    if (addressid != undefined) {
      var placeInfo = {
        'access_token': apiToken.access_token,
        'sessionkey': sessionKey.sessionkey,
        'addressid': addressid
      }
      esTools.fn.setEmpty().setHeader({
        'content-type': 'application/x-www-form-urlencoded'
      }).signData(placeInfo).setMethod('post').setExtraUrl('Addresses').addresses(function (res) {
        if (res.statusCode === 1) {
          console.log(res.data)
          // var goods = res.data;
          // that.setData({
          //   goods: goods
          // })
        }
      });

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
    var that = this;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionKey = wx.getStorageSync('sessionKey');
    console.log(sessionKey.sessionkey);
    var personName = that.data.personName;
    var personTel = that.data.personTel;
    var region = that.data.region;
    var personArea = that.data.personArea;
    var personPostcode = that.data.personPostcode;
    var personAddress = that.data.personAddress;
    var placeInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey,
      'realname': personName,
      'mobile': personTel,
      'province': region[0],
      'city': region[1],
      'area': region[2],
      'address': personArea,
      'zipcode': personPostcode,
      'street': personAddress
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(placeInfo).setMethod('post').setExtraUrl('Addresses').addresses(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        // var goods = res.data;
        // that.setData({
        //   goods: goods
        // })
      }
    });


    wx.navigateBack();
  }
})