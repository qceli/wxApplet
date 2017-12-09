var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
let WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content1:'作为一个请问客服看到看啥快递卡萨丁付款开始的福克斯卡上岛咖啡喀什开始地方啥都没有',
        content2:'作为一个请问客服看到看啥快递卡萨丁付款开始的福克斯卡上岛咖啡喀什开始地方啥都没有',
        img:'../../image/right1.jpg',
        bbsDetail:[],
        replyList:[],
        id:''
    },
    onLoad: function (options) {
        let that=this;
        let id=options.id;
        that.setData({
            id:id
        });
        let apiToken = wx.getStorageSync('apiToken');
        let sessionKey = wx.getStorageSync('sessionKey');
        //https://wsclass.wshoto.com/communitys/infoByCommId
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:1,
            id:id
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('infoByCommId').communitys(function (res) {
            if (res.statusCode === 1) {
                console.log(res.data);
                that.setData({
                    bbsDetail:res.data
                });
                let article = res.data.content;
                WxParse.wxParse('article', 'html', article, that, 5); 
            }
        });
        let params={
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:1,
            id:id,
            page:1,
            psize:3
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('replyLists').communitys(function (res) {
            if (res.statusCode === 1) {
                console.log(res.data);
                that.setData({
                    replyList:res.data
                });
            }
        });
    },
    onShow: function() {
      let that = this;
      var id = that.data.id;
      let apiToken = wx.getStorageSync('apiToken');
      let sessionKey = wx.getStorageSync('sessionKey');
      //https://wsclass.wshoto.com/communitys/infoByCommId
      let memberInfo = {
        'access_token': apiToken.access_token,
        'sessionkey': sessionKey.sessionkey,
        type: 1,
        id: id
      };
      esTools.fn.setEmpty().setHeader({
        'content-type': 'application/x-www-form-urlencoded'
      }).signData(memberInfo).setMethod('get').setExtraUrl('infoByCommId').communitys(function (res) {
        if (res.statusCode === 1) {
          console.log(res.data);
          that.setData({
            bbsDetail: res.data
          });
          let article = res.data.content;
          WxParse.wxParse('article', 'html', article, that, 5);
        }
      });
      let params = {
        'access_token': apiToken.access_token,
        'sessionkey': sessionKey.sessionkey,
        type: 1,
        id: id,
        page: 1,
        psize: 3
      };
      esTools.fn.setEmpty().setHeader({
        'content-type': 'application/x-www-form-urlencoded'
      }).signData(memberInfo).setMethod('get').setExtraUrl('replyLists').communitys(function (res) {
        if (res.statusCode === 1) {
          console.log(res.data);
          that.setData({
            replyList: res.data
          });
        }
      });
    },
    toComments:function () {
        let that=this;
        let id=that.data.id;
        wx.navigateTo({
            url: '../comments/comments?id='+id
        })
    }
});
