let login = (http)=>{
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
                http('/login', { code: res.code,isLogin:true }, 'post')
                    .then(res => {
                        // console.log('app', res)
                        wx.setStorageSync('token', res.data.token)
                        resolve(res)
                    })
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    })
}
module.exports = login