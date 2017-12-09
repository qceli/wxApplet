// pages/lecturer/lecturer.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
let WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionKey = wx.getStorageSync('sessionKey');
    var param = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey,
      teacherid : id
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(param).setMethod('get').setExtraUrl('TeacherInfo').teachers(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var tInfo = res.data;
        var article = res.data.teacherdes;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          tInfo: tInfo
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
  lecturerCourse: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../lecturerCourse/lecturerCourse?id=' + id,
    })
  },
  courseInfo: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../courseInfo/courseInfo?id=' + id,
    })
  },
})