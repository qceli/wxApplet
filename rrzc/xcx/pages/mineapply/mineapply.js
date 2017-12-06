// pages/mineapply/mineapply.js
Page({
  data: {
    page: 1
  },
  onLoad: function (options) {
    var that = this
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
            page: that.data.page,
            open_id: openId
          },
          success: function (res) {
            var lists = res.data.message.lists;
            var len = lists.length;
            that.setData({
              lists: lists,
              len: len
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
  onHide: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  bikeInfos: function (e) {
    var Id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../bikeinfos/bikeinfos?id=' + Id,
    })
  },
  loadMore: function () {
    var that = this
    var value = wx.getStorageSync('keythree');
    var openId = value.openid;
    var page = that.data.page + 1;
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=getApply',
      data: {
        page: page,
        open_id: openId,
      },
      success: function (res) {
        var lists = res.data.message.lists;
        var morelists = that.data.lists.concat(lists)
        var len = lists.length;
        that.setData({
          lists: morelists,
          len: len,
          page: page
        })
      }
    })
  },
  sureBtn: function () {
    wx.redirectTo({
      url: '../minebike/minebike',
    })
  }
})