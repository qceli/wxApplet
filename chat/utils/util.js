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

module.exports = {
  formatTime: formatTime
}

//时间格式化
function dateFormat(time, format) {
  var d = "";
  var date = new Date(time);
  if (format == "yyyyMMdd") {
    var month = parseInt(date.getMonth() + 1);
    var months = 0;
    var day = 0;
    if (month < 10) {
      months = "0" + month;
    } else {
      months = month;
    }
    if (date.getDate() < 10) {
      day = "0" + date.getDate();
    } else {
      day = date.getDate();
    }
    d = date.getFullYear() + "-" + months + "-" + day;
  } else if (format == "yyyyMMddhhmmss") {
    var month = parseInt(date.getMonth() + 1);
    var months = 0;
    var day = 0;
    var hours = 0;
    var minutes = 0;
    var second = 0;
    if (month < 10) {
      months = "0" + month;
    } else {
      months = month;
    }
    if (date.getDate() < 10) {
      day = "0" + date.getDate();
    } else {
      day = date.getDate();
    }
    if (date.getHours() < 10) {
      hours = "0" + date.getHours();
    } else {
      hours = date.getHours();
    }
    if (date.getMinutes() < 10) {
      minutes = "0" + date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }
    if (date.getSeconds() < 10) {
      second = "0" + date.getSeconds();
    } else {
      second = date.getSeconds();
    }
    d = date.getFullYear() + "-" + months + "-" + day + " " + hours + ":" + minutes + ":" + second;
  }
  return d;

}

function setToView(toViewId) {
  return toViewId;
}

module.exports = {
  dateFormat: dateFormat,
  setToView: setToView
}

