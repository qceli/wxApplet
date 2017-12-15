// pages/integrationStore/integrationStore.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    integrationArea: ['0-500', '500-1000', '1000-1500', '1500-2000'],
    items: [
      { name: 'ASC', value: '积分从低到高'},
      { name: 'DESC', value: '积分从高到低'}
    ],
    fields: '',
    credit: '',
    sorttype: ''

  },
  onLoad: function (options) {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    var memberInfo = {
      'access_token': apiToken.access_token
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
  // searchStore: function () {
  //   wx.redirectTo({
  //     url: '../searchStore/searchStore',
  //   })
  // },
  mine: function () {
    util.login();
  },
  searchField: function(e) {
    var that = this
    var searchField = e.detail.value;
    that.setData({
      searchField: searchField
    })
    var apiToken = wx.getStorageSync('apiToken');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'keywords': searchField,
      'credit': that.data.areaNum,
      'sorttype': that.data.sorttype

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
  },
  areaPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var n = e.detail.value;
    var areaNum = that.data.integrationArea[n];
    that.setData({
      n: e.detail.value,
      areaNum: areaNum
    })
    var apiToken = wx.getStorageSync('apiToken');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'keywords': that.data.searchField,
      'credit': areaNum,
      'sorttype': that.data.sorttype
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
    
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var that = this
    var sortType = e.detail.value;
    var sorttype = '';
    if (sortType == 'ASC') {
      sorttype = 'credit_asc';
    } else {
      sorttype = 'credit_desc';
    }
    that.setData({
      sorttype: sorttype
    })
    var apiToken = wx.getStorageSync('apiToken');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'keywords': that.data.searchField,
      'credit': that.data.areaNum,
      'sorttype': sorttype
    }
    // that.sorft(memberInfo)
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

  },
  giftInfos: function (e) {
    var goodId = e.currentTarget.dataset.id;
    console.log(goodId)
    util.goodsLogin(goodId);
    // wx.navigateTo({
    //   url: '../giftInfos/giftInfos?id=' + goodId,
    // })
  },
  sorft: function (memberInfo) {
    var that = this
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
  }
})