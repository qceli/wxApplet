// pages/produceReserve/produceReserve.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    SwiperimgUrls: [],  //轮播图片
    indicatorDots: true,  //是否显示面板指示点  
    autoplay: true,       //是否自动播放
    interval: 5000,       //自动播放间隔时间
    duration: 1000,        //滑动动画时间
    produceId: ''
  },
  onLoad: function (options) {
    var that = this
    var produceId = options.produceId;
    console.log("produceId:" + produceId);
    that.setData({
      produceId: produceId
    })
    var apiToken = wx.getStorageSync('apiToken');
    var sessionkey = wx.getStorageSync('sessionkey');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionkey,
      'id': produceId
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('products').creditshops(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var goods = res.data;
        that.setData({
          goods: goods
        })
      }
    });

    var SwiperimgInfo = {
      'access_token': apiToken.access_token
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(SwiperimgInfo).setMethod('get').setExtraUrl('advs').appoints(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var result = res.data;
        var SwiperimgUrls = [];
        for (var i = 0; i < result.length; i++) {
          SwiperimgUrls[i] = 'http://jyyk.wshoto.com/attachment/' + result[i];
        }
        that.setData({
          SwiperimgUrls: SwiperimgUrls
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
  personAddress: function (e) {
    this.setData({
      personAddress: e.detail.value
    })
  },
  reserve: function () {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    var sessionkey = wx.getStorageSync('sessionkey');
    if (sessionkey == undefined) {
      wx.redirectTo({
        url: '../register/register',
      })
    } else {
      var memberInfo = {
        'access_token': apiToken.access_token,
        'sessionkey': sessionkey,
        'name': that.data.personName,
        'mobile': that.data.personTel,
        'address': that.data.personAddress,
        'id': that.data.produceId
      }
      esTools.fn.setEmpty().setHeader({
        'content-type': 'application/x-www-form-urlencoded'
      }).signData(memberInfo).setMethod('post').setExtraUrl('confirm').appoints(function (res) {
        if (res.statusCode === 1) {
          console.log(res.data);

          wx.redirectTo({
            url: '../reserveState/reserveState',
          })
        } else if (res.statusCode === -1) {
          console.log(res.data)
          wx.showModal({
            title: '提示',
            content: res.data,
          })
        } else if (res.statusCode === '10005') {
          console.log(res)
          wx.redirectTo({
            url: '../register/register',
          })
        }

      });

    }
  }
})