//complete.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    token: '',
    peopleName: '',
    company: ''
  },
  //事件处理函数
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getStorage({
      key: 'chatToken',
      success: function (res) {
        that.setData({
          token: res.data,
        })
      }
    }) 
  },
  peopleNameInputEvent: function (e) {
    this.setData({
      peopleName: e.detail.value
    })
  },
  companyInputEvent: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  checkIdentifyCode: function (e) {
    console.log('聊天 discuss');
    var that = this
    var token = that.data.token;
    var peopleName = that.data.peopleName;
    var company = that.data.company;
    console.log("peopleName:" + peopleName + ",company:" + company);
    wx.request({
      url: app.globalData.URL + '/pss/user/info?chatToken=' + token,
      data: {
        userName: peopleName,
        company: company
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        console.log("checkIdentifyCode-data:" + JSON.stringify(data));
      }
    })
    wx.redirectTo({
      url: '../recentlist/recentlist?chatToken=' + token
    })
  }
})