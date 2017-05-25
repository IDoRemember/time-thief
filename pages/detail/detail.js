var postsData = require('../../data/posts-data.js')
Page({
	data: {
		postData: {},
		view: 0,
		isLike: true,
		isCollection: true
	},
	onLoad: function (params) {
		const that = this;
		const id = params["postid"];
		that.setData({
			view: that.data.view + 1
		})
		wx.request({
			url: 'https://57113555.qcloud.la/onedairy',
			data: {
				postid: id
			},
			method: 'GET',
			success: function (res) {
				console.log(res.data)
				let imgs = res.data[0].imgs.split(',')
				that.setData({
					postData: res.data[0],
					imgs: imgs
				})
			}
		})
		console.log(that.data.postData)
	},
	onLike: function () {
		console.log('111')
		if (this.data.isLike) {
			let data = this.data.postData;
			data.like = data.like + 1;
			this.setData({
				postData: data,
				isLike: false
			})
		}

	},
	onCollection: function () {
		if (this.data.isCollection) {
			let data = this.data.postData;
			data.collection = data.collection + 1;
			this.setData({
				postData: data,
				isCollection:false
			})
		}

	},
	onUnload: function () {
		const that = this;
		wx.request({
			url: 'https://57113555.qcloud.la/mergedata',
			data: {
				postid: that.data.postData.postid,
				like: that.data.postData.like,
				reading: that.data.postData.reading,
				collection: that.data.postData.collection
			},
			method: 'POST',
			success: function (res) {
				console.log(res.data)
			}
		})
	}
})