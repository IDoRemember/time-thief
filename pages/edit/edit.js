var app = getApp();
Page({
	chooseImg(){
		wx.chooseImage({
			count: 9, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: (res)=>{
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				this.setData({
					tempFilePaths:res.tempFilePaths
				})
			}
		})	
	},
	previewImg(){
		wx.previewImage({
		  current: '', // 当前显示图片的http链接
		  urls: [] // 需要预览的图片http链接列表
		})
	},
	setMeta() {
		var that = this;
		app.getUserInfo(info => {
			that.setData({
				'diary.meta.avatar': info.avatarUrl,
				'diary.meta.nickName': info.nickName,
			})
		})
	},
})