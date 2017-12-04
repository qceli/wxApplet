// pages/feds/feds.js
var app = getApp()
Page({
  data: {
    toView: '',
    lastId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var token = options.chatToken;
    wx.request({
      url: app.globalData.URL + '/pss/opinion?chatToken=' + options.chatToken,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        var num = data.records.length - 1;
        var lastId = data.records[num].id;
        console.log("num:" + num + ",lastId:" + lastId);
        that.setData({
          records: data.records,
          token: options.chatToken,
          lastId: data.records[num].id
        })

      }
    })
    {
      setTimeout(() => {
        var that = this
        var lastId = that.data.lastId;
        console.log("setTimeout-lastId:" + lastId);
        this.setData({
          toView: 'f_' + this.data.lastId
        })
      }, 500);
    } 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  sendMessage: function () {
    var that = this
    var designCode = that.data.designCode;
    var token = this.data.token;
    var message = that.data.inputValue;
    if (message == null || message == "") {
      console.log("message为空");
    } else {
      console.log('msg=' + message);
      that.setData({
        inputTemp: '',
        inputValue: ''
      })
      wx.request({
        url: app.globalData.URL + '/pss/user/opinion?chatToken=' + token + '&opinion=' + message,
        data: {},
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          var data = res.data;
          console.log("消息反馈发送成功,");
          that.setData({
            newFirstId: data.recordId,
            inputTemp: ''
          })
          wx.request({
            url: app.globalData.URL + '/pss/opinion?chatToken=' + token,
            data: {},
            method: 'GET',
            header: {
              "Content-Type": "application/json"
            },
            success: function (res) {
              var data = res.data;
              var num = data.records.length - 1;
              var lastId = data.records[num].id;
              console.log("num:" + num + ",lastId:" + lastId);
              that.setData({
                records: data.records,
                lastId: data.records[num].id
              })
            }
          })
          setTimeout(() => {
            that.setData({
              toView: 'scrollBottom'
            })
          }, 500);
        }
        
      })
    }
  }
})