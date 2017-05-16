var postsData = require('../../data/posts-data.js')
Page({
	onLoad:function(params){
        const id = params["id"];
		this.setData({
			postData:postsData.postList[id]
		});
        console.log(this.data.postData)
        
	},
	dianzan(){
		
	}
})