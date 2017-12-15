// pages/lecturerCourse/lecturerCourse.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      ItemIndex: 0,
      contentIndex: 0
    },
  },
  tabFun: function (e) {
    var _datasetIndex = e.target.dataset.index;
    console.log("----" + _datasetIndex + "----");
    var _obj = {};
    _obj.ItemIndex = _datasetIndex;
    _obj.contentIndex = _datasetIndex;
    this.setData({
      tabArr: _obj
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionKey = wx.getStorageSync('sessionKey');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey,
       teacherid : id
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('teacherLesson').teachers(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var tLesson = res.data;
        that.setData({
          tLesson: tLesson
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  courseInfo: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../courseInfo/courseInfo?id=' + id,
    })
  },
  selected: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  selected1: function (e) {
    wx.redirectTo({
      url: '../course/course',
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