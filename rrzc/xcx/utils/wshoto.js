// +----------------------------------------------------------------------
// | WSHOTO [ 技术主导，服务至上，提供微信端解决方案 ]
// +----------------------------------------------------------------------
// | Copyright (c) 20016-2020 http://www.wshoto.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: anymagic <anymagic@ix3.me>
// +----------------------------------------------------------------------

var temp = null;

var config = {

    debug: false,

    apiurl: 'https://api.renrenzuche.wshoto.com',

    urls: {
        'SessionCodeUrl': '/login/SessionCode',
        'CheckSession': '/login/checkSession',
        'UserInfo': '/login/UserInfo',
        'Products': '/products',
        'Category': '/category',
        'Adv': '/adv',
        'Cart': '/cart',
        'Favorite': '/favorite',
        'History': '/history',
        'Adress': '/address',
        'Area': '/area',
        'Dispatch': '/dispatch',
        'DispatchPrice': '/dispatchprice',
        'Order': '/order',
        'Member': '/member',
        'Payment' : '/payment'
    },

    header: {
        'content-type': 'application/json',
        'uname': 'anymagic',
        'upass': 'e8c46465ae55db08d633b803f1ec9b74'
    },

    expires_in: 86400,

    temp: null

};


var func = {

    setData: function (data, code) {
        return { data: data, statusCode: code };
    },

    wechatLogin : function(cb){
        wx.login({
            success: function (res) {
                if (res.code) {
                    func.request(config.apiurl + config.urls.SessionCodeUrl, 'GET', { code: res.code }, config.header, function (re) {
                      console.log("wshhoto.js-----------re.data" + re.data)
                        if (re.data.code == 0) {
                            func.setSession(re.data.msg.uniqid, cb);
                        } else {
                            func.callback(func.setData(re, -1), cb);
                        }

                    });
                }
            },
            fail: function (res) {
                console.error('getSessionSync fail. res : ');
                console.error(res);
            }
        });
    },

    getSessionCheck : function(key, cb){
        func.request(config.apiurl + config.urls.CheckSession, 'GET', { key: key.data }, config.header, function (re) {

            if(re.data.code == 0){
                func.callback(func.setData({'time' : re.data.msg.time, 'key' : re.data.msg.key}, 0), cb);
            }else{
                func.callback(func.setData(re, -1), cb);
            }
        });
    },

    /**
     * 获取远程session标识
     * @param cb
     */
    /*getSessionSync: function (cb) {

        wx.checkSession({
            success : function(res){
                var sessionKey = wx.getStorageSync('sessionkey') || [];

                if(sessionKey.length != 0){
                    var nowTime = Math.floor(Date.now() / 1000);

                    if (sessionKey && sessionKey.length != 0 && (sessionKey.time > nowTime)) {
                        func.callback(sessionKey, cb);
                    }
                }else{
                    //func.wechatLogin(cb);
                }

            },
            fail : function(res){
                console.log('checkSession fail');
                console.log(res);

                //func.wechatLogin(cb);
            }
        });
    },

    checkSession: function (cb) {
        wx.checkSession({
            success: function () {
                var data = wx.getStorageSync('sessionkey');
                var nowTime = Math.floor(Date.now() / 1000);

                if (data && (data.time > nowTime)) {
                    func.callback(func.setData(data.data, 0), cb);
                } else {
                    func.getSessionSync(function (res) {
                        func.callback(func.setData(res.data, 0), cb);
                    });
                }
            },
            fail: function () {
                var res = func.setData('', -1);
                func.callback(res, cb);
            }
        });
    },*/

    getUserInfo: function (cb) {

        func.getSession(function (res) {
            var sessionkey = res.data.data;

            if (res.statusCode == 0) {
                func.request(config.apiurl + config.urls.UserInfo, 'GET', { sessionKey: sessionkey }, config.header, function (res) {
                    if (res.data.code == 0) {

                        var userInfo = res.data.msg;
                        var nowTime = Math.floor(Date.now() / 1000);

                        if (userInfo.lastupdate + config.expires_in < nowTime) {
                            wx.getUserInfo({
                                success: function (res) {

                                    var data = {
                                        'sessionKey': sessionkey,
                                        'userinfo': res
                                    };

                                    func.request(urls.UserInfo, 'PUT', data, config.header, function (res) {
                                        func.callback(res, cb);
                                    });
                                },
                                fail: function (res) {
                                    console.error(res);
                                }
                            });
                        }

                        func.callback(res, cb);

                    } else if (res.data.code == -2) {
                        wx.getUserInfo({
                            success: function (res) {

                                var data = {
                                    'sessionKey': sessionkey,
                                    'userinfo': res
                                };

                                func.request(config.apiurl + config.urls.UserInfo, 'POST', data, config.header, function (res) {
                                    func.callback(res, cb);
                                });
                            },
                            fail: function (res) {
                                console.error(res);
                            }
                        });
                    } else {
                        console.error(res);
                    }
                });
            } else {
                console.log('getSession Fail. res:');
                console.log(res);
            }

        });
    },

    getSession: function (cb) {
        try{
            var sessionkey = wx.getStorageSync('sessionkey') || [];

            if(sessionkey){
                func.callback(func.setData(sessionkey, 0), cb);
            }else{
                console.log('getSession error.');
                func.callback(func.setData(sessionkey, -1), cb);
            }

        }catch (e){
            console.error(e);
        }
    },

    setSession : function(key, cb){
        try{
            var sessionKey = {
                time : Math.floor(Date.now() / 1000) + config.expires_in,
                data : key
            };

            wx.setStorageSync('sessionkey', sessionKey);
            var res = func.setData(sessionKey.data, 0);

            func.callback(res, cb);

        }catch (e){
            console.log(e);
        }
    },
    getMember: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Member + '/' + url, 'GET', data, config.header, cb);
    },
    getProducts: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Products + '/' + url, 'GET', data, config.header, cb);
    },
    getCategory: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Category + '/' + url, 'GET', data, config.header, cb);
    },
    getSwiperImg: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Adv + '/' + url, 'GET', data, config.header, cb);
    },
    getCart: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Cart + '/' + url, 'GET', data, config.header, cb);
    },
    getFavorite: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Favorite + '/' + url, 'GET', data, config.header, cb);
    },
    getHistory: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.History + '/' + url, 'GET', data, config.header, cb);
    },

    getCartCount: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Cart + '/' + url, 'GET', data, config.header, cb);
    },

    postCart: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Cart + '/' + url, 'POST', data, config.header, cb);
    },
    patchCart: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Cart + '/' + url, 'PATCH', data, config.header, cb);
    },
    deleteCart: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Cart + '/' + url, 'DELETE', data, config.header, cb);
    },
    getAddress: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Adress + '/' + url, 'GET', data, config.header, cb);
    },
    addAdress: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Adress + '/' + url, 'POST', data, config.header, cb);
    },
    patchAddress: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Adress + '/' + url, 'PATCH', data, config.header, cb);
    },
    getOrder:function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Order + '/' + url, 'GET', data, config.header, cb);
    },
    deleteOrder:function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Order + '/' + url, 'DELETE', data, config.header, cb);
    },
    putOrder:function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Order + '/' + url, 'PUT', data, config.header, cb);
    },
    postOrder:function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Order + '/' + url, 'POST', data, config.header, cb);
    },
    deleteAddress: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Adress + '/' + url, 'DELETE', data, config.header, cb);
    },
    putAddress: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Adress + '/' + url, 'PUT', data, config.header, cb);
    },
    getDispatch: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Dispatch + '/' + url, 'GET', data, config.header, cb);
    },
    getDispatchPrice: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.DispatchPrice + '/' + url, 'GET', data, config.header, cb);
    },
    postAddress: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Adress + '/' + url, 'POST', data, config.header, cb);
    },
    getArea: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Area + '/' + url, 'GET', data, config.header, cb);
    },
    postHistory: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.History + '/' + url, 'POST', data, config.header, cb);
    },
    postFavorite: function (data, cb) {
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Favorite + '/' + url, 'POST', data, config.header, cb);
    },

    getPayment : function(data, cb){
        var url = data.url;
        delete data.url;
        func.zuche_request(config.apiurl + config.urls.Payment + '/' + url, 'GET', data, config.header, cb);
    },

    zuche_request: function (url, method, data, header, cb) {

        func.getSession({
            success: function(res){
                header.addons = 'wshoto_yyt';
                data.sessionKey = res.data.data;
                func.request(url, method, data, header, cb);
            },
            fail : function(res){
                wx.clearStorage();
                wx.showToast({
                    title: '请求异常',
                    icon: 'error',
                    duration: 2000
                })
            }
        });

    },

    request: function (url, method, data, header, cb) {
        wx.request({
            url: url,
            data: data,
            method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: header, // 设置请求的 header
            success: function (res) {
                if (config.debug) {
                    console.info('request success. res:');
                    console.info(res);
                }

                if(res.data.code == -1){
                    res = func.setData(res.data, -1);
                }else{
                    res = func.setData(res.data, 0);
                }

                if (func.callback(res, cb)) {
                    return true;
                }

                console.error('request callcallback error log e.');
                return false;
            },
            fail: function (res) {
                console.error('request fail. res:');
                console.error(res);
            },
            complete: function (res) {
                if (config.debug) {
                    console.info('request complete log');
                    console.info('request ' + url);
                    console.info(res);
                    console.info('request complete log e.');
                }
            }
        });
    },

    callback: function (res, cb) {
        if (typeof cb == "object" || typeof cb == "function") {
            if (typeof cb == "function") {
                cb(res);
                return true;
            }

            if (res.statusCode == 0) {
                if (typeof cb.success == "function") {
                    cb.success(res);
                }
            } else {
                if (typeof cb.fail == "function") {
                    cb.fail(res);
                }
            }

            if (typeof cb.complete == 'function') {
                cb.complete(res);
            }
        }

        return res;
    }
};

module.exports = {
    config: config,
    func: func
};
