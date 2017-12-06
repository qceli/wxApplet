// pages/remind/remind.js
var app = getApp();
var wshoto = require('../../utils/wshoto.js');
var wh
var openid
Page({
  data: {
    page: 1,
    moneyState: ''
  },
  onLoad: function (options) {
    var that = this
    var value = wx.getStorageSync('keythree');
    var phone = value.phone;
    var openId = value.openid;
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=member&m=wshoto_yyt&op=memberAccount',
      data: {
        type: 0,
        page: that.data.page,
        open_id: openId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var lists = res.data.message.lists;
        var len = lists.length;
        that.setData({
          amount: res.data.message.amount,
          lists: lists,
          len: len,
          phone: phone
        })
      }
    })
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=member&m=wshoto_yyt&op=memberMoney',
      data: {
        phone: phone
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var money = res.data.message.account;
        console.log("............money>" + money)
        var moneyState = '';
        if (money != '0.00') {
          moneyState = '退押金';
        } else {
          moneyState = '充押金';
        }
        that.setData({
          money: money,
          moneyState: moneyState
        })


      }
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  loadMore: function () {
    var that = this
    var value = wx.getStorageSync('keythree');
    var openId = value.openid;
    var page = that.data.page + 1;
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=member&m=wshoto_yyt&op=memberAccount',
      data: {
        type: 0,
        page: page,
        open_id: openId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var lists = res.data.message.lists;
        var morelists = that.data.lists.concat(lists);
        var len = lists.length;
        that.setData({
          amount: res.data.message.amount,
          lists: morelists,
          len: len,
          page: page
        })
      }
    })
  },
  getMoney: function () {
    wx.redirectTo({
      url: '../getmoney/getmoney',
    })
  },
  apliy: function () {
    var that = this
    var phone = that.data.phone;
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=member&m=wshoto_yyt&op=refund',
      data: {
        phone: phone
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 1) {
          wx.showModal({
            title: '提示',
            content: '申请退款成功，退款金额会在五个工作日内返还您的账户',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
              wx.request({
                url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=member&m=wshoto_yyt&op=memberMoney',
                data: {
                  phone: phone
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data)
                  that.setData({
                    money: res.data.message.account,
                    moneyState: '充押金'
                  })
                }
              })
            }
          })
        }
        if (res.data.status == -1) {
          wx.showModal({
            title: '提示',
            content: '您有未支付订单',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (res.data.status == -2) {
          wx.showModal({
            title: '提示',
            content: '您已申请过退款',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (res.data.status == -3) {
          app.getSessionKey(function (res) {
            runorderpay();
            //   if (res.statusCode == 0) {

            //   } else {
            //       console.error('App: getSessionSync fail.');
            //       console.error(res);
            //   }
          });

          function runorderpay() {
            var orderid = 1;
            var opid = wx.getStorageSync('keythree').openid;
            console.log("openid" + (opid))
            console.log("wwww")
            var data = {
              'url': 'https://api.renrenzuche.wshoto.com/payment/pay?paytype=wechat&openid=' + opid
            };

            wshoto.func.getPayment(data, function (res) {
              var that = this
              console.log("qqq")
              res = res.data;
              console.log(res);
              if (res.code == 0) {
                res = res.msg;
                wx.requestPayment({
                  'timeStamp': res.timeStamp,
                  'nonceStr': res.nonceStr,
                  'package': res.package,
                  'signType': res.signType,
                  'paySign': res.paySign,
                  'success': function (res) {
                    console.log('success');
                    console.log(res);
                    wx.showModal({
                      title: '提示',
                      content: '充值成功',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                          wx.navigateTo({ url: '/pages/scan/scan' })
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                        that.setData({
                          moneyState: '退押金'
                        })
                      }
                    })
                  },
                  'fail': function (res) {
                    console.log('fali');
                    console.log(res);
                  },
                  'complete': function (res) {
                    console.log(res);
                  }
                });
              } else {
                //console.log('get jsapi fail.');
                wx.showModal({
                  title: '提示',
                  content: res.msg,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })

              }
            });
          }
          //     var url = 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=payment&m=wshoto_yyt&op=getOrder';
          // }
        }
      }
    })

  }

})