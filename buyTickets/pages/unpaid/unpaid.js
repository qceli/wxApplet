// pages/unpaid/unpaid.js
var app = getApp()
Page({
  data: {
    domain: app.globalData.domain
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.domain + 'Home/TicketOrder/unpayInfo',
      data: {
        openid: app.globalData.openId,
        tid: options.tid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          orderInfos: res.data,
          ticketName: res.data.t_name,
          ticketPrice: res.data.price,
          tricketDate: res.data.buy_time,
          trickNumber: res.data.count,
          personName: res.data.customer,
          telephoneNum: res.data.phone,
          totalPrice: res.data.price
        })
      }
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  payMoney: function () {
    var that = this
    console.log("unpaid------提交订单")
    var tricketDate = that.data.tricketDate;
    var ticketName = that.data.ticketName;
    var trickNumber = that.data.trickNumber;
    var personName = that.data.personName;
    var telephoneNum = that.data.telephoneNum;
    var totalPrice = that.data.totalPrice;
    // console.log("ticketName:" + ticketName + ",date:" + tricketDate + ",trickNumber:" + trickNumber + ",personName:" + personName + ",telephoneNum:" + telephoneNum + ",totalPrice:" + totalPrice)
    wx.request({
      url: that.data.domain + 'Home/Pay/pay',
      data: {
        openid: app.globalData.openId,
        t_name: ticketName,
        single_price: that.data.ticketPrice,
        use_time: tricketDate,
        count: trickNumber,
        customer: personName,
        phone: telephoneNum,
        price: totalPrice
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res.data.sign: " + res.data.sign)
        console.log("----------支付")
        wx.requestPayment(
          {
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (res) {
              wx.redirectTo({
                url: '../orders2/orders2',
              })
            },
            'fail': function (res) {
              wx.showModal({
                title: '提示',
                content: '支付失败！',
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../orders/orders',
                    })
                  } else if (res.cancel) {
                    wx.redirectTo({
                      url: '../orders/orders',
                    })
                  }
                }
              })
            },
            'complete': function (res) { }
          })
      }
    })

  }
})