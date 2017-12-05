// pages/giftInfos/giftInfos.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this
    var change = 1;
    var goodId = options.id;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionkey = wx.getStorageSync('sessionkey');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionkey,
      'id': goodId
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('products').creditshops(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var goods = res.data;
        var exchange = res.data.exchange;
        if (exchange == '积分不足') {
          change = 0;
        }
        that.setData({
          goods: goods,
          change: change,
          exchange: exchange,
          goodId: goodId
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
  exchangeGift: function() {
    var that = this
    var exchange = that.data.exchange;
    if (exchange == '立即兑换') {
      wx.showModal({
        title: '提示',
        content: '是否确定兑换',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            var goodId = that.data.goodId;
            var apiToken = wx.getStorageSync('apiToken');
            var sessionkey = wx.getStorageSync('sessionkey');
            var memberInfo = {
              'access_token': apiToken.access_token,
              'sessionkey': sessionkey,
              'goodsid': goodId
            }
            esTools.fn.setEmpty().setHeader({
              'content-type': 'application/x-www-form-urlencoded'
            }).signData(memberInfo).setMethod('post').setExtraUrl('confirm').creditshops(function (res) {
              if (res.statusCode === 1) {
                console.log(res.data)
                wx.showModal({
                  title: '提示',
                  content: '兑换成功',
                  success: function (res) {
                    if(res.confirm) {
                      wx.navigateTo({
                        url: '../integrationList/integrationList',
                      })
                    } else if (res.cancel) {
                      wx.navigateTo({
                        url: '../integrationList/integrationList',
                      })
                    }

                  }
                })
              }
            });

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
     
    } else {
    }
  }
})