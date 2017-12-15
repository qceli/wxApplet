// pages/courseList/courseList.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
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
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey,
      // id : id,
      id: 10
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('SectionLists').lessons(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        var lesList = res.data;
        that.setData({
          lesList: lesList,
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
  courseDetail: function(e){
    let id = e.currentTarget.dataset.id;
    let ids = e.currentTarget.dataset.ids;
    let pid = e.currentTarget.dataset.pid;
    console.log(ids);
    console.log(id);
    console.log(pid);
    wx.navigateTo({
      url: '../courseDetail/courseDetail?id=' + id + '&ids=' + ids + '&pid=' + pid,
    });
  }
})