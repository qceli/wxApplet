// pages/weather/weather.js
var bmap = require('../../utils/bmap-wx.min.js'); 
Page({
  data: {
    city: '',
    todayWeather: {
      date: '',
      weatherDesc: '',
      weather: '',
      wind: '',
    },
    weatherData: {}
  },
  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'pwKDLY3jKBSGd8dDjbkiFzw9vNcIqt1T'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log(JSON.stringify(data))
      // console.log("data.results.weather_data:" + JSON.stringify(data.originalData.results[0].weather_data))
      var today = data.currentWeather[0].date.split(" ")[0];
      var nowToday = today + '  今日';
      data.originalData.results[0].weather_data[0].date = nowToday;
      var weatherDatas = data.originalData.results[0].weather_data;
      // weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      // console.log("weatherData" + weatherData);
      var nowWeather = data.currentWeather[0].date.split("：")[1].split(")")[0];
      var todayWeather = {};
      todayWeather.today = today;
      todayWeather.date = data.currentWeather[0].date;
      todayWeather.dayPictureUrl = data.originalData.results[0].weather_data[0].dayPictureUrl;
      todayWeather.temperature = data.currentWeather[0].temperature;
      todayWeather.weatherDesc = data.currentWeather[0].weatherDesc;
      todayWeather.nowWeather = nowWeather;
      todayWeather.wind = data.currentWeather[0].wind;
      var name = weatherDatas[0].date;
      console.log("weatherDatas[0].date:" + today)
      that.setData({
        city: data.currentWeather[0].currentCity,
        todayWeather: todayWeather,
        weatherDatas: weatherDatas,
        nowToday: nowToday
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    }); 
  },
  onReady: function () {
    
  }
})