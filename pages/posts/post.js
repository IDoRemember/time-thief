var postsData = require('../../data/posts-data.js')
Page({
	data: {
		page: 1,
		size: 10,
		list1: [],
		list2: [],
		hasMore: false
	},
	handleLoadMore: function () {
		const self = this;
		if (self.data.hasMore) {
			//接口
		}
	},
	onLoad: function () {
		const that = this;
		wx.request({
			url: 'https://57113555.qcloud.la/dairylist',
			data: {
			},
			method: 'GET',
			success: function (res) {
				console.log(res.data)
				// let imgs= res.data.imgs.split(',')
				let postlist = res.data
				for (let i = 0; i < postlist.length; i++) {
					if(postlist[i]['imgs'] ) {
						postlist[i]['imgs'] = postlist[i].imgs.split(',')[0]
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