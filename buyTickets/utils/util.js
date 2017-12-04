function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTime1(date) {
  // var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate() + 1

  if(month <10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return [month, day].map(formatNumber).join('-')
}
function formatTime2(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate() + 1

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return [year, month, day].map(formatNumber).join('-')
}
function formatTime3(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 2
  var day = date.getDate()

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return [year, month, day].map(formatNumber).join('-')
}
function formatTime4(date) {
  var year = date.getFullYear()
  return year
}

function systemInfo() {
  var scanSize = {};
  //获取屏幕宽高  
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比  
      console.log('scanSize.windowWidth: ' + windowWidth)
      console.log('scanSize.windowHeight: ' + windowHeight)
      scanSize.width = windowWidth;
      scanSize.height = windowHeight;
    }
  })
  return scanSize;
}  

module.exports = {
  formatTime: formatTime,
  formatTime1: formatTime1,
  formatTime2: formatTime2,
  formatTime3: formatTime3,
  formatTime4: formatTime4,
  systemInfo: systemInfo
}
