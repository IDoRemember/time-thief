// 全局配置
const host ="57113555.qcloud.la";
module.exports = {
    /** 腾讯地图 **/
    map: {
        baseUrl: 'https://apis.map.qq.com/ws',
        key: '2TCBZ-IM7K5-XHCIZ-QXLRT-CIT4J-DEFSM',
    },
    service:{
        host,
        requestUrl:`https://${host}/user`,   
    },
    /** 输入框控件设置 **/
    input: {
        charWidth: 14,  // 单个字符的宽度，in rpx
    },

    /** 本地存储 **/
    // TODO 数据通过API全部存储于服务端
    storage: {
        diaryListKey: 'bearDiaryList',
    }
};
