const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text:'',
        text1:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            slideButtons: [{
                text: '普通',
                src: '', // icon的路径
            }, {
                text: '普通',
                extClass: 'test',
                src: '', // icon的路径
            }, {
                type: 'warn',
                text: '警示',
                extClass: 'test',
                src: '', // icon的路径
            }],
        });
        app.globalData.loginInfo
            .then(res => {
                this.getLog()
            })
            this.setData({
                text:'sdsdsd\\nsdss\\nsds'
            })

    },
    getLog() {
        app.http('/web/log', {}, 'get')
            .then(res => {
                console.log('log', res)
            })
    },
    slideButtonTap(e) {
        console.log('slide button tap', e.detail)
    },
    upload() {
        let that = this
        wx.chooseImage({
            success: function(res) {
                // console.log(res)
                that.uploadFile(res.tempFilePaths[0])
                return;
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFilePaths[0],
                    encoding: 'base64',
                    success(res) {
                        // console.log(res)
                        that.uploadFile(res.data)
                    }
                })
                
            },
        })
    },
    uploadFile(src) {
        app.http('/upload',{ url: src,name: 'file'},'post','uploadFile')
        .then(res => {
            console.log('upload',res)
        })
    }
})