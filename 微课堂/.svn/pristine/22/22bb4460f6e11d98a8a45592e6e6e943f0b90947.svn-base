var app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
let WxParse= require('../../wxParse/wxParse.js');
Page({
    data: {
        tabArr:{
            curTabIndex:0,
            curDivIndex:0
        },
        bbsList1:[],
        bbsList2:[],
        active:''
    },
    onLoad: function (options) {
        if(app.globalData.debug === true){
            console.log('comments.js onLoad running.');
            console.log(options)
        }
        let that = this;
        console.log(options)
        if(options!=={}){
            let active=options.active;
            that.setData({
                tabArr:{
                    curTabIndex:active,
                    curDivIndex:active
                },
                active:active
            })
        }
        // let active=options.active;
        // if(active!==''){
        //     that.setData({
        //         tabArr:{
        //             curTabIndex:active,
        //             curDivIndex:active
        //         },
        //         active:active
        //     })
        else{
            that.setData({
                tabArr:{
                    curTabIndex:0,
                    curDivIndex:0
                }
            })
        }
        wx.showLoading({
            title: '加载中',
            icon:'loading'
        });
        setTimeout(function(){
            wx.hideLoading()
        },500);
      let apiToken = wx.getStorageSync('apiToken');
      let sessionKey = wx.getStorageSync('sessionKey');
      let memberInfo = {
        'access_token': apiToken.access_token,
        'sessionkey': sessionKey.sessionkey,
          type:1,
          hot:0,
          source:2,
          page:1,
          psize:3
      };
      let params={
          'access_token': apiToken.access_token,
          'sessionkey': sessionKey.sessionkey,
          type:1,
          hot:0,
          source:1,
          page:1,
          psize:3
      };
      esTools.fn.setEmpty().setHeader({
        'content-type': 'application/x-www-form-urlencoded'
      }).signData(memberInfo).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
        if (res.statusCode === 1) {
          console.log(res.data);
          that.setData({
              bbsList1:res.data
          });
          for(let i=0;i<res.data.length;i++){
              let article=res.data[i].content;
              WxParse.wxParse('article', 'html', article, that, 5);
          }
        }
      });
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(params).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode === 1) {
                console.log(res.data);
                that.setData({
                    bbsList2:res.data
                })
                //WxParse.wxParse('article', 'html', res.data.content, that, 5);
            }
        });
    },
    onShow:function () {
        let that = this;
        console.log('active:'+that.data.active)
        wx.showLoading({
            title: '加载中',
        });
        setTimeout(function(){
            wx.hideLoading()
        },500);
        if(that.data.active!==undefined){
            that.setData({
                tabArr:{
                    curTabIndex:that.data.active,
                    curDivIndex:that.data.active
                },
            })
        }else{
            that.setData({
                tabArr:{
                    curTabIndex:0,
                    curDivIndex:0
                }
            })
        }
        let apiToken = wx.getStorageSync('apiToken');
        let sessionKey = wx.getStorageSync('sessionKey');
        let memberInfo = {
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:1,
            hot:0,
            source:2,
            page:1,
            psize:3
        };
        let params={
            'access_token': apiToken.access_token,
            'sessionkey': sessionKey.sessionkey,
            type:1,
            hot:0,
            source:1,
            page:1,
            psize:3
        };
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(memberInfo).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode === 1) {
                console.log(res.data);
                that.setData({
                    bbsList1:res.data
                });
                for(let i=0;i<res.data.length;i++){
                    let article=res.data[i].content;
                    WxParse.wxParse('article', 'html', article, that, 5);
                }
            }
        });
        esTools.fn.setEmpty().setHeader({
            'content-type': 'application/x-www-form-urlencoded'
        }).signData(params).setMethod('get').setExtraUrl('communityLists').communitys(function (res) {
            if (res.statusCode === 1){
                console.log(res.data);
                that.setData({
                    bbsList2:res.data
                })
                //WxParse.wxParse('article', 'html', res.data.content, that, 5);
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
    toDetail:function(e){
        console.log(e)
        let that=this;
        let id=e.currentTarget.dataset.id;
        let curDivIndex=e.currentTarget.dataset.curdivindex;
        // that.setData({
        //     tabArr:{
        //         curTabIndex:curDivIndex,
        //         curDivIndex:curDivIndex
        //     }
        // });
        wx.navigateTo({
            url: '../bbsDetail/bbsDetail?id='+id
        })
    }
});
