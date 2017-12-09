var app = getApp();
var util = require('../../utils/util');
var esTools = require('../../utils/eshop/tools');
Page({
  data: {
    SwiperimgUrls: ['../../images/agency-top.jpg', '../../images/agency-top.jpg', '../../images/agency-top.jpg'],  //轮播图片
    indicatorDots: true,  //是否显示面板指示点  
    autoplay: true,       //是否自动播放
    interval: 5000,       //自动播放间隔时间
    duration: 1000,       //滑动动画时间  
    circular: true  
  },
  onLoad: function(){
    var that = this;
    var apiToken = wx.getStorageSync('apiToken');
    var sessionKey = wx.getStorageSync('sessionKey');
    console.log(sessionKey.sessionkey);
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey
    }
    // esTools.fn.setEmpty().setHeader({
    //   'content-type': 'application/x-www-form-urlencoded'
    // }).signData(memberInfo).setMethod('get').setExtraUrl('Test').test(function (res) {
    //   if (res.statusCode === 1) {
    //     console.log(res.data)
    //     // var goods = res.data;
    //     // that.setData({
    //     //   goods: goods
    //     // })
    //   }
    // });
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
  },
  courseInfo(e){
    // console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../courseInfo/courseInfo?id=' + id,
    });
  } 
})