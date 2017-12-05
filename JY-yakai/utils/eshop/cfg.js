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
    // 'codeLogin':'auth/codeLogin',
    'login' : 'login',
    'auth': 'auth',
    'members': 'members',
    'serieses': 'serieses',
    'appoints' : 'appoints',
    'creditshops' : 'creditshops',
    'stores': 'stores',
    'wxappadvs': 'wxappadvs'
    // 'sendCode' : 'auth/sendCode',
    // 'replaceKey' : 'auth/codeLogin',
    // 'orders':'orders',
    // 'members':'members',
    // 'expresses':'expresses',
    // 'addresses':'addresses',
    // 'wxappadvs' : 'wxappadvs',
    // 'topics' : 'topics',
    // 'commissions':'commissions',
    // 'qrimgs':'qrimgs',
    // 'coupons':'coupons',
    // 'comments':'comments'
};

// 对外提供使用。
module.exports.header = config.header;
module.exports.listsUri = listsUri;