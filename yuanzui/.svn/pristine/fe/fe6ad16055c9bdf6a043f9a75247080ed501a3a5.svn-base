//logs.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');

Page({
  data: {
    value:'',
      //value1:''
  },
  onLoad: function () {

  },
    valueChange:function (e) {
        let that=this;
        let value=e.detail.value;
        that.setData({
            value:value
        })

    },
    submit:function () {
        let that=this;
        var apitoken = wx.getStorageSync('apiToken').access_token;
        var sessionkey = wx.getStorageSync('sessionKey').sessionkey;
        var memberInfo = {
            'access_token': apitoken,
            'sessionkey': sessionkey,
            type: 2,
            title:that.data.value,
            content:""
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('POST').setExtraUrl('commInfo').communitys(function (res) {
            console.log(res);
            if (res.statusCode === 1) {
                if(res.data==1){
                    wx.showToast({
                        title: '发表成功'
                    });
                }else{
                    wx.showToast({
                        title:'发表失败'
                    });
                }
                setTimeout(function () {
                    wx.navigateBack();
                },600)
                //wx.navigateBack();
            }
        });
    },
})
