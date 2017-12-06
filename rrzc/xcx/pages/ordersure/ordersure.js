// ordersure.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var ww;
var whh;
var phone;
var wh
var cyj;
var orderId;
var QR = require('../../utils/wxqrcode.js');
Page ({
      data : {
        url2:"../images/shop.jpg",
        tex1:"订单详情",
        tex2:"",
        tex3:"无锡滨湖博大店",
        tex4:"我要租车",
        tex5:"无锡博大",
        phone:"",
        showModalStatus: false ,
        imagetest: '',
      },
      //执行函数
    //    onLoad:function (options){
    //      ccoconsole.log(options)

    // },
      powerDrawer: function (e) {
        console.log(phone)
        var thats = this
        wx.request({
        url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=order&m=wshoto_yyt&op=generateOrder&vehicle_id='+cyj+'&phone='+phone, 
        data: {

        },
        header: {
            'content-type': 'application/json'
        }, 
        success: function(res) {
          console.log(res)
          var status = res.data.status;
          if (status != 1) {
            wx.showModal({
              title: '提示',
              content: '您有未完成的订单！',
            })
          } else {
            whh = res.data.message.ordersn;
            console.log("------------------------")
            console.log(JSON.stringify(res.data))
            orderId = res.data.message.order_id;
            thats.setData({
              imagetest: QR.createQrCodeImg(whh, { size: 150 })
            })
            wx.setStorage({
              key: "keytwo",
              data: {
                'ordersn': res.data.message.ordersn
              }
            })
            wx.request({
              url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=order&m=wshoto_yyt&op=getOrderInfo',
              data: {
                ordersn: whh
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data)
                var currentStatu = e.currentTarget.dataset.statu;
                thats.util(currentStatu)
                if (res.data.message.status == 0) {
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
                else if (res.data.message.status == 1) {
                  wx.showModal({
                    title: '提示',
                    content: '租车成功，祝您旅途愉快！',
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateTo({ url: '/pages/myorder/myorder' })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
            })
          }

        }
      })
     
    },
      pp:function (e) {
        this.setData({
          showModalStatus: false
        })
        wx.request({
          url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=order&m=wshoto_yyt&op=getOrderInfo', 
          data: {
            ordersn:whh
          },
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data)
            if(res.data.message.status==0){
                wx.showModal({
                  title: '提示',
                  content: '订单未确认，请等待店主确认',
                  success: function(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
            }
            else if (res.data.message.status==1){
              // var orderId = whh;
                wx.showModal({
                  title: '提示',
                  content: '租车成功，祝您旅途愉快！',
                  success: function(res) {
                    if (res.confirm) {
                      wx.navigateTo({ url: '/pages/intelligent/intelligent?orderId=' + orderId})
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
            }
          }
        })
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
     onLoad: function (options) {
       app.getstorge();
           wx.getStorage({
             key: 'keythree',
            success: function (res) {
              console.log(res)
              console.log(res.data.phone)
              //globalData.sessionkey = res.data.threedrd_session
              wh=res.data.threedrd_session
              phone= res.data.phone
            }
          }),
    wx.getStorage({
      key: 'keyfor',
      success: function(res) {
          console.log(res.data)
          cyj=res.data.id

      } 
    })
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
       wx.request({
         url: "https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=vehicleDetail",
         data: {
           id: decodeURIComponent(options.id)
         },
         header: {
           'content-type': 'application/json'
         },
         success: function (res) {
           console.log(res.data)
           console.log(that.data)
           that.setData({
             tex3: res.data.message.lists.store_name,
             tex5:res.data.message.lists.store_address,
             phone:res.data.message.lists.phone,
             tex2: res.data.message.lists.vehicle_number

           })
         }
       })
       //request
     }
})

   
