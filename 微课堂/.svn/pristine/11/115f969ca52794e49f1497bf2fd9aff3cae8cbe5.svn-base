//获取应用实例
var app = getApp();
Page({
  data: {
    userInfo: {},
    title: '发表评价',
    star:[2,1,1,1,1],
    tags:['质量很好','物流很快','服务很好','质量一般','物流很慢','不满意'],
    fags: [false, false, false, false, false, false],
    orderAll:[],
    txt:0,
    tagArr:[]
  },
  onLoad: function (e) {
    var that = this;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
      });
    });
    wx.setNavigationBarTitle({
      title: that.data.title
    });

    that.loadAll();

  },
  loadAll: function () {
    var that=this;
    wx.showLoading({
      title: '加载中',
    });
    const order=[
      {
        id: 0, num: '2017486846825', time: '2017-11-20', state: 0, price: '12.00', classid: 111, classimg: '../../images/1.jpg', classname: '柠檬心理学', classintro: '美国斯坦福大学心理系多年来使用的教材，本书写作流畅，通俗易懂，深入生活，把心理学理论与知识联系人们的日常生活与工作'
      },
    ];
    var arr=that.data.orderAll;
    arr = arr.concat(order);
    that.setData({
      orderAll: arr,
    });
    setTimeout(function () {
      wx.hideLoading()
    }, 1000);
  },
  setStar:function(e){
    const index = e.currentTarget.dataset.index;
    const arr=[1,1,1,1,1];
    for(var i=0;i<arr.length;i++){
      if(i<=index){
        arr[i]=2;
      }
    }
    this.setData({
      star:arr
    });
  },
  setTag:function(e){
    var that=this;
    const index = e.currentTarget.dataset.index;
    const tag = this.data.tags;
    const fag = this.data.fags;
    const arr = [];
    fag[index] = !fag[index];
    this.setData({
      fags: fag
    });
    for (var i = 0; i < fag.length;i++){
      if (fag[i]){
        arr.push(tag[i]);
      }
    }
    this.setData({
      tagArr: arr
    });
  },
  getTxt:function(e){
    const txt = e.detail.value;
    const len = e.detail.value.length;
    this.setData({
      txt: len
    })
  },
  upInfo:function(){
    var params={
      star:'',
      tag:'',
    }

  }
})
