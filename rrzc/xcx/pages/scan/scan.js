// scan.js
var WxParse = require('../../wxParse/wxParse.js')

var app = getApp();
var wh
var wwWidth = app.globalData.wwWidth
var wwHeight = app.globalData.wwHeight
var veId
var phone
Page({
    data : {
    scan: "扫码租车",
    markers: [{
      iconPath: "",
      id: 0,
      latitude: 31.57,
      longitude: 120.30,
      width: 20,
      height: 20,
      callout: {
        content: "商铺信息",
        borderRadius: 5,
        bgColor: '#ffffff',
        padding: 10,
        display: 'BYCLICK'
      }
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../images/scan.png',
      position: {
        left: wwWidth / 2 - 40,
        top: wwHeight - 60,
        width: 80,
        height: 30,
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: '../images/personcenter.png',
      position: {
        left: wwWidth / 2 + 130,
        top: wwHeight - 60,
        width: 30,
        height: 30,
      },
      clickable: true
    }]
  },
  onLoad:function (options){
    var that = this
    wx.getStorage({
      key: 'keythree',
      success: function (res) {
        console.log(res.data)
        //globalData.sessionkey = res.data.threedrd_session
        wh=res.data.threedrd_session
        phone = res.data.phone;
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
            that.setData({
              log: res.longitude,
              lat: res.latitude
            })

            wx.request({
              url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=store&m=wshoto_yyt&op=getStore',
              data: {
                lat: res.latitude,
                lng: res.longitude
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {

                console.log(res)
                // for(i=0; i<res.data.message.length;i++)
                var testtt = new Array(res.data.message.length)
                for (var i = 0; i < res.data.message.length; i++) {

                  testtt[i] = {
                    iconPath: "../images/loc.png",
                    id: i,
                    latitude: +(res.data.message[i].lat),
                    longitude: +(res.data.message[i].lng),
                    width: 30,
                    height: 30
                  };

                }
                that.setData({

                  markers: testtt
                })
              }
            })
            console.log(res)
            var latitude = res.latitude
            var longitude = res.longitude
            // wx.openLocation({
            //   latitude: latitude,
            //   longitude: longitude,
            //   scale: 28
            // })
          }
        })

      },
      fail: function (res) {
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  act: function (e) {
    var keythree = (wx.getStorageSync('keythree'));
    var phone = keythree.phone;
    console.log("keythree.phone:" + phone);
    if (phone != undefined && phone != "null" && phone != '') {
      console.log("------------------------------------")
      switch (e.controlId) {
        case 1:
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
              console.log(res.data.message.account);
              if (res.data.message.account == 0) {
                wx.navigateTo({ url: '/pages/recharge/recharge' })
              }
              else if (res.data.message.account >= 0.01) {
                console.log(res.data.message.account);
                wx.request({
                  url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=order&m=wshoto_yyt&op=getOrderStatus',
                  data: {
                    phone: phone
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res.data);
                    if (res.data.status == 1) {
                      wx.scanCode({
                        success: (res) => {
                          console.log(res)
                          var veIds = res.result.split("&")[7];
                          veId = veIds.split("=")[1]
                          console.log(veId)
                          wx.request({
                            url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=vehicleStatus',
                            data: {
                              id: veId
                            },
                            header: {
                              'content-type': 'application/json'
                            },
                            success: function (res) {
                              console.log(res.data.status)
                              if (res.data.message.status == 0) {
                                wx.navigateTo({ url: '/pages/ordersure/ordersure?id=' + encodeURIComponent(veId) })
                              } else if (res.data.message.status == 2) {
                                wx.showModal({
                                  title: '提示',
                                  content: '还车未支付'
                                })
                              } else if (res.data.message.status == 1) {
                                wx.showModal({
                                  title: '提示',
                                  content: '该车辆已被租用！'
                                })
                              }
                              wx.setStorage({
                                key: 'keyfor',
                                data: {
                                  'id': veId
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                    if (res.data.status == -1) {
                      wx.showModal({
                        title: '提示',
                        content: '存在未支付的订单',
                        success: function (res) {
                          wx.navigateTo({ url: '/pages/myorder/myorder' })
                        }
                      })
                    }
                    if (res.data.status == -3) {
                      wx.showModal({
                        title: '提示',
                        content: '您已申请退款'
                      })
                    }
                  }
                })
              }
              //  else if (res.data.message.refund==1){
              //    wx.showModal({
              //               title: '提示',
              //               content: '已申请退还押金，',
              //               success: function(res) {
              //                 if (res.confirm) {
              //                   console.log('用户点击确定')
              //                 } else if (res.cancel) {
              //                   console.log('用户点击取消')
              //                 }
              //               }
              //             })
              //  }
            }
          }); break;
        case 2:
          {
            console.log(123456789)
            wx.navigateTo({ url: '/pages/center/center' });
          } break;
      }
    } else {
      wx.redirectTo({ url: '/pages/shortcut/shortcut' })
    }
  }
})