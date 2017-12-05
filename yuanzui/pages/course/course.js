// pages/course/course.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
  },
  onLoad: function () {
    var that = this;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionKey = wx.getStorageSync('sessionKey');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey
    }
    var oneParam = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey,
       limit: 5
    }
    var teacherList = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey,
      // 'keywords': keywords,
      // 'good' : 1,
      // 'page' : 1,
      // 'psize': 5
    }
    console.log(memberInfo);
    // 轮播
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('lessionSlides').slides(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var banner = res.data;
        that.setData({
          banner: banner
        })
      }
    });
    // 类别
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(oneParam).setMethod('get').setExtraUrl('Categories').lessons(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var lessonSort = res.data;
        that.setData({
          lessonSort: lessonSort
        })
      }
    });
    // 主讲人
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(teacherList).setMethod('get').setExtraUrl('TeacherList').teachers(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var tList = res.data;
        that.setData({
          tList: tList
        })
      }
    });
    // 精品
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('goodLesson').lessons(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var topQuality = res.data;
        that.setData({
          topQuality: topQuality
        })
      }
    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  courseInfo: function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../courseInfo/courseInfo?id=' + id,
    })
  },
  courseSort: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../courseSort/courseSort?id=' + id,
    })
  },
  lecturer: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../lecturer/lecturer?id=' + id,
    })
  },
  selected: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
 
  selected2: function (e) {
    wx.redirectTo({
      url: '../community/community',
    })
  },
  selected3: function (e) {
    wx.redirectTo({
      url: '../eshop/eshop',
    })
  },
  selected4: function (e) {
    wx.redirectTo({
      url: '../mine/mine',
    })
  }
})