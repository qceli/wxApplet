var WxParse = require('../../wxParse/wxParse.js');

const ajax = require('../../utils/util.js').ajax
const tusi = require('../../utils/util.js').tusi
const ceslid = require('../../utils/util.js').ceslid
const engine2_api = require('../../config').engine2_api
const goods2_api = require('../../config').goods2_api
const news2_api = require('../../config').news2_api
const show = require('../../utils/util.js').show
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;

//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;


Page({
  data: {
    info:null
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function (options) {
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this;
    var data = {
      id: options.id
    };
    var postdata = JSON.stringify(data);
    console.log(options.id, options.type,postdata);
    if (options.type == 'goods2_api') {
      ajax(goods2_api, postdata, function (m) {  
        wx.setNavigationBarTitle({
          title: m.title
        }); 
        show.start(m, that);
      }, true);
    } else if (options.type == 'engine2_api') {
      ajax(engine2_api, postdata, function (m) {
        wx.setNavigationBarTitle({
          title: m.title
        });
        show.start(m, that);
      }, true);
    } else if (options.type == 'news2_api') {
      ajax(news2_api, postdata, function (m) {
        wx.setNavigationBarTitle({
          title: m.title
        });
        show.start(m, that);
      }, true);
    }

    /**
     * 多数据解析示例
     */
    //   var replyHtml0 = `<div style="margin-top:10px;height:50px;">
    // 	<p class="reply">
    // 		wxParse回复0:不错，喜欢[03][04]
    // 	</p>	
    // </div>`;
    //   var replyHtml1 = `<div style="margin-top:10px;height:50px;">
    // 	<p class="reply">
    // 		wxParse回复1:不错，喜欢[03][04]
    // 	</p>	
    // </div>`;
    //   var replyHtml2 = `<div style="margin-top:10px;height:50px;">
    // 	<p class="reply">
    // 		wxParse回复2:不错，喜欢[05][07]
    // 	</p>	
    // </div>`;
    //   var replyHtml3 = `<div style="margin-top:10px;height:50px;">
    // 	<p class="reply">
    // 		wxParse回复3:不错，喜欢[06][08]
    // 	</p>	
    // </div>`;
    //   var replyHtml4 = `<div style="margin-top:10px; height:50px;">
    // 	<p class="reply">
    // 		wxParse回复4:不错，喜欢[09][08]
    // 	</p>	
    // </div>`;
    //   var replyHtml5 = `<div style="margin-top:10px;height:50px;">
    // 	<p class="reply">
    // 		wxParse回复5:不错，喜欢[07][08]
    // 	</p>	
    // </div>`;
    //   var replyArr = [];
    //   replyArr.push(replyHtml0);
    //   replyArr.push(replyHtml1);
    //   replyArr.push(replyHtml2);
    //   replyArr.push(replyHtml3);
    //   replyArr.push(replyHtml4);
    //   replyArr.push(replyHtml5);


    //   for (let i = 0; i < replyArr.length; i++) {
    //     WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
    //     if (i === replyArr.length - 1) {
    //       WxParse.wxParseTemArray("replyTemArray",'reply', replyArr.length, that)
    //     }
    //   }
  }


})
