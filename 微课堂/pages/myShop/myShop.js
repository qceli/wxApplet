//获取应用实例
var app = getApp();
Page({
  data: {
    userInfo: {},
    title: '我的商品',
    tab: ['全部', '待付款','已付款'],
    tabselected:0,
    orderAll:[],
    orderIng:[],
    orderEnd:[],
    more: [true, true, true],
    page:[1,1,1],
    pagesize:[10,10,10],
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
      {
        id: 1, num: '2017486846825', time: '2017-11-21', state: 1, price: '22.00', classid: 222, classimg: '../../images/2.jpg', classname: '柠檬心理学', classintro: '美国斯坦福大学心理系多年来使用的教材，本书写作流畅，通俗易懂，深入生活，把心理学理论与知识联系人们的日常生活与工作'
      },
      {
        id: 2, num: '2017486846825', time: '2017-11-22', state: 0, price: '32.00', classid: 333, classimg: '../../images/3.jpg', classname: '柠檬心理学', classintro: '美国斯坦福大学心理系多年来使用的教材，本书写作流畅，通俗易懂，深入生活，把心理学理论与知识联系人们的日常生活与工作'
      },
      {
        id: 3, num: '2017486846825', time: '2017-11-23', state: 1, price: '42.00', classid: 444, classimg: '../../images/4.jpg', classname: '柠檬心理学', classintro: '美国斯坦福大学心理系多年来使用的教材，本书写作流畅，通俗易懂，深入生活，把心理学理论与知识联系人们的日常生活与工作'
      },
      {
        id: 4, num: '2017486846825', time: '2017-11-24', state: 0, price: '52.00', classid: 555, classimg: '../../images/5.jpg', classname: '柠檬心理学', classintro: '美国斯坦福大学心理系多年来使用的教材，本书写作流畅，通俗易懂，深入生活，把心理学理论与知识联系人们的日常生活与工作'
      },
    ];
    var arr=that.data.orderAll;
    arr = arr.concat(order);
    var page=that.data.page[0];
        page++;
    var more = true;
    if (order.length<10){
      more = false;
    }
    that.setData({
      orderAll: arr,
      'page[0]': page,
      'more[0]': more,
    });
    console.log('page:', page, that.data.orderAll.length)
    setTimeout(function () {
      wx.hideLoading()
    }, 1000);
  },
  tabChange:function(e){
    const index = e.currentTarget.dataset.index;
    this.setData({
      tabselected:index
    });
  },
  goClasses: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order/order?id=' + id
    }); 
  },
  orderPay: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order/order?id=' + id
    });  
  },
  orderPj: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/myPj/myPj?id=' + id
    });
  },
  orderOff: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '是否取消订单',
      success:  function (res) {
        if (res.confirm) {  

        }
      }
    });    
  },

})
