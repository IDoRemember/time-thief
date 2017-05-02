var postsData = require('../../data/posts-data.js')
Page({
	data:{

	},
	onLoad:function(){
		this.setData({
			postList:postsData.postList
		});
	},
	onPostTap:function(event){
		console.log(event.currentTarget.dataset.postid);
	},
})