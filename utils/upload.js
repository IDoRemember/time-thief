var cosUrl = "http://imgs-1253624527.costj.myqcloud.com"

var cosSignatureUrl = 'https://57113555.qcloud.la' 
function upload(filePath, fileName) {

    // 鉴权获取签名
    wx.request({
        url: cosSignatureUrl,
        success: function(cosRes) {

            // 签名
            var signature = cosRes.data

            // 头部带上签名，上传文件至COS
            wx.uploadFile({
                url: cosUrl + '/' + fileName,
                filePath: filePath,
                header: {
                    'Authorization': signature
                },
                name: 'filecontent',
                formData: {
                    op: 'upload'
                },
                success: function(uploadRes){
                    var data = uploadRes.data
                    console.log('uploadRes', uploadRes)
                    //do something
                },
                fail: function(e) {
                    console.log('e', e)
                }
            })
        }
    })
}

module.exports = upload