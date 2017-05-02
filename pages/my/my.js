var app = getApp();
var dairyData = require('../../data/dairy-data.js')
var iconPath = "/images/icon/"
var tabs = [
    {
        icon: iconPath + "mark.png",
        iconActive: iconPath + "markHL.png",
        title: "日记",
        extraStyle: "",
    },
    {
        icon: iconPath + "collect.png",
        iconActive: iconPath + "collectHL.png",
        title: "收藏",
        extraStyle: "",
    },
    {
        icon: iconPath + "like.png",
        iconActive: iconPath + "likeHL.png",
        title: "喜欢",
        extraStyle: "",
    },
    {
        icon: iconPath + "more.png",
        iconActive: iconPath + "moreHL.png",
        title: "更多",
        extraStyle: "border:none;",
    },
]
Page({
	data:{
		tabs: tabs,
		currentTab:0,
	},
	touchTab: function(event){
        var tabIndex = parseInt(event.currentTarget.id);
        var template = "tab" + (tabIndex + 1).toString();

        this.setData({
            currentTab: template,
            highLightIndex: tabIndex.toString()
        });
    },
	onLoad:function() {
		console.log('hahah');
		var that = this;
		app.getUserInfo(info => {
			that.setData({
				'diary.meta.avatar': info.avatarUrl,
				'diary.meta.nickName': info.nickName,
			})
		})
        this.setData({
            dairyList:dairyData.dairyList
        })
	},
    onChooseTap:function(event){
        this.setData({currentTab:event.currentTarget.dataset.tabid})
        console.log(typeof(this.data.currentTab));
    },
	onTopTap:function(){
		var that = this;
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success:  (res)=> {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				that.setData({
					tempFilePaths:res.tempFilePaths+''
				}) 
			}
		})	
	}
})