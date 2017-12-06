//index.js
var app = getApp();
var testtt
var wwWidth = app.globalData.wwWidth
var wwHeight = app.globalData.wwHeight
Page({
  data: {
    login: "登录/注册",
    log: "120.30",
    lat: "31.57",
    markers: [],
    polyline: [{
      points: [{
        longitude: 120.30,
        latitude: 31.57
      }, {
        longitude: 120.30,
        latitude: 31.57
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../images/login.png',
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
      iconPath: '../images/location.png',
      position: {
        left: wwWidth / 2 - 160,
        top: wwHeight - 60,
        width: 30,
        height: 30,
      },
      clickable: true
    }]
  },

  onLoad: function (options) {
    var that = this
    var keythree = (wx.getStorageSync('keythree'));
    var phone = keythree.phone;
    console.log("keythree.phone:" + phone);
    if (phone != undefined && phone != '' && phone != null) {
      wx.redirectTo({ url: '/pages/scan/scan' })
    }
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=store&m=wshoto_yyt&op=getStore',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        testtt = new Array(res.data.message.length)
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
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    wx.openLocation({
      latitude: +(testtt[e.markerId].latitude),
      longitude: +(testtt[e.markerId].longitude),
    })
  },
  controltap(e) {
    console.log(e.controlId)
  },
  //执行函数
  primary: function (e) {
    console.log(222)
    //wx.navigateTo({ url: '/pages/shortcut/shortcut' })
    switch (e.controlId) {
      case 1: wx.redirectTo({ url: '/pages/shortcut/shortcut' }); break;
      case 2:
        var that = this
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
                testtt = new Array(res.data.message.length)
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
        }); break;
      // case 3: wx.navigateTo({ url: '/pages/center/center' }); break;
      // case 4: wx.navigateTo({ url: '/pages/recharge/recharge' }); break;
    }
  },
  act: function () {
    wx.redirectTo({
      url: '../shortcut/shortcut',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '人人租车',
      desc: '最时尚的租车方式!',
      path: '/page/user?id=123',
      success: function (res) {
        console.log(res)
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }


})

