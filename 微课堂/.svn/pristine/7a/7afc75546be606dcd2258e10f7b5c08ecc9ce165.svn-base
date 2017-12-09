//获取应用实例
var app = getApp();
Page({
  data: {
    userInfo: {},
    title: '消息通知',
    tab: ['全部消息', '评论', '回答','点赞'],
    tabselected: 0,
    msg:[
      { id: 0, type: 1, content: 'xxx评论了你', time: '2017-11-24 12:00' },
      { id: 0, type: 2, content: 'xxx回答了你的问题', time: '2017-11-24 12:00' },
      { id: 0, type: 3, content: '你的回答收到了222个赞', time: '2017-11-24 12:00' },
      { id: 0, type: 4, content: '新的客服消息', time: '2017-11-24 12:00' },
    ]
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

    that.loadInfo();

  },
  loadInfo: function () {
    var that=this;
    wx.showLoading({
      title: '加载中',
    });


    setTimeout(function () {
      wx.hideLoading()
    }, 1000);
  },
  tabChange: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      tabselected: index
    });
  },  
})
