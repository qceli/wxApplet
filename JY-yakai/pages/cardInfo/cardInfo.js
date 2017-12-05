// pages/cardInfo/cardInfo.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    var sessionkey = wx.getStorageSync('sessionkey');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionkey
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('memberInfo').members(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var credit1 = res.data.credit1;
        var mobile = res.data.mobile;
        var myphone = mobile.substr(3, 4);
        var lphone = mobile.replace(myphone, "****"); 
        console.log("lphone:" + lphone)
        that.setData({
          credit1: credit1,
          mobile: lphone,
        })
      } else if (res.statusCode === '10005') {
        console.log(res)
        wx.redirectTo({
          url: '../register/register',
        })
      }

    });
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})