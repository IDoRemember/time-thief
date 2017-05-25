var app = getApp();
var dairyData = require('../../data/dairy-data.js')
var iconPath = "http://images-1253624527.cossh.myqcloud.com/images/icon/"
var util = require('../../utils/util.js')
var AV = getApp().AV;
var tabs = [
    {
        icon: iconPath + "mark.png",
        iconActive: iconPath + "markHL.png",
        title: "印记",
        extraStyle: "",
    },
    {
        icon: iconPath + "collect.png",
        iconActive: iconPath + "collectHL.png",
        title: "收藏",
        extraStyle: "",
    },
    {
        icon: iconPath + "like.png",
        iconActive: iconPath + "likeHL.png",
        title: "喜欢",
        extraStyle: "",
    },
    {
        icon: iconPath + "more.png",
        iconActive: iconPath + "moreHL.png",
        title: "更多",
        extraStyle: "border:none;",
    },
]
Page({
    data: {
        tabs: tabs,
        currentTab: 0,
        n:0,
        netFile: 'http://images-1253624527.picsh.myqcloud.com/banana.jpg',
        userInfo: wx.getStorageSync('userInfo')
    },
    touchTab: function (event) {
        var tabIndex = parseInt(event.currentTarget.id);
        var template = "tab" + (tabIndex + 1).toString();

        this.setData({
            currentTab: template,
            highLightIndex: tabIndex.toString()
        });
    },
    onShow: function () {
        console.log(wx.getStorageSync('newdairy'))
        if (wx.getStorageSync('newdairy') && this.data.n == 0) {
            let newPostList = wx.getStorageSync('newdairy')
            newPostList['author'] = newPostList['uname']
            newPostList['datetime'] = util.getLocalDateTime(newPostList['postid'])
            if (newPostList['imgs']) {
                newPostList['imgs'] = newPostList.imgs.split(',')[0]
            }
            newPostList['content'] = newPostList['content'].substring(0, 30)
            let newpostList = this.data.postList.push(newPostList)
            this.setData({
                postList: newpostList,
                n:1
            })
            n++;
        }
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: 'https://57113555.qcloud.la/mydairy',
            data: {
                uid: wx.getStorageSync('user').openid
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
                        dairyList: postlist
                    })
                }
            }
        })
        this.setData({
            userInfo: wx.getStorageSync('userInfo'),
        })
    },
    onChooseTap: function (event) {
        this.setData({ currentTab: event.currentTarget.dataset.tabid })
        console.log(typeof (this.data.currentTab));
    },
    toDetail: function (event) {
        wx.navigateTo({
            url: '../detail/detail?postid=' + event.currentTarget.dataset.postid
        })
    },
    onTopTap: function () {
        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是photo，默认二者都有
            success: (res) => {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    tempFilePaths: res.tempFilePaths[0] + ''
                })
                new AV.File('file-name', {
                    blob: {
                        uri: res.tempFilePaths[0]
                    },
                }).save().then(
                    file => {
                        console.log(file.url())
                        that.setData({
                            netFile: file.url()
                        })
                    }).catch(console.error)
            }
        })
    }
})