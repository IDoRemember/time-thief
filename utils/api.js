"use strict";

//全局定义
var URI = "http://www.kunyujie.com";
//var URI = "http://localhost:8080/myself";


/**
 * wx.request封装
 * @param {Object} n
 * @param {Object} param
 */
function setAsyncTask(n, param) {
    return new Promise(function(resolve, reject){
        wx.request({
            url: URI + "/" + n,
            data: Object.assign({}, param),
            header: {"Content-Type": "application/json"},
            success: resolve,
            fail: reject
        })
    })
}

/**
 * 查询
 * @param {Object} n
 */
function selectList(n){
    var page = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,  
		pageSize = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20,
		keywords = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "", 
		param = {
			pageNum: page,
			pageSize: pageSize
		};
	return setAsyncTask(n, keywords ? Object.assign(param, {title: keywords}) : param)
            .then(function(n){return n.data})
}

function selectOne(n){
	return setAsyncTask(n).then(function(n){return n.data})
}

function submitPost(n, param){
    return setAsyncTask(n, param).then(function(n){return n.data})
}


function imageUpload(n, param){
    //console.log(param)
    return new Promise(function(resolve, reject, complete){
        wx.uploadFile({
            url: URI + "/" + n,
            filePath: param.filePath,
            name: param.name,
            formData: param.formData,
            header: {"Content-Type": "multipart/form-data"},
            success: resolve,
            fail: reject,
            complete: complete //这个可能不会返回
        })
    }).then(function(n){return n.data})
}

//模块化暴露借口
module.exports = {
    selectList: selectList,
    selectOne: selectOne,
    submitPost: submitPost,
    imageUpload: imageUpload
};
