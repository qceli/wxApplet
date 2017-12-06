// pages/minebike/minebike.js
var app = getApp();
Page({
  data: {
    phone: '',
    openId: '',
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
          url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=getVehicle',
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
  onShareAppMessage: function () {
  
  },
  reback: function (e) {
    var Id = e.currentTarget.dataset.id;
    var value = wx.getStorageSync('keythree')
    var openId = value.openid;
    wx.showModal({
      title: '提示',
      content: '是否确定预约退车',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=backApply',
            data: {
              vehicle_id: Id,
              open_id: openId
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
              console.log(JSON.stringify(res))
              if (res.data.status == 1) {
                wx.showModal({
                  title: '提示',
                  content: '预约退车成功，请耐心等待商家联系。',
                })
                wx.redirectTo({
                  url: '../mineapply/mineapply',
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  loadMore: function () {
    var that = this
    var value = wx.getStorageSync('keythree');
    var openId = value.openid;
    var page = that.data.page + 1;
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=getVehicle',
      data: {
        page: page,
        open_id: openId,
      },
      success: function (res) {
        var lists = res.data.message.lists;
        var morelists = that.data.lists.concat(lists);
        var len = lists.length;
        that.setData({
          lists: morelists,
          len: len,
          page: page
        })
      }
    })
  },
  owner: function () {
    wx.navigateTo({
      url: '../applybike/applybike',
    })
  },
  mineApply: function () {
    wx.redirectTo({
      url: '../mineapply/mineapply',
    })
  },
  mineMmoney: function() {
    wx.navigateTo({
      url: '../remind/remind',
    })
  }
})