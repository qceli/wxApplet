// pages/intelligent/intelligent.js
var app = getApp();
var wshoto = require('../../utils/wshoto.js');
var WxParse = require('../../wxParse/wxParse.js');
var QR = require('../../utils/wxqrcode.js');
var util = require('../../utils/util.js');
Page({
  data: {
    orderId: '',
    phone: '',
    bikeState: '骑行中',
    powerStateName: '打开电源',
    powerStateImg: '../images/power.png'
  },
  onLoad: function (options) {
    var that = this
    var orderId = options.orderId;
    var value = wx.getStorageSync('keythree')
    var phone = value.phone;
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=noOffVehicle&phone=' + phone + '&order_id=' + orderId,
      success: function (res) {
        var message = res.data.message;
        var powerState = message.dm_status;
        var onOff = message.on_off;
        var openState = '停车中';
        if (onOff == 1) {
          openState = '骑行中';
        }
        var powerStateImg = that.data.powerStateImg;
        var powerStateName = that.data.powerStateName;
        if (powerState == 1) {
          powerStateImg = '../images/power1.png';
          powerStateName = '关闭电源';
        }
        that.setData({
          orderId: orderId,
          phone: phone,
          message: message,
          onOff: onOff,
          openState: openState,
          orderSn: message.order_sn,
          powerState: powerState,
          powerStateImg: powerStateImg,
          powerStateName: powerStateName
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
  close: function () {
    var that = this
    var phone = that.data.phone;
    var orderId = that.data.orderId;
    var onOff = that.data.onOff;
    console.log("onOff:" + onOff)
    wx.showModal({
      title: '提示',
      content: '确定停车操作？为了安全，请在车辆静止状态下停车！',
      success: function(res) {
        if (res.confirm) {
          if (onOff == 2) {
            wx.showModal({
              title: '提示',
              content: '您已停车！',
            })
          } else {
            var state = 2;
            wx.request({
              url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=noOffVehicle&phone=' + phone + '&order_id=' + orderId,
              data: {
                type: state
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                console.log(JSON.stringify(res))
                if (res.data.status == 1) {
                  var openState = '停车中';
                  wx.showLoading();
                  setTimeout(function () {
                    wx.hideLoading();
                    that.setData({
                      openState: openState,
                      onOff: 2
                    })
                  }, 3000);
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '操作失败',
                  })
                }
              }
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    

  },
  open: function () {
    var that = this
    var phone = that.data.phone;
    var orderId = that.data.orderId;
    var onOff = that.data.onOff;
    console.log("onOff:" + onOff)
    if (onOff == 1) {
      wx.showModal({
        title: '提示',
        content: '您已解锁！',
      })
    } else {
      var state = 1;
      wx.request({
        url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=noOffVehicle&phone=' + phone + '&order_id=' + orderId,
        data: {
          type: state
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          if (res.data.status == 1) {
            var openState = '骑行中';
            wx.showLoading();
            setTimeout(function () {
              wx.hideLoading();
              that.setData({
                openState: openState,
                onOff: 1
              })
            }, 3000);
          } else {
            wx.showModal({
              title: '提示',
              content: '操作失败',
            })
          }
        }
      })
    }

  },
  backBike: function (e) {
    var that = this
    var order = that.data.orderSn;
    var onOff = that.data.onOff;
    wx.showModal({
      title: '还车提示',
      content: '请先停车，再还车。',
      success: function (res) {
        if (res.confirm) {
          if (onOff == 1) {
            wx.showModal({
              title: '提示',
              content: '请先停车！',
            })
          } else {
            that.setData({
              imagetest: QR.createQrCodeImg(order, { size: 150 })
            })
            // var currentStatu = e.currentTarget.dataset.statu;
            var currentStatu = 'open';
            that.QRcode(currentStatu);

          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        } 
      }
    })
  },
  QRcode: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  opp: function (e) {
    var that = this
    that.setData({
      showModalStatus: false
    })
    var orderSn = that.data.orderSn;
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=order&m=wshoto_yyt&op=getOrderInfo',
      data: {
        ordersn: orderSn
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.message.status == 2) {
          wx.showModal({
            title: '提示',
            content: '订单已完成，请尽快支付哦！',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({ url: '/pages/myorder/myorder' });
              } else if (res.cancel) {
                wx.redirectTo({ url: '/pages/myorder/myorder' });
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '订单未确认，请等待店主确认',
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

  },
  powerControl: function (e) {
    var that = this
    var orderId = that.data.orderId;
    var phone = that.data.phone;
    var powerState = that.data.powerState;
    var type = 1;
    if (powerState == 1) {
      type = 2;
    }
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=noOffDM',
      data: {
        type: type,
        order_id: orderId,
        phone: phone
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(JSON.stringify(res))
        if (res.data.status == 1) {
          if (powerState == 1) {
            powerState = 2;
            var powerStateName = '打开电源';
            var powerStateImg = '../images/power.png';
          } else if(powerState == 2) {
            powerState = 1;
            var powerStateName = '关闭电源';
            var powerStateImg = '../images/power1.png';
          }
          wx.showLoading();
          setTimeout(function () {
            wx.hideLoading();
            that.setData({
              powerStateName: powerStateName,
              powerStateImg: powerStateImg,
              powerState: powerState
            })
          }, 3000);
        }
      }
    })

  }

})