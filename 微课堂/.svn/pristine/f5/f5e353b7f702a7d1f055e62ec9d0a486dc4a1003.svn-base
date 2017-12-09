//获取应用实例
var app = getApp();

Page({
  data: {
    userInfo: {},
    title: '我的课程',
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
    that.loadClasses();
  },
  myClasses: function (e) {
    wx.navigateTo({
      url: '/pages/myClass/myClass'
    }); 
  },
  loadClasses:function(){

  }

})
