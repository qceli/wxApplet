/**
 * eweishop 配置文件
 */
let config = {
    'header' : {
        'content-type': 'application/x-www-form-urlencoded',
        'addons' : 'ewei_shop'
    },
};

let listsUri = {
    'sendCode' : 'login/sendCode',
    'login' : 'login',
    'communitys': 'communitys',
    'slides': 'slides',
    'lessons': 'lessons',
    'teachers': 'teachers',
    // 'replaceKey' : 'login/replaceKey',
    // 'slides' : 'slides',
    // 'categories' : 'categories',
    // 'carts' : 'carts',
    // 'products': 'products',
};

// 对外提供使用。
module.exports.header = config.header;
module.exports.listsUri = listsUri;