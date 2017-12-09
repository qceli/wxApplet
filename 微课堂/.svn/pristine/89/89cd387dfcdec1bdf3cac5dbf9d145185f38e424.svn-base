let app = getApp();
let util = require('../../utils/util');
let wsTools = require('../../utils/wshoto');
let esTools = require('../../utils/eshop/tools');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        answList:[],
        quesList:[]
    },
    onLoad:function (options) {
        let that=this;
        let id1=options.id1;
        let id2=options.id2;
        let apiToken = wx.getStorageSync('apiToken');
        let sessionKey = wx.getStorageSync('sessionKey');
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:2,
            id:id1
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('replyInfoById').communitys(function (res) {
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
            id:id2
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
    collect:function () {
        let that=this;
        let id=that.data.answList.id;
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
        }).signData(memberInfo).setMethod('get').setExtraUrl('communityCollect').communitys(function (res) {
            console.log(res);
            console.log(res.data);
            if (res.statusCode === 1) {
                if(res.data==1){
                    wx.showToast({
                        title: '点赞成功'
                    });
                    let id=that.data.answList.id;
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
                    }).signData(memberInfo).setMethod('get').setExtraUrl('replyInfoById').communitys(function (res) {
                        console.log(res);
                        //console.log(res.data);
                        if (res.statusCode === 1) {
                            that.setData({
                                answList:res.data
                            });
                        }
                    });
                }else{
                    wx.showToast({
                        title: '您已赞过'
                    })
                }
            }
        });
    }
})
