//logs.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    src:'',
    quesAnsw:[],
      id:'',
      value:''
  },
  onLoad: function (options) {
    let that=this;
    let id=options.id;
      let apiToken = wx.getStorageSync('apiToken');
      let sessionKey = wx.getStorageSync('sessionKey');
      //https://wsclass.wshoto.com/communitys/infoByCommId
      let memberInfo = {
          'access_token': apiToken.access_token,
          'sessionkey': sessionKey.sessionkey,
          type:2,
          id:id
      };
      that.setData({
          id:id
      })
      esTools.fn.setEmpty().setHeader({
          'content-type': 'application/x-www-form-urlencoded'
      }).signData(memberInfo).setMethod('get').setExtraUrl('infoByCommId').communitys(function (res) {
          if (res.statusCode === 1) {
              console.log(res.data);
              that.setData({
                  quesAnsw:res.data,
              });
          }
      });
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
            id: that.data.id,
            content: that.data.value
        };
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
                //wx.navigateBack();
            }
        });
    },
  choseImg:function () {
    var that=this;
    wx.chooseImage({
        count: 3, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            that.setData({
                src:tempFilePaths[0]
            })
        }
    })
  }
});
