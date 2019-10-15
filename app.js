const http = require('./utils/http.js')
// const login = require('./utils/login.js')
App({
    http,
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        // login(http)
        this.globalData.loginInfo = this.login()
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    login() {
        let that = this
        return new Promise((resolve, reject) => {
            wx.login({
                success: res => {
                    http('/login', { code: res.code }, 'post')
                        .then(res => {
                            wx.setStorageSync('token', res.data.token)
                            that.globalData.isLogin = true
                            resolve(res)
                        })
                        .catch(err=>{
                            console.log('errapp.js',err)
                        })
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
            })
        })
    },
    globalData: {
        userInfo: null,
        loginInfo: null, //login的 promise 对象 
        isLogin:false, //  保存登录状态用于解决首页onshow的数据加载问题
    },

})