// pages/mine/mine.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    signIn: ''
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
        var realname = res.data.realname;
        var signStatus = res.data.signStatus;
        var code = res.data.id;
        var signIn = '签到';
        if (signStatus == 1) {
          signIn = '已签到';
        }
        that.setData({
          realname: realname,
          signIn: signIn,
          signStatus: signStatus,
          credit1: res.data.credit1,
          code: code
        })
      }

    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  signIn: function () {
    var that = this
    var signStatus = that.data.signStatus;
    if (signStatus == 0) {
      var apiToken = wx.getStorageSync('apiToken');
      var sessionkey = wx.getStorageSync('sessionkey');
      var memberInfo = {
        'access_token': apiToken.access_token,
        'sessionkey': sessionkey
      }
      esTools.fn.setEmpty().setHeader({
        'content-type': 'application/x-www-form-urlencoded'
      }).signData(memberInfo).setMethod('put').setExtraUrl('credits').members(function (res) {
        if (res.statusCode === 1) {
          console.log('res.data:' + res.data.totalCredit);
          // if (res.data == 1) {
            var signIn = '已签到';
            var status = 1;
            var totalCredit = res.data.totalCredit;
            that.setData({
              signIn: signIn,
              signStatus: status,
              credit1: totalCredit
            })
          // }
        } else {
          wx.showModal({
            title: '提示',
            content: '您已签到',
          })
        }

      });
    } else {
      wx.showModal({
        title: '提示',
        content: '您已签到',
      })
    }
    
  },
  cardInfo: function () {
    wx.navigateTo({
      url: '../cardInfo/cardInfo',
    })
  },
  integrationList: function () {
    wx.navigateTo({
      url: '../integrationList/integrationList',
    })
  },
  home: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  searchStore: function () {
    wx.redirectTo({
      url: '../searchStore/searchStore',
    })
  },
  integrationStore: function () {
    wx.redirectTo({
      url: '../integrationStore/integrationStore',
    })
  },
  changeInfos: function () {
    wx.navigateTo({
      url: '../changeInfos/changeInfos',
    })
  }

})