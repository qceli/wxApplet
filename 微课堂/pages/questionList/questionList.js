
let app = getApp();
let util = require('../../utils/util');
let wsTools = require('../../utils/wshoto');
let esTools = require('../../utils/eshop/tools');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        quesList:[],
        answList:[],
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
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            id:id
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('replyLists').communitys(function (res) {
            console.log(res);
            console.log(res.data);
            if (res.statusCode === 1) {
                that.setData({
                    answList:res.data
                });
            }
        });
        let memberInfo1 = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            id:id
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo1).setMethod('get').setExtraUrl('infoByCommId').communitys(function (res) {
            console.log(res);
            console.log(res.data);
            if (res.statusCode === 1) {
                that.setData({
                    quesList:res.data
                });
            }
        });
    },
    onShow:function () {
        let that=this;
        let id=that.data.id;
        let apiToken = wx.getStorageSync('apiToken');
        let sessionKey = wx.getStorageSync('sessionKey');
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            id:id
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('replyLists').communitys(function (res) {
            console.log(res);
            console.log(res.data);
            if (res.statusCode === 1) {
                that.setData({
                    answList:res.data
                });
            }
        });
        let memberInfo1 = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            id:id
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo1).setMethod('get').setExtraUrl('infoByCommId').communitys(function (res) {
            console.log(res);
            console.log(res.data);
            if (res.statusCode === 1) {
                that.setData({
                    quesList:res.data
                });
            }
        });
    },
    toDetail:function (e) {
        let that=this;
        let id1=e.currentTarget.dataset.id;
        let id2=that.data.id;
        wx.navigateTo({
            url: '../questionDetail/questionDetail?id1='+id1+'&id2='+id2
        })
    },
    toAnsw:function () {
        let that=this;
        let id=that.data.id;
        wx.navigateTo({
            url: '../answer/answer?id='+id
        })
    }
})
