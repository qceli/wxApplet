// pages/applybike/applybike.js
var util = require('../../utils/util.js')
Page({
  data: {
    name: '',
    tel: '',
    brand: '',
    endTime: '',
    dateValue: '',
    code: '',
    placeArray: [],
    index: 0
  },
  onLoad: function (options) {
    var that = this
    var date = util.formatTime1(new Date(new Date()));
    that.setData({
      endTime: date
    })
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=storeList',
      data: {},
      success: function (res) {
        var list = res.data.message;
        that.setData({
          placeArray: list
        })
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  brandInput: function (e) {
    this.setData({
      brand: e.detail.value
    })
  },
  dateChange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  }, 
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  placeChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  }, 
  chooseImage: function () {
    let _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        _this.setData({
          logo: res.tempFilePaths[0],
          tempFilePath: res.tempFilePaths[0]
        })
        var tempFilePaths = res.tempFilePaths;
        console.log("tempFilePaths:" + res.tempFilePaths[0])
        wx.setStorageSync('filePath', res.tempFilePaths[0]);
        var url = "https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=upload";
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
            // setTimeout(() => {
            //   console.log("setTimeout-reSendId");
            //   _this.setData({
            //     toView: 'reSendId'
            //   })
            // }, 500);
          }
        })
      }
    })
  },
  submit: function () {
    var that = this
    var value = wx.getStorageSync('keythree');
    var openId = value.openid;
    var name = that.data.name;
    var tel = that.data.tel;
    var brand = that.data.brand;
    var dateValue = that.data.dateValue;
    var code = that.data.code;
    var i = that.data.index;
    var pickerPlace = that.data.placeArray[i];
    var tempFilePaths = that.data.tempFilePath;
    wx.request({
      url: 'https://api.renrenzuche.wshoto.com/app/index.php?i=1&c=apientry&do=vehicle&m=wshoto_yyt&op=applay',
      data: {
        open_id: openId,
        member_name: name,
        member_phone: tel,
        brand: brand,
        buytime: dateValue,
        number: code,
        store_name: pickerPlace, 
        imgs: tempFilePaths
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(JSON.stringify(res.data))
        var message = res.data.message;
        if (message =="申请成功") {
          wx.redirectTo({
            url: '../mineapply/mineapply',
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '申请失败',
          })
        }
        // that.setData({
        //   lists: lists
        // })
      }
    })
  }
})