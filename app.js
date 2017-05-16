
//app.js
"use strict";
//工具类调用
const api = require('./utils/api.js'),
  util = require('./utils/util.js'),
  config = require('config'),
  wechat = require('./utils/wechat.js');
App({
  globalData: {
    appid: 'wx66bc2e44b7717416',
    secret: '1f70b547bf11681dc35c3a33b2a72163',
    // 设备信息，主要用于获取屏幕尺寸而做适配
    deviceInfo: null,

    // 本地日记缓存列表 + 假数据
    // TODO 真实数据同步至服务端，本地只做部分缓存
    diaryList: null,

    // 本地日记缓存
    localDiaries: null,

    // 用户信息
    userInfo: null,
  },
  getUserInfo: function () {
    const that = this;
    const user = wx.getStorageSync('user') || {};
    const userInfo = wx.getStorageSync('userInfo') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      // 先登录
      wx.login({
        success: (res) => {
          console.log(res.code)
          if (res.code) {
            let objz = {};
            let code = res.code;
            wx.getUserInfo({
              success: (res) => {
                that.globalData.userInfo = res.userInfo;
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                wx.setStorageSync('userInfo', objz);
                let d = that.globalData;//这里存储了appid、secret、token串
                wx.request({
                  url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + code + '&grant_type=authorization_code',
                  data: {},
                  method: 'GET',
                  success: function (res) {
                    let obj = {};
                    obj.openid = res.data.openid;
                    obj.expires_in = Date.now() + res.data.expires_in;
                    //console.log(obj);  
                    wx.setStorageSync('user', obj);//存储openid   
                    console.log(res)
                    wx.request({
                      url: 'https://57113555.qcloud.la/auth',
                      data: {
                        openid: res.data.openid,
                        uname:objz.nickName,
                        avatarUrl:objz.avatarUrl
                      },
                      method: 'GET',
                      success: function (res) {
                        console.log(res)
                      }
                    })
                  }
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
  cosUrl: "http://imgs-1253624527.costj.myqcloud.com",
  api: api,
  util: util,
  config: config,
  wechat: wechat,
})