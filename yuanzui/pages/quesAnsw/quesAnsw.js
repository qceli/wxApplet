
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
let WxParse= require('../../wxParse/wxParse.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabArr:{
            curTabIndex:0,
            curDivIndex:0
        },
        quesAnsw1:[],
        quesAnsw2:[],
        page1:2,
        page2:2,
        psize:4
    },
    onLoad: function () {
        let that = this;
        let apiToken = wx.getStorageSync('apiToken');
        let sessionKey = wx.getStorageSync('sessionKey');
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            source:2,
            page:1,
            psize:4
        };
        let params={
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            source:1,
            page:1,
            psize:4
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode == 1) {
                console.log(res.data);
                that.setData({
                    quesAnsw1:res.data
                });
            }
        });
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(params).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode == 1) {
                console.log(res.data);
                that.setData({
                    quesAnsw2:res.data
                })
            }
        });
    },
    onShow:function () {
        let that = this;
        let apiToken = wx.getStorageSync('apiToken');
        let sessionKey = wx.getStorageSync('sessionKey');
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            source:2,
            page:1,
            psize:4
        };
        let params={
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            source:1,
            page:1,
            psize:4
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode == 1) {
                console.log(res.data);
                that.setData({
                    quesAnsw1:res.data
                });
            }
        });
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(params).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode == 1) {
                console.log(res.data);
                that.setData({
                    quesAnsw2:res.data
                })
            }
        });
    },
    onReachBottom: function () {
        //上拉
        console.log("上拉");
        let that = this;
        let apiToken = wx.getStorageSync('apiToken');
        let sessionKey = wx.getStorageSync('sessionKey');
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            source:2,
            page:that.data.page1,
            psize:that.data.psize
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode == 1) {
                that.setData({
                    quesAnsw1:that.data.quesAnsw1.concat(res.data),
                    page1:that.page1+1
                });
            }
        });
        let params={
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            source:1,
            page:that.data.page2,
            psize:that.data.psize
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(params).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode == 1) {
                that.setData({
                    quesAnsw2:that.data.quesAnsw2.concat(res.data),
                    page2:that.data.page2+1
                });
            }else{
                console.log('哈哈哈哈哈哈')
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
    toDetail:function (e){
        let that=this;
        that.setData({
          page1:2,
          page2:2
        });
        let id=e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../answer/answer?id='+id
        })
    },
    toQues:function () {
        let that=this;
        that.setData({
            page1:2,
            page2:2
        });
        wx.navigateTo({
            url: '../question/question'
        })
    }
})
