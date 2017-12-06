// pages/bikeinfos/bikeinfos.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this
    var Id = options.id;
    wx.getStorage({
      key: 'keythree',
      success: function (res) {
        var phone = res.data.phone;
        var openId = res.data.openid;
        that.setData({
          openId: res.data.openid,
          phone: res.data.phone
        })
        wx.request({
          url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=getApply',
          data: {
            page: 1,
            open_id: openId,
            id: Id
          },
          success: function (res) {
            var list = res.data.message.lists[0];
            that.setData({
              list: list
            })
          }
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
  sureBtn: function () {
    wx.redirectTo({
      url: '../mineapply/mineapply',
    })
  }
})