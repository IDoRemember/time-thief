const config = require('config');
App({
	globalData: {
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
	getUserInfo: function(cb) {
    var that = this;

    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    } else {
      // 先登录
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: (res) => {
              that.globalData.userInfo = res.userInfo;
              typeof cb == 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
})