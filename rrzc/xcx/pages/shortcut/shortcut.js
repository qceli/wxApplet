// shortcut.js
var app = getApp();
var wh
var wc 
Page({
    data : {
      urls:"../images/shortcut.jpg",
      tex1:"微信快捷登录",
      tex2:"输入手机号码登录/注册",
      tex3: "点击登录，即表示已阅读并同意",
      tex4: "《用车服务条款》",
      encryptedData:'',
      iv:'',
      rawData:'',
      signature:'',
      imgUrls: [
      '../images/bg1.jpg',
      '../images/bg2.jpg',
      '../images/bg3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular:true,
    interval: 2000,
    duration: 1000
    },
     setting: function (e) {
         console.log(222)
        wx.navigateTo({ url: '/pages/agreement/agreement' })
    },
    tel: function (e) {
         console.log(222)
        wx.navigateTo({ url: '/pages/Login/Login' })
    },
    
    //事件处理函数
    short:function () {
      var that=this;
      //异步请求
      wx.login({
        success: function (res) {
        console.log(res);
        var code = res.code;
        console.log("code:" + code)
        if (res.code) {
          //发起网络请求

          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              console.log(res.rawData)
              wc = res.rawData
              console.log(wc);
            }
          })
          wx.request({
            url: 'https://api.renrenzuche.wshoto.com/login/login',
            header:{
              'UPASS': 'e8c46465ae55db08d633b803f1ec9b74',
              'UNAME': 'anymagic',
              'paytype': 'wechat',
              'addons': 'wshoto_yyt'
            },
            data: {
              code: code
            },
            success: function (res) {
              // console.log(JSON.stringify(res))
              console.log('shortcut.js---------:' + JSON.stringify(res.data))
              if (res.data.message.phone == null || res.data.message.phone ==""){
                  wx.setStorage({
                  key: "keythree",
                  data: {
                    'threerd_session': res.data.message.threerd_session,
                    'openid': res.data.message.openid
                  }
                }),
                wx.showModal({
                  title: '提示',
                  content: '手机未绑定，请输入手机号验证登录',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '/pages/Login/Login',
                      })
                    }
                  }
                })
              }
              else {
                wx.redirectTo({ url: '/pages/scan/scan' })

              }
              wx.setStorage({
                key: "keythree",
                data: {
                  'threerd_session': res.data.message.threerd_session,
                  'phone': res.data.message.phone,
                  'openid': res.data.message.openid
                }
              }),
                wx.request({
                url: 'https://api.renrenzuche.wshoto.com/login/userinfo', 
                  data: {
                    'encryptedData': that.data.encryptedData,
                    'iv': that.data.iv,
                    'rawData': that.data.rawData,
                    'signature': that.data.signature, 
                    'open_id':res.data.message.openid,
                    'threerd_session':res.data.message.threerd_session
                  },
                  header: {
                    'content-type': 'application/json',
                    'UNAME': 'anymagic',
                    'UPASS': 'e8c46465ae55db08d633b803f1ec9b74',
                    'paytype': 'wechat',
                    'addons': 'wshoto_yyt'
                  },
                  success: function (res) {
                    console.log(res.data)
                    
                  }
                })


              
              
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        console.log(that)
        console.log(res.iv);
        that.setData({
          'encryptedData': res.encryptedData,
          'iv': res.iv,
          'rawData': res.rawData,
          'signature': res.signature
        })
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
  }
})

