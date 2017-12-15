// pages/courseDetail/courseDetail.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  courseLoading: function (id, ids, pid) {
    var that = this;
    console.log(id); console.log(ids); console.log(pid);
    that.setData({
      pid: pid,
      ids: ids
    })
    let apiToken = wx.getStorageSync('apiToken');
    let sessionKey = wx.getStorageSync('sessionKey');
    let param = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionKey.sessionkey,
        sectionid: id,
        pid: pid,
        ids: ids,
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(param).setMethod('get').setExtraUrl('sectionInfo').lessons(function (res) {
      if (res.statusCode === 1) {
        console.log(res.data)
        let lesDetail = res.data;
        let id = res.data.id;
        let ids = res.data.ids;
        console.log(ids);
        let preId;
        let nextId;
        let preTitle;
        let nextTitle;
        for (let i = 0, len = ids.length; i < len; i++) {
          if (ids[i] == id) {
            if(i == 0){
              preId = false;
              nextId = ids[i + 1];
              preTitle = false;
              nextTitle = lesDetail.list[i+1].title;
            }else if(i == len-1){
              preId = ids[i - 1];
              nextId = false;
              preTitle = lesDetail.list[i - 1].title;
              nextTitle = false;
            }else{
              preId = ids[i - 1];
              nextId = ids[i + 1];
              preTitle = lesDetail.list[i - 1].title;
              nextTitle = lesDetail.list[i + 1].title;
            }            
            console.log("preId: " + preId);
            console.log("nextId: " + nextId);
            console.log("preTitle: " + preTitle);
            console.log("nextTitle: " + nextTitle);
          }
        }
        that.setData({
          lesDetail: lesDetail,
          preId: preId,
          nextId: nextId,
          preTitle: preTitle,
          nextTitle: nextTitle
        })
      }else{
        console.log(res.errMsg);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this;
    let sectionid = options.id;
    let pid = options.pid;
    let ids = options.ids;
    that.courseLoading(sectionid, ids, pid);
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  courseDetail: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let ids = e.currentTarget.dataset.ids;
    let pid = e.currentTarget.dataset.pid;
    console.log(ids);
    that.courseLoading(id, ids, pid);
  }
})