var postsData = require('../../data/posts-data.js')
Page({
	data:{
		postData:{}
	},
	onLoad: function (params) {
		const that = this ;
		const id = params["postid"];
		wx.request({
			url: 'https://57113555.qcloud.la/onedairy',
			data: {
				postid: id
			},
			method: 'GET',
			success: function (res) {
				console.log(res.data)
				that.setData({
					postData:res.data[0]
				})
			}
		})
		console.log(that.data.postData)

	},
	dianzan() {

	}
})