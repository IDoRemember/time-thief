
var REGION = 'sh';
var APPID = '1253624527'
var BUCKET_NAME = 'images'
var cosSignatureUrl = 'http://10.154.138.57/mina_auth/'
var DIR_NAME = '/'
var cosUrl = "https://" + REGION + ".file.myqcloud.com/files/v2/" + APPID + "/" + BUCKET_NAME + DIR_NAME
var config = {
    'Action' : 'DescribeInstances',
    'Nonce' : 11886,
    'Region' : 'gz',
    'SecretId' : 'AKIDfFhy3BH6f3HOJ2Ps0whGcn7GD0ayuacS',
    'SignatureMethod' : 'HmacSHA256',
    'Timestamp' : 1465185768,
    'instanceIds.0' : 'ins-09dx96dg',
    'limit' : 20,
    'offset' : 0,
}
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
                // header: {
                //     'Authorization': signature
                // },
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