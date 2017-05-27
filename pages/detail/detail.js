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
		wx.request({
			url: 'https://57113555.qcloud.la/haslike',
			data: {
				postid: id,
				uid: wx.getStorageSync('user').openid
			},
			method: 'GET',
			success: function (res) {
				console.log(res.data)
				if (res.data.length == 0) {
					that.setData({
						isLike: true
					})
				} else {
					that.setData({
						isLike: false
					})
				}
			}
		})

		wx.request({
			url: 'https://57113555.qcloud.la/hascollected',
			data: {
				postid: id,
				uid: wx.getStorageSync('user').openid
			},
			method: 'GET',
			success: function (res) {
				console.log(res.data)
				if (res.data.length == 0) {
					that.setData({
						isCollection: true
					})
				} else {
					that.setData({
						isCollection: false
					})
				}
			}
		})
	},
	onLike: function () {
		if (this.data.isLike) {
			console.log('111')
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
			console.log('222')
			let data = this.data.postData;
			data.collection = data.collection + 1;
			this.setData({
				postData: data,
				isCollection: false
			})
		}

	},
	onUnload: function () {
		const that = this;
		let dataobj = {
			postid: that.data.postData.postid,
			like: that.data.postData.like,
			uid: wx.getStorageSync('user').openid,
			reading: that.data.postData.reading,
			collection: that.data.postData.collection,
			isCollection: that.data.isCollection,
			isLike: that.data.isLike
		};
		wx.request({
			url: 'https://57113555.qcloud.la/mergedata',
			data: dataobj,
			method: 'POST',
			success: function (res) {
				console.log(res.data)
			}
		})
	}
})