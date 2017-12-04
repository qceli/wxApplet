// pages/discuss/discuss.js
var utils = require('../../utils/util.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    designCode: "",
    myCode: '',
    orderFile: '',
    chiefName: '',
    latestStateTime: "",
    inputValue: '',
    loadDatas: [],
    allContentList: [],
    isAll: 1,
    record: [],
    recordId:"",
    lastId:"",
    firstId: '',
    newFirstId: '',
    loadRecord:'',
    msg:"",
    str: '',
    toView: '',
    logo: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      designCode: options.designCode,
      token: options.chatToken
    })
    var designCode = options.designCode;
    console.log("options.designCode" + this.data.designCode);
    wx.request({
      url: app.globalData.URL + '/pss/order/info?orderId=' + this.data.designCode + '&chatToken=' + this.data.token,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        // 非法用户
        if (res.data.result == 20001) {
          wx.redirectTo({
            url: '../index/index?chatToken=' + wx.getStorageSync('chatToken')
          })
          return
        }
        var lastTime = utils.dateFormat(data.order.latestStateTime, "yyyyMMddhhmmss");
        console.log("data:" + data + ",lastTime:" + lastTime);
        that.setData({
          orderFile: data.order.orderFile,
          chiefName: data.order.chiefName,
          latestStateTime: lastTime
        })

      }
    })
    wx.request({
      url: app.globalData.URL + '/pss/discuss/records?designCode=' + this.data.designCode + '&chatToken=' + this.data.token + '&pageSize=20',
      data: {},
      method:'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        var isAll = data.isAll;
        var recordId = data.record[0].id;
        var num = data.record.length - 1;
        var lastId = data.record[num].id;
        console.log("num:" + num + ",lastId:" + lastId);
        console.log("toView:" + 's_' + lastId);
        console.log("talkContent" + data);
        that.setData({
          myCode: data.myCode,
          record: data.record,
          isAll: data.isAll,
          recordId: data.record[0].id,
          lastId: data.record[num].id,
          firstId: data.record[num].id
          // loadDatas: data.record
        })
      }
    })
    {
      setTimeout(() => {
        var that = this
        var lastId = that.data.lastId;
        console.log("setTimeout-lastId:" + lastId);
        this.setData({
          toView: 's_' + this.data.lastId
        })
      }, 1000);
    }
    {
      var designCode = this.data.designCode;
      var interval = setInterval(() => {
        var that = this
        var token = this.data.token;
        var lastId = that.data.lastId;
        var allContentList = that.data.allContentList;
        console.log("-----setInterval-lastId:" + lastId);
        wx.request({
          url: app.globalData.URL + '/pss/discuss/news?designCode=' + designCode + '&chatToken=' + this.data.token + '&lastId=' + lastId,
          data: {},
          method: 'GET',
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            var data = res.data;
            if ( data.record!= '') {
              var recordId = data.record[0].id;
              allContentList = allContentList.concat(data.record);
              console.log("-----setInterval-data.record" + data.record)
              console.log("-----setInterval-allContentList" + allContentList);
              var length = data.record.length;
              var lastNum = length - 1;
              var toView = 't_' + data.record[lastNum].id;
              console.log("接收消息toView:" + toView);
              console.log(data);
              that.setData({
                allContentList: allContentList,
                lastId: data.record[lastNum].id,
                toView: 't_' + lastId,
                reSend: 0
              })
              setTimeout((function callback() {
                that.setData({
                  toView: utils.setToView(toView)
                })
              }), 500);
            }
            wx.request({
              url: app.globalData.URL + '/pss/discuss/last?chatToken=' + token + '&pageSize=10',
              data: {},
              method: 'GET',
              header: {
                "Content-Type": "application/json"
              },
              success: function (res) {
                var data = res.data;
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2]; //上一个页面
                prevPage.changeData(data);
              }
            })
          }
        })
      }, 3000);
      wx.setStorageSync('interval', interval);
    }
  },
  onShow: function () {

  },
  onHide: function () {
    
  },
  onUnload: function () {
    clearInterval(wx.getStorageSync('interval'));
  },
  loadMore: function (event) {
    var that = this
    var lastId = this.data.recordId;
    var loadDatas = this.data.loadDatas;
    console.log("loadDatas:" + loadDatas);
    console.log("lastId" + lastId);
    wx.request({
      url: app.globalData.URL + '/pss/discuss/records?chatToken=' + this.data.token + '&designCode=' + this.data.designCode + '&pageSize=20&lastId=' + this.data.recordId,
        data: {},
        method: 'GET',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          var that = this
          var data = res.data;
          console.log("data" + data);
          var isAll = data.isAll;
          var recordId = data.record[0].id;
          var loadRecord = data.record;
          loadDatas = loadRecord.concat(loadDatas);
          console.log("concatloadDatas" + loadDatas);
          that.setData({
            myCode: data.myCode,
            loadRecord: loadDatas,
            recordId: data.record[0].id,
            isAll: data.isAll,
            loadDatas: loadDatas
          })

        }.bind(this)
      })
  },
  bindPreview: function (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: [e.target.dataset.src],
      success: function (res) {
      }
    })
  },
  chooseImg() {
    let _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        _this.setData({
          logo: res.tempFilePaths[0],
        })
        var tempFilePaths = res.tempFilePaths;
        console.log("tempFilePaths:" + res.tempFilePaths[0])
        wx.setStorageSync('filePath', res.tempFilePaths[0]);
        var url = app.globalData.URL + '/pss/discuss/applet/image?designCode=' + _this.data.designCode + '&chatToken=' + _this.data.token;
        wx.uploadFile({
          url: url,
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          }, // 设置请求的 header
          // formData: formData, // HTTP 请求中其他额外的 form data
          success: function (res) {
            console.log(res);
            if (res.statusCode == 200 && !res.data.result_code) {
              typeof success == "function" && success(res.data);
            } else {
              typeof fail == "function" && fail(res);
            }
          },
          fail: function () {
            console.log(res);
            typeof fail == "function" && fail(res);
            _this.setData({
              msgType: 1,
              reSend: 1,
              filePath: wx.getStorageSync('filePath')
            })
            setTimeout(() => {
              console.log("setTimeout-reSendId");
              _this.setData({
                toView: 'reSendId'
              })
            }, 500);
          }
        })
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  sendMessage: function(){
    var that = this
    var designCode = that.data.designCode;
    var token = this.data.token;
    var firstId = that.data.firstId;
    console.log("firstId=" + that.data.firstId);
    var allContentList = that.data.allContentList;
    var message = that.data.inputValue;
    if (message == null || message=="") {
      console.log("message为空");
    } else {
      console.log('msg=' + message);
      that.setData({
        inputTemp: '', 
        inputValue: ''
      })
      wx.request({
        url: app.globalData.URL + '/pss/discuss/message?chatToken=' + token + '&designCode=' + designCode + '&clientType=2&message=' + message,
        data: {},
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          var data = res.data;
          var newFirstId = data.recordId;
          console.log("消息发送成功返回, newFirstId=" + data.recordId);
          that.setData({
            newFirstId: data.recordId            
          })
          if (firstId < newFirstId) {
            wx.request({
              url: app.globalData.URL + '/pss/discuss/news?designCode=' + designCode + '&chatToken=' + token +'&lastId=' + firstId,
              data: {},
              method: 'GET',
              header: {
                "Content-Type": "application/json"
              },
              success: function (res) {
                var data = res.data;
                allContentList = allContentList.concat(data.record);
                console.log("sendMessage_data.record" + data.record);
                var length = data.record.length;
                var lastNum = length - 1;
                console.log("lastNum" + lastNum);
                var toView = 't_' + data.record[lastNum].id;
                console.log("toView:" + 't_' + data.record[lastNum].id);
                console.log(data);
                that.setData({
                  allContentList: data.record,
                  lastId: data.record[lastNum].id,
                  toView: toView,
                  reSend: 0
                  // loadDatas: data.record
                })             
              }
            })
          }
          wx.request({
            url: app.globalData.URL + '/pss/discuss/last?chatToken=' + token + '&pageSize=10',
            data: {},
            method: 'GET',
            header: {
              "Content-Type": "application/json"
            },
            success: function (res) {
              var data = res.data;
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2]; //上一个页面
              prevPage.changeData(data);
            }
          })
        },
        fail: function () {
          wx.setStorageSync('message', message);
          that.setData({
            msgType: 0,
            reSend: 1,
            reText: wx.getStorageSync('message'),
            reSendTime: 1
          })
          setTimeout(() => {
            console.log("setTimeout-reSendId");
            that.setData({
              toView: 'reSendId'
            })
          }, 500);
        }  
      })
      setTimeout((function callback() {
        this.setData({
          toView: utils.setToView(this.data.toView)
        })
      }).bind(this), 500);
    }
    
  },
  reSend: function () {
    if (this.data.reSendTime != 0) {
      this.setData({
        reSendTime: 0
      })
      var msgType = this.data.msgType;
      if (msgType == 1) {
        var filePath = wx.getStorageSync('filePath');
        var url = app.globalData.URL + '/pss/discuss/applet/image?designCode=' + this.data.designCode + '&chatToken=' + this.data.token;
        app.upload_file(url, filePath, 'file',
          function (res) {
            this.setData({
              reSend: 0
            })
          }.bind(this))
      } else {
        var that = this
        wx.request({
          url: app.globalData.URL + '/pss/discuss/message?chatToken=' + this.data.token + '&designCode=' + this.data.designCode + '&clientType=2&message=' + wx.getStorageSync('message'),
          data: {},
          method: 'POST',
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
          },
          fail: function (res) {
            that.setData({
              reSendTime: 1
            })
          }
        })
      }
      
    }
    
  }

})

