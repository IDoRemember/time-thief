var postsData = require('../../data/posts-data.js')
Page({
	data:{
		page:1,
		size:10,
		list1:[],
		list2:[],
		hasMore:false
	},
	handleLoadMore:function(){
		const self=this;
		if(self.data.hasMore) {
			//接口
		}
	},
	onLoad:function(){
		this.setData({
			postList:postsData.postList
		});
	},
	onPostTap:function(event){
		console.log(event.currentTarget.dataset.postid);
	},
	showDetail(event){
		wx.navigateTo({
			url:'../detail/detail?id='+event.currentTarget.dataset.postid
		})
	}
})