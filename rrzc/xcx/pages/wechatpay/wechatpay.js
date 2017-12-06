// wechatpay.js
Page({
  data: {
    start: "",
    vehicle_id: "",
    cost: "",
    left: ""
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=order&m=wshoto_yyt&op=getOrder',
      data: {
        id:13
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log(that.data)
        that.setData({
          start: res.data.message.start,
          vehicle_id: res.data.message.vehicle_id,
          cost: res.data.message.cost,
          left: res.data.message.left
        })

      }
    })
  }
})