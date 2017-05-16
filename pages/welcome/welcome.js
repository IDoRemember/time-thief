var app = getApp();
Page({
    data:{
        userInfo:wx.getStorageSync('userInfo')
    },
    onTap: function (event) {
        // wx.navigateTo({
        //     url:"../posts/post"
        // });
        
        wx.switchTab({
            url: "../posts/post"
        });
    },
    onLoad:function() {
		console.log('hahah');
		var that = this;
		app.getUserInfo();
        that.setData({
           userInfo: wx.getStorageSync('userInfo')
        })
	},
})