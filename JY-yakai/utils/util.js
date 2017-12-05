const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime1(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return [year, month, day].map(formatNumber).join('-')
}

function login() {
  wx.getStorage({
    key: 'sessionkey',
    success: function (res) {
      wx.redirectTo({
        url: '../mine/mine',
      })
    },
    fail: function (res) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  })
}
function goodsLogin(goodId) {
  wx.getStorage({
    key: 'sessionkey',
    success: function (res) {
      wx.navigateTo({
        url: '../giftInfos/giftInfos?id=' + goodId,
      })
    },
    fail: function (res) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  })
}
function produceLogin(produceId) {
  wx.getStorage({
    key: 'sessionkey',
    success: function (res) {
      wx.navigateTo({
        url: '../produceInfo/produceInfo?produceId=' + produceId,
      })
    },
    fail: function (res) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  })
}

function getSessionkey() {
  var apiToken = wx.getStorageSync('apiToken');
  var code = wx.getStorageSync('code');
  let loginData = {
    'code': code,
    'access_token': apiToken.access_token
  }
  esTools.fn.setEmpty().setHeader({
    'content-type': 'application/x-www-form-urlencoded'
  }).signData(loginData).setMethod('post').setExtraUrl('sessionCode').login(function (res) {
    // console.log(res)
    if (res.statusCode === 1) {
      wx.setStorageSync('sessionkey', res.data.sessionkey);

    }

  });
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTime1: formatTime1,
  login: login,
  goodsLogin: goodsLogin,
  produceLogin: produceLogin,
  getSessionkey: getSessionkey
}