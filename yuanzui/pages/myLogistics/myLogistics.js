//获取应用实例
var app = getApp();
Page({
  data: {
    userInfo: {},
    title: '物流信息',

    wl:[
      {
        id: 0, content: '在江苏无锡滨湖区太湖公司进行派件扫描；派送业务员：皮维亮；联系电话：15852756832', time: '2017年11月20日 上午9:45:16' },
      { id: 0, content: '从江苏苏州分拨中心发出，本次转运目的地：江苏无锡滨湖区太湖公司', time: '2017年11月20日 上午5:41:37' },
      { id: 0, content: '在分拨中心江苏苏州分拨中心进行卸车扫描', time: '2017年11月20日 上午4:49:17' },
      { id: 0, content: '在浙江义乌分拨中心进行装车扫描，即将发往：江苏苏州分拨中心', time: '2017年11月19日 下午10:52:08' },
      { id: 0, content: '在浙江义乌山口公司进行下级地点扫描，将发往：江苏无锡网点包', time: '2017年11月19日 下午7:56:45' },      
      { id: 0, content: '在浙江义乌山口公司进行到件扫描', time: '2017年11月19日 下午7:42:24' },
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
  
})
