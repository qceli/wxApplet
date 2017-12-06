// login.js
var wh
var wc 
Page({
  data : {
    phone:"",
    code:"",
    VerifyCode:"获取验证码"
  },


  bindKeyInput: function (e) {
    this.setData({
      phone:e.detail.value
    })
  },
  yan:function (e) {
    this.setData({
      code:e.detail.value
    })
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'keythree',
      success: function (res) {
        console.log(res.data)
        //globalData.sessionkey = res.data.threedrd_session
        wh = res.data.openid
      }
    }),
    //  wx.checkSession({
    //    success: function () {
    //      console.log(222)
    //    },
    //    fail: function () {
    //      //登录态过期
    //      wx.redirectTo({
    //        url: '../Login/Login',
    //      })
    //    }
    //  }),
      wx.getUserInfo({
        success: function (res) {
          console.log(res);
          console.log(res.rawData)
          wc = res.rawData
          console.log(wc);
        }
      })

  },
       //执行函数
  log: function (e) { 
    var that = this
    var phone = that.data.phone; 
    var code = that.data.code;   
    wx.setStorage({
      key: "keythree",
        data: {
          'threerd_session': wx.getStorageSync('keythree').threerd_session,
          'phone': phone,
          'openid': wx.getStorageSync('keythree').openid
        }
    })
    console.log(wc);
    var _Url = "https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=message&m=wshoto_yyt&op=checkCode&phone=" + phone + "&code=" + code + "&rawData=" + wc +"&openid="+wh
    wx.request({
      url: _Url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        
        // 'encryptedData': that.data.encryptedData,
        // 'iv': that.data.iv,
        // 'rawData': that.data.rawData,
        // 'signature': that.data.signature,
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.status);
        if (res.data.status == 1) {            
          wx.redirectTo({ url: '/pages/scan/scan' })
        } else if (res.data.status == -1) {
          wx.showModal({
            title: '提示',
            content: ' 请填入手机号！',
            showCancel: false
          })
        } else if (res.data.status == -2) {
          wx.showModal({
            title: '提示',
            content: '请填入手机验证码！',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '网络异常，请稍后重试！',
          showCancel: false
        })
      }
      
    });     
  } ,
      //  onLaunch:function(e) {
      //    wx.reLaunch({ url: '/pages/scan/scan' })
      //  },

  blurTel: function (e) {
    var linkTel = e.detail.value.replace(/\s/g, "");
    this.setData({
      linkTel: linkTel
    })
  },
  setVerify: function (e) {//发送验证码
  console.log("wwwwww");
    console.log(this.data.phone);
    var linkTel = this.data.linkTel;

    var _Url = "https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=message&m=wshoto_yyt&op=sendCode&phone="+this.data.phone

    var total_micro_second = 60 * 1000;
    //验证码倒计时5
    count_down(this, total_micro_second);
    wx.request({
      url: _Url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: [{
      //  agentLinktel: linkTel
      //  phone:18861855661
      }],
      success: function (res) {
        console.log(res)
    
        if (res.status == 1) {
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '发送验证码成功！',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("error res=")
        console.log(res.data)
      }
    });
  }

})


// 分割线--------------------------------------------------------------
/* 毫秒级倒计时 */
function count_down(that, total_micro_second) {
  if (total_micro_second <= 0) {
    that.setData({
      VerifyCode: "重新发送"
    });
    // timeout则跳出递归
    return;
  }
  // 渲染倒计时时钟
  that.setData({
    VerifyCode: date_format(total_micro_second) + " 秒"
  });
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that, total_micro_second);
  }, 10)
}
// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
  return sec;
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}