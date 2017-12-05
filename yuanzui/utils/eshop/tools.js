let app = getApp();

let cfg = require('../config');
let wsTools = require('../wshoto');

let esCfg = require('./cfg');

let fn = {

    'tempHeader': esCfg.header,

    'tempData': {
        'data': {},
        'method': 'GET',
        'extraUrl': ''
    },

    /**
     * 由于闭包问题，上一次设置的数据被保留。
     * 所以，增加此方法，用于清空之前数据。
     **/
    'setEmpty': function () {
        fn.tempData = {
            'data': {},
            'method': 'GET',
            'extraUrl': ''
        }

        return this;
    },

    // 按照逻辑顺序，应是先使用setSession,再使用signData。
    // 否则会出现sessionkey未加入签名算法的BUG。
    'setSession': function () {
        if (typeof fn.tempData.data.sessionkey === 'undefined' || fn.tempData.data.sessionkey === '') {
            let sessionKey = fn.getSessionSync();
            fn.tempData.data = Object.assign(fn.tempData.data, {'sessionkey': sessionKey.sessionkey});
        }
        return this;
    },

    'signData': function (data) {
        data = Object.assign(fn.tempData.data, data);
        fn.tempData.data = wsTools.fn.getSign(data);
        return this;
    },

    'setMethod': function (method) {
        fn.tempData.method = method.toUpperCase();
        return this;
    },

    'setExtraUrl': function (url) {
        if (url) {
            fn.tempData.extraUrl = '/' + url;
        } else {
            fn.tempData.extraUrl = '';
        }
        return this;
    },


    // 用户登陆检查
    // 具备自动更换sessionkey功能。
    // 自动跳转登陆功能。
    // 'getSession': function (cb) {
    //     let localSession = wx.getStorageSync('sessionKey') || {};
    //
    //     if (app.globalData.debug === true) {
    //         console.log('eshop tools.js getSession localSession');
    //         console.log(localSession);
    //         // console.log(Object.getOwnPropertyNames(localSession).length);
    //     }
    //
    //     if (typeof localSession === 'object' && typeof localSession.sessionkey !== 'undefined' && localSession.timestamp > wsTools.fn.getTime()) {
    //
    //         app.callback(wsTools.fn.setData(localSession, 1), cb);
    //
    //     } else if (typeof localSession === 'object' && typeof localSession.sessionkey != 'undefined') {
    //
    //         if (localSession.timestamp <= wsTools.fn.getTime()) {
    //             fn.replaceKey(localSession.sessionkey, function (res) {
    //                 if (res.statusCode === 1) {
    //                     wx.setStorageSync('sessionKey', res.data);
    //                     app.callback(res, cb);
    //                 } else {
    //
    //                     wx.showModal({
    //                         title: '登陆失败',
    //                         content: '很抱歉，登陆可能已经过期或失效，需要您重新登录。',
    //                         showCancel: false,
    //                         success: function () {
    //                             wx.redirectTo({
    //                                 url: '../login/login'
    //                             });
    //                         }
    //                     });
    //
    //                     // wx.redirectTo({
    //                     //     url: '../login/login'
    //                     // });
    //                 }
    //             });
    //         }
    //
    //     } else {
    //         wx.redirectTo({
    //             url: '../login/login'
    //         });
    //     }
    // },
    'setHeader': function (header) {
        if (header) {
            fn.tempHeader = header;
        } else {
            fn.tempHeader = esCfg.header;
        }

        return this;
    },

    'getSession': function (cb) {
        let localSession = wx.getStorageSync('sessionKey') || {};

        if (app.globalData.debug === true) {
            console.log('eshop tools.js getSession localSession');
            console.log(localSession);
            // console.log(Object.getOwnPropertyNames(localSession).length);
        }

        if (typeof localSession === 'object' && typeof localSession.sessionkey !== 'undefined' && localSession.timestamp > wsTools.fn.getTime()) {

            app.callback(wsTools.fn.setData(localSession, 1), cb);

        } else if (typeof localSession === 'object' && typeof localSession.sessionkey != 'undefined') {

            if (localSession.timestamp <= wsTools.fn.getTime()) {
                fn.replaceKey(localSession.sessionkey, function (res) {
                    if (res.statusCode === 1) {
                        wx.setStorageSync('sessionKey', res.data);
                        app.callback(res, cb);
                    } else {

                        if (cfg.loginType === 1) {
                            wx.redirectTo({
                                url: '../wxlogin/wxlogin'
                            });
                        } else {
                            wx.showModal({
                                title: '登陆失败',
                                content: '很抱歉，登陆可能已经过期或失效，需要您重新登录。',
                                showCancel: false,
                                success: function () {
                                    wx.redirectTo({
                                        url: '../login/login'
                                    });
                                }
                            });
                        }
                    }
                });
            }

        } else {
            if (cfg.loginType === 1) {
                wx.redirectTo({
                    url: '../wxlogin/wxlogin'
                });
            } else {
                wx.redirectTo({
                    url: '../login/login'
                });
            }
        }
    },

    'getSessionSync': function () {
        return wx.getStorageSync('sessionKey') || {};
    },

    'replaceKey': function (sessionkey, cb) {

        let data = {'sessionkey': sessionkey};
        data = wsTools.fn.getSign(data);

        wsTools.fn.request(cfg.baseUri + esCfg.listsUri.replaceKey, 'PUT', data, esCfg.header, function (res) {
            if (app.globalData.debug === true) {
                console.log('eshop tools.js getSession replaceKey');
                console.log(res);
            }

            app.callback(res, cb);
        });

    },

    'sendCode': function (cb) {

        wsTools.fn.request(cfg.baseUri + esCfg.listsUri.sendCode, fn.tempData.method, fn.tempData.data, esCfg.header, function (res) {
            if (app.globalData.debug === true) {
                console.log('eshop tools.js fn.sendCode');
                console.log(res);
            }

            app.callback(res, cb);
        });

    },

    'login': function (cb) {
        let url = cfg.baseUri + esCfg.listsUri.login + fn.tempData.extraUrl;
        let header = fn.tempHeader;

        wsTools.fn.request(url, fn.tempData.method, fn.tempData.data, header, function (res) {
            if (app.globalData.debug === true) {
                console.log('eshop tools.js fn.login :',res);
            }
            fn.setHeader(esCfg.header);
            app.callback(res, cb);
        });
    },
    'communitys': function (cb) {
      let url = cfg.baseUri + esCfg.listsUri.communitys + fn.tempData.extraUrl;
      wsTools.fn.request(url, fn.tempData.method, fn.tempData.data, esCfg.header, function (res) {
        if (app.globalData.debug === true) {
          console.log('eshop tools.js fn.communitys :',res);
        }
        app.callback(res, cb);
      });
    },
    'slides': function (cb) {
      let url = cfg.baseUri + esCfg.listsUri.slides + fn.tempData.extraUrl;
      wsTools.fn.request(url, fn.tempData.method, fn.tempData.data, esCfg.header, function (res) {
        if (app.globalData.debug === true) {
          console.log('eshop tools.js fn.slides :', res);
        }
        app.callback(res, cb);
      });
    },
    'lessons': function (cb) {
      let url = cfg.baseUri + esCfg.listsUri.lessons + fn.tempData.extraUrl;
      wsTools.fn.request(url, fn.tempData.method, fn.tempData.data, esCfg.header, function (res) {
        if (app.globalData.debug === true) {
          console.log('eshop tools.js fn.lessons :', res);
        }
        app.callback(res, cb);
      });
    },
    'teachers': function (cb) {
      let url = cfg.baseUri + esCfg.listsUri.teachers + fn.tempData.extraUrl;
      wsTools.fn.request(url, fn.tempData.method, fn.tempData.data, esCfg.header, function (res) {
        if (app.globalData.debug === true) {
          console.log('eshop tools.js fn.teachers :', res);
        }
        app.callback(res, cb);
      });
    },
    
    // 'commissions' :function (cb) {
    //     let url = cfg.baseUri + esCfg.listsUri.commissions + fn.tempData.extraUrl;
    //     wsTools.fn.request(url, fn.tempData.method, fn.tempData.data, esCfg.header, function (res) {
    //         if (app.globalData.debug === true) {
    //             console.log('eshop tools.js fn.commissions');
    //             console.log(res);
    //         }
    //         app.callback(res, cb);
    //     });
    // },
    // 'qrimgs':function (cb) {
    //     wsTools.fn.request(cfg.baseUri + esCfg.listsUri.qrimgs + fn.tempData.extraUrl, fn.tempData.method, fn.tempData.data, esCfg.header, function (res) {
    //         if (app.globalData.debug === true) {
    //             console.log('eshop tools.js fn.qrimgs');
    //             console.log(res);
    //         }
    //         app.callback(res, cb);
    //     });
    // }
};

module.exports.fn = fn;