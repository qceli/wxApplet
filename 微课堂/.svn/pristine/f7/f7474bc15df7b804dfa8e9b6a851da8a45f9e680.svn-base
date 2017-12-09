//logs.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');

Page({
  data: {
    logs: [],
      length:0,
      bbsDetail:[],
      id:'',
      value:'',
  },
  onLoad: function (options) {
      if(app.globalData.debug === true){
          console.log('comments.js onLoad running.');
      }
      let that=this;
      let id=options.id;
      that.setData({
          id:id
      });
      var apitoken = wx.getStorageSync('apiToken').access_token;
      var sessionkey = wx.getStorageSync('sessionKey').sessionkey;
      var memberInfo = {
        'access_token': apitoken,
        'sessionkey': sessionkey,
          type:1,
          id:id
      };
      console.log('sessionKey:' + wx.getStorageSync('sessionKey').sessionkey)
      esTools.fn.setEmpty().setHeader({
          'content-type': 'application/x-www-form-urlencoded'
      }).signData(memberInfo).setMethod('get').setExtraUrl('infoByCommId').communitys(function (res) {
          if (res.statusCode === 1) {
              console.log(res.data);
              that.setData({
                  bbsDetail:res.data
              });
          }
      });
  },
  toDetail: function () {
    wx.navigateBack({
      delta: 1
    })
  },
    valueChange:function (e) {
        let that=this;
        let valLength=e.detail.value.length;
        that.setData({
            length:valLength,
            value:e.detail.value
        })

    },
    submit:function () {
        let that=this;
        var apitoken = wx.getStorageSync('apiToken').access_token;
        var sessionkey = wx.getStorageSync('sessionKey').sessionkey;
        var memberInfo = {
          'access_token': apitoken,
          'sessionkey': sessionkey,
          type: 1,
          id: that.data.id,
          content: that.data.value
        };
        console.log(memberInfo);
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('POST').setExtraUrl('communityReply').communitys(function (res) {
            console.log(res);
            if (res.statusCode === 1) {
                if(res.data==1){
                    wx.showToast({
                        title: '发表成功'
                    });
                }else{
                    wx.showToast({
                        title:'您已评价过'
                    });
                }
                setTimeout(function () {
                    wx.navigateBack();
                },600)
            }
        });
    }
});
