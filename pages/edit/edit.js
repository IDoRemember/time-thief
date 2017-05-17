const app = getApp(),
	QQMapWX = require('../../qqmap-wx-jssdk.min.js'),
	uploadFn = require('../../utils/upload.js'),
	util = require('../../utils/util.js'),
	AV = getApp().AV;
let qqmapsdk

Page({
	data: {
		address: '',
		content: '',
		secret: false

	},
	onLoad() {
		// 实例化API核心类
		qqmapsdk = new QQMapWX({
			key: '62YBZ-OK6HP-RVYDK-VVN5B-IRDKF-QJFP4'
		});
	},
	chooseImg() {
		const that = this
		wx.chooseImage({
			count: 9, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是photo，默认二者都有
			success: (res) => {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				console.log(res)
				that.setData({
					tempFilePaths: res.tempFilePaths
				})
				let files = [],
					netFiles = []
				for (let item of res.tempFilePaths) {
					let file = item.match(/(wxfile:\/\/)(.+)/)[2]
					files.push(file)
				}
				console.log(files)
				for (let i = 0; i < res.tempFilePaths.length; i++) {
					new AV.File('file-name', {
						blob: {
							uri: res.tempFilePaths[i]
						},
					}).save().then(
						file => {
							console.log(file.url())
							netFiles.push(file.url())
							that.setData({
								netFiles: netFiles
							})
						}
						).catch(console.error)
				}
			}
		})
	},
	getlocation(e) {
		const that = this;
		wx.getLocation({
			type: 'wgs84',
			success: function (res) {
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: res.latitude,
						longitude: res.longitude
					},
					success: function (res) {
						that.setData({
							address: res.result.address
						})
					},
					fail: function (res) {
						console.log(res);
					},
					complete: function (res) {
						console.log(res);

					}
				})
			},
		})
	},
	previewImg() {
		wx.previewImage({
			current: '', // 当前显示图片的http链接
			urls: [] // 需要预览的图片http链接列表
		})
	},
	submit() {
		console.log(
			wx.getStorageSync('user').openid,
			wx.getStorageSync('userInfo').nickName,
			wx.getStorageSync('userInfo').avatarUrl
		)
		wx.request({
			url: 'https://57113555.qcloud.la/dairy',
			data: {
				openid: wx.getStorageSync('user').openid + '',
				uname: wx.getStorageSync('userInfo').nickName + '',
				avatarUrl: wx.getStorageSync('userInfo').avatarUrl + '',
				title: this.data.title + '',
				secret: this.data.secret + '',
				content: this.data.content + '',
				address: this.data.address + '',
				netFiles: this.data.netFiles + '',
				date: util.formatTime(new Date),
				postId: Date.now(),
				datetime: util.getLocalDateTime(Date.now())
			},
			method: 'POST',
			success: function (res) {
				console.log(res)
				wx.navigateTo({
					url: '../detail/detail?postid=' + res.data.postId
				})
			}
		})
	},
	setcontent(e) {
		this.setData({
			content: e.detail.value
		})
	},
	setsecret() {
		this.setData({
			secret: !this.data.secret
		})
	},
	settitle(e) {
		this.setData({
			title: e.detail.value
		})
	}
})