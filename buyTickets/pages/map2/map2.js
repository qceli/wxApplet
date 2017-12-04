// pages/map2/map2.js
var app = getApp()
var util = require('../../utils/util.js')
var olddistance = 0;  //这个是上一次两个手指的距离  
var newdistance;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
var oldscale = 1;     //这个是上一次动作留下的比例  
var diffdistance;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
var baseHeight;       //上一次触摸完之后的高  
var baseWidth;        //上一次触摸完之后的宽  
var windowWidth = 0;  //咱们屏幕的宽  
var windowHeight = 0; //咱们屏幕的高  
Page({
  data: {
    imgUrl: app.globalData.imgUrl,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    windowWidth: '',
    windowHeight: '',
    scaleWidth: "",
    scaleHeight: "",
    dataimg1: "",
    disPoint: {
      x: 0,
      y: 0
    },//手指touch图片时,在图片上的位置
    scrollTop: 0,
    scrollLeft: 0,
    top8: '60%',
    right8: '25%'
  },
  onLoad: function (options) {
    console.log("options.img:" + app.globalData.imgUrl + 'maps-2.jpg')
    var res = util.systemInfo();
    console.log("res:" + JSON.stringify(res))
    windowWidth = res.width;
    windowHeight = res.height;

    //那就给前面的图片进行赋值，高，宽以及路劲   
    this.setData({
      windowWidth: windowWidth,
      windowHeight: windowHeight,
      scaleHeight: windowHeight,
      dataimg1: app.globalData.imgUrl + 'maps-2.jpg',   
      scaleWidth: windowWidth
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  home: function () {
    wx.redirectTo({
      url: '../home/home',

    })
  },
  townServe: function () {
    wx.redirectTo({
      url: '../service/service',
    })
  },
  map1: function () {
    wx.redirectTo({
      url: '../map1/map1',
    })
  },


  //这里是图片加载完毕之后的信息，因为滑动手指距离会变，我们要跟着图片的长宽进行缩放，不能跟着屏幕的长宽进行缩放  
  imgload: function (e) {
    console.log("imload-----------")
    var that = this
    var originalWidth = e.detail.width;//图片原始宽  
    var originalHeight = e.detail.height;//图片原始高  
    // console.log("originalWidth:" + originalWidth + ",originalHeight:" + originalHeight)
    var windowWidth = that.data.windowWidth;
    var windowHeight = that.data.windowHeight;
    // console.log("windowWidth:" + that.data.windowWidth + ",windowHeight:" + windowHeight)
    var originalScale = originalHeight / originalWidth;//图片高宽比  
    var windowscale = windowHeight / windowWidth;//屏幕高宽比  
    if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
      //图片缩放后的宽为屏幕宽  
      baseWidth = windowWidth;

      baseHeight = (windowWidth * originalHeight) / originalWidth;
      console.log(111111111111)
      console.log("baseHeight:" + baseHeight + ",baseWidth:" + baseWidth);
    } else {//图片高宽比大于屏幕高宽比  
      //图片缩放后的高为屏幕高  
      baseHeight = windowHeight;
      baseWidth = (windowHeight * originalWidth) / originalHeight;
      console.log(2222222222222)
      console.log("baseHeight:" + baseHeight + ",baseWidth:" + baseWidth);
    }
    this.setData({
      // scaleWidth: originalWidth,
      // scaleHeight: originalHeight
      scaleWidth: '100%',
      scaleHeight: '99%'
    })
  },
  //手指进行拖动了  
  movetap: function (event) {
    var that = this
    var e = event;
    var top8 = that.data.top8.split('%')[0]/100;
    var right8 = that.data.right8.split('%')[0] / 100;
    console.log("this.data.top8:" + top8 + ",this.data.right8:" + right8);
    if (e.touches.length == 1) {//一指移动当前图片
      console.log("huadong ")
      console.log("that.disPoint.x:" + that.data.disPoint.x)
      console.log("e.touches[0].clientX:" + e.touches[0].clientX)
      console.log("that.disPoint.y:" + that.data.disPoint.y)
      console.log("e.touches[0].clientY" + e.touches[0].clientY)
      // var left = e.touches[0].clientX - that.data.disPoint.x
      // var top = e.touches[0].clientY - that.data.disPoint.y
      // console.log("left:" + left)
      // console.log("top:" + top)
      // var scrollLeft = that.data.scrollLeft + left
      // var scrollTop = that.data.scrollTop + top
      if (e.touches[0].clientX > that.data.disPoint.x) {

      }
      var scrollLeft = e.touches[0].clientX - that.data.disPoint.x
      var scrollTop = e.touches[0].clientY - that.data.disPoint.y
      console.log("scrollLeft:" + scrollLeft + ",scrollTop:" + scrollTop)
      this.setData({
        scrollLeft: that.data.scrollLeft - scrollLeft,
        scrollTop: that.data.scrollTop - scrollTop,
        disPoint: {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }
      })
    }
    if (e.touches.length == 2) {

      console.log("------------this.data.top8:" + top8 + ",this.data.right8:" + right8);
      var xMove = e.touches[1].clientX - e.touches[0].clientX;
      var yMove = e.touches[1].clientY - e.touches[0].clientY;
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//两手指之间的距离 
      if (olddistance == 0) {
        olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
        console.log("olddistance == 0----------" + olddistance);
      }
      else {
        newdistance = distance; //第二次就可以计算它们的差值了  
        diffdistance = newdistance - olddistance;
        olddistance = newdistance; //计算之后更新  
        // console.log("olddistance != 0----------" + diffdistance);
        console.log("oldscale:" + oldscale);
        var newScale = oldscale + 0.005 * diffdistance;  //比例  
        console.log("newScale:" + newScale);
        if (newScale > 1) {
          console.log("newScale-----------" + newScale);
          // console.log("baseHeight:" + baseHeight + ",baseWidth:" + baseWidth);
          var width = newScale * baseHeight;
          var height = newScale * baseWidth;
          console.log("------------top8:" + newScale * top8 + ",-------------right8:" + newScale * right8);
          top8 = newScale * top8 * 100;
          right8 = newScale * right8 * 100;
          // console.log("newwidth:" + width + ",newheight:" + height);
          console.log("top8:" + top8 + ",right8:" + right8);
          //刷新.wxml  
          this.setData({
            scaleHeight: width,
            scaleWidth: height,
            top8: top8 + '%',
            right8: right8 + '%'

          })
          oldscale = newScale;
          console.log("oldscale------------" + oldscale);
          //更新比例 

        }

      }
    }
  },
  endtap: function (event) {
    console.log("endtap:" + JSON.stringify(event));//抬起手指，保存下数据  
    console.log("event.touches.length:" + event.touches.length);
    if (event.touches.length == 2) {
      olddistance = 0;
      console.log("olddistance:" + olddistance)
    }

  },




  position8: function () {
    wx.showModal({
      title: '无锡长乔海洋王国主题公园',
      content: '项目占地385亩，建筑面积18万平米，总投资15亿元。建成后将成为世界最大的海洋公园之一。项目内包含九大海洋动物及其生态展区、八大演艺剧场以及各国演员与动物的花车巡游，是集动物展示与表演、各国演员演艺及游乐设备为一体的大型海洋公园。项目建设时间为2017年5月-2018年12月。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position9: function () {
    wx.showModal({
      title: '丽笙酒店二期',
      content: '项目占地面积15亩，位于丽笙酒店西侧，以伯渎河为天然景观条件，临水视野得天独厚。以丽笙酒店整体性为基础，满足旅游度假住宿、商务会议、大型宴会、餐饮等需求，在建筑立面上与原有建筑相协调。充分体现出建筑的功能性、豪华性和专属性，满足客户的归属感，塑造具有吸引力的城市形象，并对周边产生强有力的带动作用。项目计划2017年10月开工。2018年10月底前建成。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position10: function () {
    wx.showModal({
      title: '吴越水街',
      content: '项目位于锡梅路以南、飞凤路以西，总占地108亩，总建筑面积约7万平米，总投资约7亿元。吴越水街的建筑以传统仿古建筑形式为主调，外观古朴典雅，内饰简约时尚。建成后将会成为一条集商业、美食、旅游配套、游憩、购物于一体的生态休闲景观带。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position11: function () {
    wx.showModal({
      title: '智慧农业示范一期工程',
      content: '项目位于飞凤路以东，规划用地面积约29000亩，一期工程约1000亩，投资规模2亿元。项目依托物联网在农业领域应用的发展思路，充分发挥鸿山都市生态农业园、现代农业园的资源优势，以智慧农业应用示范工程为抓手，以智慧种植、环境监控、无人植保为重点，大力引进农业企业和农业物联网企业，鼓励农业企业与物联网企业联合承担，共同探索物联网商业运营模式。项目建设时间为2017年6月至2018年12月。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position12: function () {
    wx.showModal({
      title: '泗洲寺',
      content: '项目总占地面积142亩，建筑面积10000平方米，总投资约8800万元。围绕“修身养性、参禅养生”为主题，以寺院为核心，佛文化为纽带，为游客、居士和佛文化爱好者提供一个参禅、修身的世外桃源。泗洲寺项目旨在展示佛教文化，弘扬历史，丰富当地宗教文化内涵，重现泗洲寺的盛景。项目建设时间为2017年10月至2018年12月。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
})