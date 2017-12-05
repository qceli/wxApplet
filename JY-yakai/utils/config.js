/**
 * 配置文件
 * 存放路径为：\utils\config.js
 * config.baseUri : 接口域名
 * config.header : 默认头部
 * config.passport : 交互通讯账号、密码
 * listsUri : 交互地址池
 */

let config = {
    /**
     * 所使用域名
     */
    // 'baseUri' : 'https://ganglongcs.wshoto.com/',
  'baseUri': 'https://yakai.wshoto.com/',

    /**
     * 登陆账号信息
     */
    'passport' : {
      'uname': 'yakai',
      'upass': '69534b32ab51f8cb802720d30fedb523'
    },

    /**
     * 登陆类型1，小程序自动登录。
     * 登陆类型2，手机号码登陆。
     * 需要修改的话，手动改一下下面的值。
     */
    'loginType' : 2,

    'header' : {
        'content-type': 'application/json'
    },
};

let listsUri = {
    'ApiLogin' : config.baseUri + 'login/ApiLogin',
};

let copyright={
    cotitle1:'微盛网络技术支持',
    cotitle2:'wshoto.com',
    isShow:false
}

// 对外提供使用。
module.exports.baseUri = config.baseUri;
module.exports.header = config.header;
module.exports.passport = config.passport;
module.exports.loginType = config.loginType;
module.exports.copyright = copyright;
module.exports.listsUri = listsUri;