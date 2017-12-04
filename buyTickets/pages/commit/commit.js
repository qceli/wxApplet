// pages/commit/commit.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    domain: app.globalData.domain,
    imgUrl: app.globalData.imgUrl,
    trickNumber: 1,
    tomorrow: '',
    dateValue: '',
    tricketDate: '',
    ticketPrice: '',
    totalPrice: ''
  },
  onLoad: function (options) {
    this.setData({
      tomorrow: util.formatTime1(new Date(new Date())),
      starttime: util.formatTime2(new Date(new Date())),
      endtime: util.formatTime3(new Date(new Date())),
      ticketName: options.ticket_name,
      ticketPrice: options.ticket_price,
      totalPrice: options.ticket_price
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  minusnumbers: function () {
    var that = this
    if ( that.data.trickNumber ==1 ) {
      num = 1;
    } else {
      var num = that.data.trickNumber - 1;
    }
    var totalPrice = num * that.data.ticketPrice;
    that.setData({
      trickNumber: num,
      totalPrice: totalPrice
    })
  },
  addnumbers: function () {
    var that = this
    var num = that.data.trickNumber + 1;
    var totalPrice = num * that.data.ticketPrice;
    that.setData({
      "trickNumber": num,
      totalPrice: totalPrice
    })
  },
  datePickerBindchange: function (e) {
    this.setData({
      currentActive: 1,
      moreDate: 0,
      dateValue: e.detail.value,
      tricketDate: e.detail.value
    })
  },
  // bindDate: function (e) {
  //   this.setData({
  //     dateValue: e.detail.value
  //   })
  // }
  chooseDate: function (e) {
    var that = this
    var currentActive = 0;
    var year = util.formatTime4(new Date(new Date()));
    var tricketDate = year + '-' + that.data.tomorrow;
    that.setData({
      currentActive: currentActive,
      moreDate: 1,
      tricketDate: tricketDate
    });
  },
  personName: function (e) {
    this.setData({
      personName: e.detail.value
    })
  },
  telephoneNum: function (e) {
    this.setData({
      telephoneNum: e.detail.value
    })
  },
  commitPay: function (e) {
    var that = this
    console.log("提交订单")
    var tricketDate = that.data.tricketDate;
    var price = price;
    var ticketName = that.data.ticketName;
    var trickNumber = that.data.trickNumber;
    var personName = that.data.personName;
    var telephoneNum = that.data.telephoneNum;
    var totalPrice = that.data.totalPrice;
    if (tricketDate != '') {
      if ( personName == undefined || personName == '') {
        wx.showModal({
          title: '请补全信息',
          content: '出行人姓名为空',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        
      } else {
        if (telephoneNum == undefined || telephoneNum == '') {
          wx.showModal({
            title: '请补全信息',
            content: '手机号为空',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        } else {
          console.log("ticketName:" + ticketName + ",date:" + tricketDate + ",trickNumber:" + trickNumber + ",personName:" + personName + ",telephoneNum:" + telephoneNum + ",totalPrice:" + totalPrice)
          console.log("openid:" + app.globalData.openId)
          wx.request({
            url: that.data.domain + 'Home/Pay/pay',
            data: {
              openid: app.globalData.openId,
              t_name: ticketName,
              single_price: that.data.ticketPrice,
              use_time: tricketDate,
              count: trickNumber,
              customer: personName,
              phone: telephoneNum,
              price: totalPrice
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              // console.log("res.data.sign: " + res.data.sign)
              console.log("----------支付")
              wx.requestPayment(
                {
                  'timeStamp': res.data.timeStamp,
                  'nonceStr': res.data.nonceStr,
                  'package': res.data.package,
                  'signType': 'MD5',
                  'paySign': res.data.paySign,
                  'success': function (res) {
                    wx.redirectTo({
                      url: '../orders2/orders2',
                    })
                  },
                  'fail': function (res) {
                    wx.showModal({
                      title: '提示',
                      content: '支付失败！',
                      success: function (res) {
                        if (res.confirm) {
                          wx.redirectTo({
                            url: '../orders/orders',
                          })
                        } else if (res.cancel) {
                          wx.redirectTo({
                            url: '../orders/orders',
                          })
                        }
                      }
                    })
                  },
                  'complete': function (res) { }
                })
            }
          })
        }
      }
    } else {
      wx.showModal({
        title: '请补全信息',
        content: '出行日期为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  }














  
})