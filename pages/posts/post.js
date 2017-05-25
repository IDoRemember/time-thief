var postsData = require('../../data/posts-data.js'),
	util = require('../../utils/util.js')
Page({
	data: {
		page: 1,
		size: 5,
		hasMore: true,
		postList: null,
		scrollHeight: 500
	},
	handleLoadMore: function () {
		const that = this;
		if (that.data.hasMore) {
			//接口
			wx.request({
				url: 'https://57113555.qcloud.la/dairylist',
				data: {
					start: (that.data.page) * 5
				},
				method: 'GET',
				success: function (res) {
					console.log(res.data)
					let postlist = res.data
					if (postlist.length != 0) {
						for (let i = 0; i < postlist.length; i++) {
							if (postlist[i]['imgs']) {
								postlist[i]['imgs'] = postlist[i].imgs.split(',')[0]
								postlist[i]['datetime'] = util.getLocalDateTime(postlist[i]['postid'])
							}
						}
						that.setData({
							page: that.data.page + 1,
							postList: that.data.postList.concat(postlist)
						})
					} else {
						that.setData({
							hasMore: false,
						})
					}
				}
			})
		}
	},
	onReady: function () {

		const that = this
		if (that.data && that.data.postList) {
			let timer = setInterval(function () {
				let list = that.data.postList
				for (let i = 0;i< list.length;i++) {
					if (list[i]['datetime']) {
						list[i]['datetime'] = util.getLocalDateTime(list[i]['postid'])
						that.setData({
							postList:list
						})
					}
				}
			}, 1000);
		}
	},
	onLoad: function () {
		const that = this;
		if (!that.data.postList) {
			wx.request({
				url: 'https://57113555.qcloud.la/dairylist',
				data: {
					start: 0
				},
				method: 'GET',
				success: function (res) {
					console.log(res.data)
					// let imgs= res.data.imgs.split(',')
					let postlist = res.data
					for (let i = 0; i < postlist.length; i++) {
						if (postlist[i]['imgs']) {
							postlist[i]['imgs'] = postlist[i].imgs.split(',')[0];
							postlist[i]['datetime'] = util.getLocalDateTime(postlist[i]['postid'])
						}
					}
					that.setData({
						postList: postlist
					})
				}
			})
			if (this.data.postList) {
				let postlist = this.data.postList
				for (let i = 0; i < this.data.postList.length; i++) {
					postlist[i]['imgs'] = postList[i].imgs.split(',')[0]
				}
			}
		}
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					scrollHeight: res.windowHeight
				})
			}
		})
	},
	onPostTap: function (event) {
		console.log(event.currentTarget.dataset.postid);
	},
	showDetail(event) {
		wx.navigateTo({
			url: '../detail/detail?postid=' + event.currentTarget.dataset.postid
		})
	}
})