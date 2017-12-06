// center.js
var app = getApp();
var wshoto = require('../../utils/wshoto.js');
var xxId
var wh
var wcc
var cww
var phone
Page({
    data : {
      avatarUrl:"",
      nickName:'',
      money:'0.00'
    },
    onLoad:function(options){
      try {
        var value = wx.getStorageSync('keythree')
        if (value) {
        console.log(value)
        console.log(value.phone);
        console.log(value.threerd_session)
        console.log(value.openid)
        //globalData.sessionkey = res.data.threedrd_session
        wh=value.threerd_session
        phone=value.phone
        cww=value.openid
        }
      } catch (e) {
        // Do something when catch error
      }
    //  wx.getStorageSync({
    //   key: 'key',
    //   success: function (res) {
    //     console.log(res.data)
    //     console.log(res.data.phone);
    //     console.log(res.data.threerd_session)
    //     //globalData.sessionkey = res.data.threedrd_session
    //     wh=res.data.threerd_session
    //     phone=res.data.phone
    //   }
    // }),
     wx.getStorage({
      key: 'keytwo',
      success: function (res) {
        console.log(res.data.ordersn)
        wcc=res.data.ordersn
         
        
      }
    }),
     wx.getStorage({
      key: 'keythree',
      success: function (res) {
        console.log(res.data)
       
        
        
      }
    }),

    
      wx.checkSession({
        success: function () {
          console.log(222)
        },
        fail: function () {
          //登录态过期
          wx.redirectTo({
            url: 'Login/Login',
          })
        }
      });
      var that = this
      wx.getUserInfo({
             success: function (res) {
  
              //  eval("var info = "+res.rawData);
// console.log(eval(res.rawData))
               console.log(res);
               console.log(res.rawData)
               console.log(that.rawData)
               //console.log(json.parse(res))
              //  console.log(info.nickName)
              //  wc = res.rawData
              //  console.log(wc);
               // console.log(that)
               // console.log(res.iv);
              
               var userInfo = res.userInfo
               var nickName = userInfo.nickName
               console.log(nickName)
               var avatarUrl = userInfo.avatarUrl
               var gender = userInfo.gender //性别 0：未知、1：男、2：女
               var province = userInfo.province
               var city = userInfo.city
               var country = userInfo.country
                that.setData({
                //  'encryptedData': res.encryptedData,
                //  'iv': res.iv,
                //  'rawData': res.rawData,
                //  'signature': res.signature
                'nickName':nickName,
                'avatarUrl':avatarUrl

               })
             }
           }),
           wx.request({
              url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=member&m=wshoto_yyt&op=memberMoney', 
              data: {
                phone:phone
              },
              header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res.data)
                that.setData({
                  money:res.data.message.account
                })
                

              }
            })
    },
    order:function (e) {
          console.log(333);
          wx.redirectTo({ url: '/pages/myorder/myorder' })
        },
     go: function (e) {
         console.log(222)
        // wx.navigateTo({ url: '/pages/recharge/recharge' })
         wx.navigateTo({
           url: '../remind/remind',
         })
    },
   
    apliy:function(){
      var that = this
      wx.showModal({
        title: '提示',
        content: '是否确定退还押金',
        success: function (res) {
          if (res.confirm) {
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
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    pay:function(e) {
      app.getSessionKey(function (res) {
      runorderpay();
        //   if (res.statusCode == 0) {
             
        //   } else {
        //       console.error('App: getSessionSync fail.');
        //       console.error(res);
        //   }
      });

      function runorderpay() {

        wx.request({
          url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=order&m=wshoto_yyt&op=getPayOrder',
          data: {
            phone: phone
          },
          success: function(res) {
            console.log("res:" + JSON.stringify(res.data))
            var status = res.data.status;
            if ( status == -1 ) {
              wx.showModal({
                title: '提示',
                content: '您没有要支付的订单！',
              })
            } else {
              var ordersn = res.data.message.ordersn;
              console.log("ordersn:" + ordersn);


              var orderid = 1;
              // console.log(wcc);
              var data = {
                'url': 'https://api.renrenzuche.wshoto.com/payment/order?paytype=wechat&openid=' + cww + '&ordersn=' + ordersn
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
                  console.log('get jsapi fail.');
                }
              });

            }
            

            
          }
        })


        
      }
      var url = 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=payment&m=wshoto_yyt&op=getOrder';
    },

    owner: function () {
      wx.navigateTo({
        url: '../applybike/applybike',
      })
    },
    owner1: function () {
      wx.navigateTo({
        url: '../minebike/minebike',
      })
    },
    // setupTap: function() {
    //   wx.navigateTo({
    //     url: '../remind/remind',
    //   })
    // }
})