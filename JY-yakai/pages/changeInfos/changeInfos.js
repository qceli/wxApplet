// pages/changeInfos/changeInfos.js
let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
Page({
  data: {
    dateValue: ''
  },
  onLoad: function (options) {
    var that = this
    var apiToken = wx.getStorageSync('apiToken');
    var sessionkey = wx.getStorageSync('sessionkey');
    var memberInfo = {
      'access_token': apiToken.access_token,
      'sessionkey': sessionkey
    }
    esTools.fn.setEmpty().setHeader({
      'content-type': 'application/x-www-form-urlencoded'
    }).signData(memberInfo).setMethod('get').setExtraUrl('memberInfo').members(function (res) {
      if (res.statusCode === 1) {
        console.log('res.data:' + res.data);
        // if (res.data == 1) {
        var memberInfo = res.data;
        console.log("memberInfo:" + JSON.stringify(memberInfo))
        console.log("memberInfo.address:" + memberInfo.address)
        var endtime = memberInfo.birthyear + '-' + memberInfo.birthmonth + '-' + memberInfo.birthday
        that.setData({
          memberInfo: memberInfo,
          dateValue: endtime
        })
        // }
      } else {
        wx.showModal({
          title: '提示',
          content: res.result,
        })
      }

    });
    // that.setData({
    //   endtime: util.formatTime1(new Date(new Date())),
    // })

    
    // util.getSessionkey();

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  personTel: function (e) {
    this.setData({
      personTel: e.detail.value
    })
    wx.setStorageSync('mobile', e.detail.value);
  },
  personName: function (e) {
    this.setData({
      personName: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log("datePickerBindchange:" + e.detail.value)
    this.setData({
      dateValue: e.detail.value
    })
  },
  personAddress: function (e) {
    this.setData({
      personAddress: e.detail.value
    })
  },
  pwd: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  checkPwd: function (e) {
    this.setData({
      checkPwd: e.detail.value
    })
  },
  submit: function (e) {
    var that = this
    var pwd = this.data.pwd;
    var checkPwd = this.data.checkPwd;
    if (checkPwd == pwd) {

      var apiToken = wx.getStorageSync('apiToken');
      console.log(JSON.stringify(apiToken))
      var sessionkey = wx.getStorageSync('sessionkey');
      var realname = that.data.personName;
      var mobile = that.data.personTel;
      var address = that.data.personAddress;
      var memberInfo = that.data.memberInfo;
      if (mobile == undefined) {
        mobile = memberInfo.mobile;
      }
      if (realname == undefined) {
        realname = memberInfo.realname;
      }
      if (address == undefined) {
        address = memberInfo.address;
      }
      let userInfo = {
        'access_token': apiToken.access_token,
        'sessionkey': sessionkey,
        'mobile': mobile,
        'realname': realname,
        'birth': that.data.dateValue,
        'address': address,
        'pwd': that.data.pwd
      }
      esTools.fn.setEmpty().setHeader({
        'content-type': 'application/x-www-form-urlencoded'
      }).signData(userInfo).setMethod('put').setExtraUrl('members').members(function (res) {
        console.log("codeLogin---" + JSON.stringify(res))
        if (res.statusCode === 1) {
          wx.showModal({
            title: '提示',
            content: '修改成功',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: 2
                })
              }
            }
          })

        } else {
          wx.showModal({
            title: '提示',
            content: res.data,
          })
        }
      });

    } else {
      wx.showModal({
        title: '提示',
        content: '两次密码不一样，请重新输入！',
      })
    }
  }
})