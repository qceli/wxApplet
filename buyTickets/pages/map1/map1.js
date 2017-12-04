// pages/map1/map1.js
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
    scrollLeft: 0
  },
  onLoad: function (options) {
    console.log("options.img:" + app.globalData.imgUrl + 'maps-1.jpg')
    var res = util.systemInfo();
    console.log("res:" + JSON.stringify(res))
    windowWidth = res.width;
    windowHeight = res.height;

    //那就给前面的图片进行赋值，高，宽以及路劲   
    this.setData({
      windowWidth: windowWidth,
      windowHeight: windowHeight,
      scaleHeight: windowHeight,
      dataimg1: app.globalData.imgUrl + 'maps-1.jpg',
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
  map2: function () {
    wx.redirectTo({
      url: '../map2/map2',
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
      console.log("baseHeight:" + baseHeight + ",baseWidth:" + baseWidth);
    }
    this.setData({
      // scaleWidth: originalWidth,
      // scaleHeight: originalHeight
      scaleWidth: '194%',
      scaleHeight: '99%'
    })
  },
  //手指进行拖动了  
  movetap: function (event) {
    var that = this
    var e = event;
    if (e.touches.length == 1) {//一指移动当前图片
      console.log("huadong ")
      var scrollLeft = e.touches[0].clientX - that.data.disPoint.x
      var scrollTop = e.touches[0].clientY - that.data.disPoint.y
      this.setData({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        disPoint: {
          x: 1,
          y: 1
        }
      })
    }
    if (e.touches.length == 2) {
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
        console.log("newScale:" + newScale);
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
          // console.log("newwidth:" + width + ",newheight:" + height);
          //刷新.wxml  
          this.setData({
            scaleHeight: width,
            scaleWidth: height

          })
          oldscale = newScale;
          console.log("oldscale------------" + oldscale);
          //更新比例 

        }

      }
    }
  },
  endtap: function (event) {
    console.log("endtap:" + event);//抬起手指，保存下数据  
    console.log("event.touches.length:" + event.touches.length);
    if (event.touches.length == 2) {
      olddistance = 0;
      console.log("olddistance:" + olddistance)
    }

  },


  
  position1: function () {
    wx.showModal({
      title: '梁鸿国家湿地公园',
      content: '梁鸿国家湿地公园占地3465亩。2009年8月正式对外营业；2011年10月晋级国家级湿地公园（首批全国共12家）；2015年被评为国家水利风景区。目前已建成湿地体验区、展示区、保育区、管理服务区、休闲区以及部分湿地农业区，对外经营展示面积为1333亩。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position2: function () {
    wx.showModal({
      title: '中华赏石园',
      content: '中华赏石园占地300亩，投资4亿元，由中国观赏石协会与无锡高新区（新吴区）联手打造，于2011年10月开园，2013年10月被评为4A级景区。赏石园由赏石文化交流中心（石博馆）、赏石交易区、赏石园林三部分组成，展示来自国内外精品800余件，是国际观赏石集散中心和中国观赏石第一园林。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position3: function () {
    wx.showModal({
      title: '鸿山遗址博物馆',
      content: '项目占地4.5平方公里，2004年全国十大考古新发现、全国重点文物保护单位、国家“十一五”重点大遗址保护工程、国家级考古遗址公园、4A级景区。一期工程“两馆”（鸿山遗址博物馆、中国吴文化博物馆）于2008年10月建成开放。由遗址博物馆展示区、生态农业展示区、实地生态展示区、鸿山遗址本体保护展示区四部分组成。收藏2300件珍贵文物，馆藏精品如无锡市的市徽 玉飞凤、青瓷三足缶、盘蛇玲珑球等。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position4: function () {
    wx.showModal({
      title: '梁鸿湿地丽笙度假酒店',
      content: '项目占地10万平方米，建筑面积3.8万平方米，于2012年9月开业。由卡尔森全球酒店集团输出国际五星品牌“Radisson Blu”并管理。酒店采用仿古园林式建筑，融合江南吴地文化元素，致力打造江南首席国际五星级园林式商务度假酒店。客房数量196间，宴会厅面积680平方米。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position5: function () {
    wx.showModal({
      title: '吴月雅境',
      content: '项目占地123亩，位于吴博园主入口地段，是由世界500强、日本排名第一的大和房屋开发建设的低密度高品质住宅产品。项目建筑面积8万平米，2012年底开工建设，2014年4月对外销售。大和将日本先进的智能社区理念同步引入，依托先进的物联网技术，将小区的安防、门禁、停车高度智能化，并与日本松下合作开发智能家居HEMS系统，实现智能家电的远程操控、统一管理以及家庭自动化。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position6: function () {
    wx.showModal({
      title: '无锡新瑞医院（上海瑞金医院无锡分院）',
      content: '无锡新瑞医院是一所集医、教、研于一体的三级综合性医院，由无锡新吴区政府委托上海交通大学医学院附属瑞金医院进行管理。医院一期占地100亩，总投资约15亿元，核定床位600张，学科专业齐全，项目于2015年初开工建设，2018年建成并正式运行。医院将植入物联网技术，打造成医疗物联网应用示范项目。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  position7: function () {
    wx.showModal({
      title: '奥体紫兰苑',
      content: '项目占地139亩，由无锡奥体建设开发有限责任公司开发建设，拟建设27幢住宅、商业、会所及4000㎡幼儿园，建成后可容纳1050户居民入住。项目以人为本，通过多层次景观渗透，打造生态人居环境；建成高舒适度低能耗绿色科技住宅2.0版。项目于2017年初开工建设，预计2019年底竣工。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
})