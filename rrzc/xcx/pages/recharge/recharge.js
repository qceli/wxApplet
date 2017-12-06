var app = getApp();
var wshoto = require('../../utils/wshoto.js');
var wh
var openid
Page({
  data: {

  },
  onLoad: function (options) {
       wx.getStorage({
           key: 'keythree',
           success: function (res) {
             console.log(res.data.openid)
             //globalData.sessionkey = res.data.threedrd_session
             openid = res.data.openid
           }
         }),
    wh = decodeURIComponent(options.id)
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.orderid)
    console.log(options.ordersn)
    console.log(options.price)
    this.setData({
      orderid: options.orderid,
      ordersn: options.ordersn,
      price: options.price,
    })
  },
  mon: function () {
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
                        content: '充值成功',
                        success: function(res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                             wx.navigateTo({ url: '/pages/scan/scan'})
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
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
              } else  {
                  //console.log('get jsapi fail.');
                    wx.showModal({
                        title: '提示',
                        content: res.msg,
                        success: function(res) {
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
      var url = 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=payment&m=wshoto_yyt&op=getOrder';
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})