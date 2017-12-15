//logs.js
var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');

Page({
  data: {
    src:[],
      titleValue:'',
      contentValue:'',
      srcInx:''
  },
  onLoad: function () {

  },
    submit:function () {
        let that=this;
        var apitoken = wx.getStorageSync('apiToken').access_token;
        var sessionkey = wx.getStorageSync('sessionKey').sessionkey;
        console.log('apitoken', apitoken);
        console.log('sessionkey',sessionkey);
        console.log('srcInx', that.data.srcInx);
        console.log('title',that.data.titleValue);
        console.log('content',that.data.contentValue);
        // //return;
        wx.uploadFile({
          url: 'https://wsclass.wshoto.com/communitys/commInfo', //仅为示例，非真实的接口地址
          filePath: that.data.srcInx,
          name: 'image',
          //header: { "Content-Type": "multipart/form-data" },
          formData: {
            access_token: apitoken,
            sessionkey: sessionkey,
            type:1,
            title: that.data.titleValue,
            content:that.data.contentValue
          },
          success: function (res) {
            console.log(11111);
            //return;
            console.log('upload is success', res)
          },
          fail: function (res) {
            console.log('upload is fail', res)
          },
          complete:function(){
            console.log('upLoadFile is complete')
          }
        })
        // var apitoken = wx.getStorageSync('apiToken').access_token;
        // var sessionkey = wx.getStorageSync('sessionKey').sessionkey;
        // var memberInfo = {
        //     'access_token': apitoken,
        //     'sessionkey': sessionkey,
        //     type:1,
        //     title:that.data.titleValue,
        //     content:that.data.contentValue
        // };
        // esTools.fn.setEmpty().setHeader({
        //     'content-type': 'application/x-www-form-urlencoded'
        // }).signData(memberInfo).setMethod('POST').setExtraUrl('commInfo').communitys(function (res) {
        //     if (res.statusCode === 1) {
        //         console.log(res.data);
        //         if(res.data==1){
        //           wx.showToast({
        //             title: '发表成功',
        //               icon: 'succes',
        //           })
        //         }else{
        //             wx.showToast({
        //                 title: '发表失败'
        //             })
        //         }
        //         setTimeout(function(){
        //           let active='1'
        //             wx.redirectTo({
        //                 url: '../bbs/bbs?active='+active
        //             })
        //         },500)
        //     }else{
        //         wx.showToast({
        //             title: '网络错误'
        //         })
        //     }
        // });
    },
    valueChange:function (e) {
        let that=this;
        that.setData({
            titleValue:e.detail.value
        })
    },
    valueChange1:function (e) {
        let that=this;
        that.setData({
            contentValue:e.detail.value
        })
    },
  choseImg:function(){
    var that=this;
    wx.chooseImage({
        count: 3, //最多可以选择的图片数，默认为9
        sizeType: ['orignal','compressed'], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        console.log(res);
        var temp=res.tempFilePaths;
        that.setData({
          src:temp
        });
          var apitoken = wx.getStorageSync('apiToken').access_token;
          var sessionkey = wx.getStorageSync('sessionKey').sessionkey;
          var memberInfo = {
              'access_token': apitoken,
              'sessionkey': sessionkey,
          };
          console.log('memberInfo',memberInfo)
          for(let i=0;i<that.data.src.length;i++){
              that.setData({
                  srcInx:that.data.src[i]
              })
          }
          console.log('srcInx',that.data.srcInx);
      },
      fail: function(){
            wx.showToast({
              title: '网络错误，上传失败',
              icon: 'success',
              duration: 2000
            })
      }, //接口调用失败的回调函数
      complete: function(){
          console.log('choseImg complete!')
      } //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  }
})
