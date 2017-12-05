// pages/search/search.js
Page({
  data: {
    searchResult: ''
  },
  onLoad: function (options) {

    var that = this
    wx.request({
      url: 'https://yunrui.wshoto.com/index/products',
      data: {
        access_token: 'a3d9720108aee96753a84b852fa66c85',
        // keywords: searchProduce
      },
      header: { 'addons': 'ewei_shop' },
      success: function (res) {
        var result = res.data.result;
        if (result != undefined && result != '') {
          var lists = result;
          var searchResult = ''
          that.setData({
            lists: lists,
            resultState: that.data.resultState,
            searchResult: searchResult
          })
        } else {
          var searchResult = '没有符合条件的结果！';
          that.setData({
            searchResult: searchResult
          })
        }
      }
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  searchProduce: function (e) {
    var that = this
    var searchProduce = e.detail.value;
    that.setData({
      searchProduce: e.detail.value
    })
    wx.request({
      url: 'https://yunrui.wshoto.com/index/products',
      data: {
        access_token: 'a3d9720108aee96753a84b852fa66c85',
        keywords: searchProduce
      },
      header: { 'addons': 'ewei_shop' },
      success: function (res) {
        var result = res.data.result;
        if (result != undefined && result != '') {
          var lists = result;
          var searchResult = ''
          that.setData({
            lists: lists,
            resultState: that.data.resultState,
            searchResult: searchResult
          })
        } else {
          var searchResult = '没有符合条件的结果！';
          that.setData({
            searchResult: searchResult
          })
        }
      }
    })
  },
  produceDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../produceDetail/produceDetail?id=' + id,
    })
  }
})