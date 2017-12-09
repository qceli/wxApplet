//获取应用实例
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    userInfo: {},
    title: '微课堂',
  },
  onLoad: function (e) {
    var that = this;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
      });
    });
    wx.setNavigationBarTitle({
      title: that.data.title
    });
    that.loadInfo();
  },
  loadInfo:function(e){
    var that = this;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionKey = wx.getStorageSync('sessionKey');
    var params = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey
    }
    // console.log(params);
    // esTools.fn.setEmpty().setHeader({
    //   'content-type': 'application/x-www-form-urlencoded'
    // }).signData(params).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
    //   if (res.statusCode === 1) {
    //     // var goods = res.data;
    //     // that.setData({
    //     //   goods: goods
    //     // })
    //   }
    // });
  },

  myClasses: function (e) {
    wx.navigateTo({
      url: '/pages/myClass/myClass'
    }); 
  },
  myShopes: function (e) {
    wx.navigateTo({
      url: '/pages/myShop/myShop'
    });  
  },

})
