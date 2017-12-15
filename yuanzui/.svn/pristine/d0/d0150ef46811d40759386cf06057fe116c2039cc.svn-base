// pages/courseInfo/courseInfo.js
var app = getApp();
var util = require('../../utils/util');
var esTools = require('../../utils/eshop/tools');
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionKey = wx.getStorageSync('sessionKey');
    var params = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey,
      id: id
    };
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(params).setMethod('get').setExtraUrl('LessonInfo').lessons(function (res) {
      if (res.statusCode === 1) {
        // console.log(res.data);
        var descript = res.data.descript;
        console.log("descript:" + descript)
        descript = WxParse.wxParse('descript', 'html', descript, that, 5);
        var stars = res.data.star;
        var starArray = [];
        for (var i = 0; i < stars; i ++) {
          starArray[i] = i;
        }
        that.setData({
          lessonInfo: res.data,
          descript: descript,
          starArray: starArray
        });
        // for (let i = 0; i < res.data.length; i++) {
        // //   let article = res.data[i].content;
        // WxParse.wxParse('descript', 'html', descript, that, 5);
        // }
      }
    });
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  comment: function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../comment/comment?id=',
    });
  },
  courseList: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../courseList/courseList?id=',
    });
  }
})