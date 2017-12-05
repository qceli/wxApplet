// pages/addIntegration/addIntegration.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    wx.getStorage({
      key: 'sessionkey',
      success: function (res) {
        var sessionkey = wx.getStorageSync('sessionkey');
        if (sessionkey != '') {

          var memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionkey,
            'type': 'cloth_credit'
          }
          esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
          }).signData(memberInfo).setMethod('put').setExtraUrl('credits').members(function (res) {
            if (res.statusCode === 1) {
              console.log(res.data)
              wx.showLoading({
                title: '跳转到积分商城',
              })
              setTimeout(() => {
                wx.hideLoading();
                wx.redirectTo({
                  url: '../integrationStore/integrationStore',
                })
              }, 3000);
            }

          });
        } else {
          wx.navigateTo({
            url: '../login/login',
          })
        }
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})