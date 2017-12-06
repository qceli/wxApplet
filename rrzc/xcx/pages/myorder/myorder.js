// myorder.js
var app = getApp();
var wshoto = require('../../utils/wshoto.js');
var WxParse = require('../../wxParse/wxParse.js');
var QR = require('../../utils/wxqrcode.js');
var order;
var phone;
var wcc;
var cww;
Page ({
  data:{
    start:"",
    vehicle_id:"",
    cost:"",
    left:"",
    ordersn:"",
    orderarray:[],
    showModalStatus: false ,
    imagetest: '',
    car:'',
    power: ''
  },
  onLoad:function (options) {
       try {
         var value = wx.getStorageSync('keythree')
        if (value) {
        console.log(value)
        console.log(value.phone);
        console.log(value.threerd_session)
        //globalData.sessionkey = res.data.threedrd_session
        //wh=value.threerd_session
        phone=value.phone
        }
      } catch (e) {
        // Do something when catch error
      }
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
        cww=res.data.openid
        
        
      }
    })

    var that = this
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=order&m=wshoto_yyt&op=getOrderList&phone='+phone,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.message == "订单为空") {
          that.setData({
            orderarray: ''
          })
        } else {

          if (res.data.message[0].status == 1) {
            that.setData({
              // car: "去还车",
              car: "",
              power: "车辆控制"

            })
          }
          else if (res.data.message[0].status == 2) {
            that.setData({
              car: "等待支付",
              power: ""
            })
          }
          console.log(res.data.message[0].ordersn)
          order = res.data.message[0].ordersn
          console.log(that.data)
          that.setData({
            orderarray: res.data.message,
            // order = res.data.message[0].ordersn,
            // start: res.data.message[0].start,
            // ordersn:res.data.message[0].ordersn,
            // vehicle_id: res.data.message[0].vehicle_id,
            // cost: res.data.message[0].cost,
            // left: res.data.message[0].left 
          })
        }
      }
    })
  },
powerDrawer:function (e){
  var ordersn = e.target.dataset.id;
  if (this.data.car=='去还车') {
  var thats = this
  thats.setData({
    imagetest: QR.createQrCodeImg(order,{size:150})
  })
  var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  }
  else if (this.data.car=='等待支付'){
    app.getSessionKey(function (res) {
      runorderpay(ordersn);
    //   if (res.statusCode == 0) {
          
    //   } else {
    //       console.error('App: getSessionSync fail.');
    //       console.error(res);
    //   }
  });

    function runorderpay(ordersn) {
    var url = 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=payment&m=wshoto_yyt&op=getOrder';
    var orderid = 1;
    console.log("ordersn:" + ordersn);
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
                wx.redirectTo({
                  url: '../scan/scan',
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
          console.log('get jsapi fail.');
        }
      })
    }
      
    }
  },
  opp:function (e){
    this.setData({
         showModalStatus: false
       })
 wx.redirectTo ({ url: '/pages/center/center'})
  },
 util: function (currentStatu) {
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
  powerShower: function(e) {
    var orderId = e.target.dataset.id;
    if (this.data.power == '车辆控制') {
      wx.redirectTo({
        url: '../intelligent/intelligent?orderId=' + orderId,
      })
    }
  }
})
