const app = getApp(),
	QQMapWX = require('../../qqmap-wx-jssdk.min.js')
let qqmapsdk

Page({
	data: {
		address: ''
	},
	onLoad() {
		// 实例化API核心类
		qqmapsdk = new QQMapWX({
			key: '62YBZ-OK6HP-RVYDK-VVN5B-IRDKF-QJFP4'
		});
	},
	chooseImg() {
		wx.chooseImage({
			count: 9, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是photo，默认二者都有
			success: (res) => {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				console.log(res)
				this.setData({
					tempFilePaths: res.tempFilePaths
				})
				let files = []
				for(let item of res.tempFilePaths) {
					let	file = item.match(/(wxfile:\/\/)(.+)/)[2]
					files.push(file)
				}
				console.log(files)
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
	}
})