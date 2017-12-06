// pages/getmoney/getmoney.js
Page({
  data: {
    account: '',
    alipay: '',
    name: ''
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  accountInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  moneyInput: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  getMoney: function() {
    var that = this
    var value = wx.getStorageSync('keythree');
    var openId = value.openid;
    var amount = that.data.money;
    var alipay = that.data.account;
    var name = that.data.name;
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=member&m=wshoto_yyt&op=withdraw',
      data: {
        amount: amount,
        alipay: alipay,
        open_id: openId,
        alipay_name: name
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var message = res.data.message;
        var status = res.data.status;
        if (status == 1) {
          wx.showModal({
            title: '提示',
            content: '申请提现成功！',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../remind/remind',
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../remind/remind',
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: message,
          })
        }
      }
    })
  }

})