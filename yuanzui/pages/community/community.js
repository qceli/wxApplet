// pages/myClass/myClass.js
let app = getApp();
let util = require('../../utils/util');
let wsTools = require('../../utils/wshoto');
let esTools = require('../../utils/eshop/tools');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr:{
      curTabIndex:0,
      curDivIndex:0
    },
      goodList:[],
      quesList:[]
  },
    onLoad: function () {
        let that=this;
        let apiToken = wx.getStorageSync('apiToken');
        let sessionKey = wx.getStorageSync('sessionKey');
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            good:1,
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode === 1) {
                that.setData({
                    goodList:res.data
                });
            }
        });
        let memberInfo1 = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            hot:1
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo1).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            console.log(res);
            console.log(res.data);
            // for(let i=0;i<res.data.length;i++){
            //     news=res.data[res.data.length-1]
            // }
            if (res.statusCode === 1) {
                that.setData({
                    quesList:res.data
                });
            }
        });
    },
    onShow:function(){
        let that=this;
        let apiToken = wx.getStorageSync('apiToken');
        let sessionKey = wx.getStorageSync('sessionKey');
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            good:1,
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode === 1) {
                that.setData({
                    goodList:res.data
                });
            }
        });
        let memberInfo1 = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo1).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode === 1) {
                that.setData({
                    quesList:res.data[0]
                });
            }
        });
    },
  tab: function (e) {
    var dataId = e.currentTarget.dataset.id;
    var obj = {};
    obj.curTabIndex = dataId;
    obj.curDivIndex = dataId;
    this.setData({
      tabArr: obj
    })
  },
    toMore:function(){
        wx.navigateTo({
            url: '../bbs/bbs'
        })
    },
    toquAns:function () {
        wx.navigateTo({
          url: '../quesAnsw/quesAnsw'
        })
    },
    toComment:function () {
        wx.navigateTo({
            url: '../commentt/commentt'
        })
    },
    toDetail:function(e){
        let id=e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../bbsDetail/bbsDetail?id='+id
        })
    },
    toquesList:function () {
        let that=this;
        let id=that.data.quesList.id;
        wx.navigateTo({
            url: '../questionList/questionList?id='+id
        })
    },
    selected: function (e) {
      wx.redirectTo({
        url: '../index/index',
      })
    },
    selected1: function (e) {
      wx.redirectTo({
        url: '../course/course',
      })
    },
    selected3: function (e) {
      wx.redirectTo({
        url: '../eshop/eshop',
      })
    },
    selected4: function (e) {
      wx.redirectTo({
        url: '../center/center',
      })
    },
});