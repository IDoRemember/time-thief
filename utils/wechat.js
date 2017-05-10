"use strict";
//resolved:已完成
//rejected:已失败
function login() {
	return new Promise(function(resolve, reject) {
		wx.login({
			success: resolve,
			fail: reject
		})
	})
}

function getUserInfo() {
	return new Promise(function(resolve, reject) {
		wx.getUserInfo({
			success: resolve,
			fail: reject
		})
	})
}

function setStorage(e, t) {
	return new Promise(function(resolve, reject) {
		wx.setStorage({
			key: e,
			data: t,
			success: resolve,
			fail: reject
		})
	})
}

function getStorage(e) {
	return new Promise(function(resolve, reject) {
		wx.getStorage({
			key: e,
			success: resolve,
			fail: reject
		})
	})
}
module.exports = {
	login: login,
	getUserInfo: getUserInfo,
	setStorage: setStorage,
	getStorage: getStorage,
	original: wx
};