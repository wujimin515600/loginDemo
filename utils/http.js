const login = require('./login')
let msg = require('./dialog.js').msg
let httpQueue = [] // 请求队列
let promiseQueue = [] //promise队列
let loginStatus = false // 是否正在执行登录 

/**
 * @param url {String} 请求地址
 * @param ops {Object} 请求参数
 * @param method {String} 请求方式
 * @param fun {String} 请求类型
 * */
const http = (url, ops, method = 'get', fun = 'request') => {
    let reconnectNum = ops.RECONNECT_NUM ? ops.RECONNECT_NUM : 0
    let defaultOps = {
        hideLoading: ops && ops.hideLoading ? ops.hideLoading : false,
        isLogin: ops && ops.isLogin ? ops.isLogin : false
    }
    if (ops && ops.hasOwnProperty('hideLoading')) {
        delete ops.hideLoading
    }
    if (ops && ops.hasOwnProperty('RECONNECT_NUM')) {
        delete ops.RECONNECT_NUM
    }
    if(ops && ops.hasOwnProperty('isLogin')) {
        delete ops.isLogin
    }
    if (!defaultOps.hideLoading) {
        wx.showLoading({})
    }
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // 存储范围  已知已经是403 到 登录接口成功返回数据期间的请求  并且不保存isLogin为true的请求，
            if (loginStatus && !defaultOps.isLogin) {
                httpQueue.push({
                    url,
                    ops,
                    method,
                    fun,
                })
                promise.resolve = resolve
                promiseQueue.push(promise)
                return;
            }
            let success = (res) => {
                if (res.data.code == 500) {
                    console.error(res.data.msg)
                    return;
                }
                if (res.data.code == 403) {
                    // 存储token失效的请求  存储范围 同时发起多个到 第一个请求结果为403 之前的请求都在这保存
                    httpQueue.push({
                        url,
                        ops,
                        method,
                        fun,
                    })
                    promise.resolve = resolve
                    promiseQueue.push(promise)
                    // 
                    if (loginStatus) return
                    loginStatus = true
                    // 登录
                    login(http)
                        .then(res => {
                            console.log('httpQueue', httpQueue)
                            console.log('promiseQueue', promiseQueue)
                            httpQueue.forEach((i, n) => {
                                loginStatus = false
                                promiseQueue[n].resolve(http(i.url, i.ops, i.method, i.fun))
                            })
                            httpQueue = []
                            promiseQueue = [] //清空队列
                        })
                } else {
                    resolve(res.data)
                }
            }
            let fail = err => {
                console.error('err', err)
                reconnectNum++
                if (reconnectNum < 4) {
                    ops.RECONNECT_NUM = reconnectNum
                    resolve(http(url, ops, method))
                } else {
                    wx.showModal({
                        content: '请求失败',
                    })
                    reject(err)
                }
            }
            let complete = res => {
                if (!defaultOps.hideLoading) {
                    wx.hideLoading({})
                }
            }
            if (fun == 'request') request(url, ops, method, success, fail, complete)
            if (fun == 'uploadFile') uploadFile(url, ops, method, success, fail, complete)
        }, 0)
    })
    return promise
}
// 
/**
 * desc 成功的处理函数
 * @parma url {String}
 * 
 * */
function request(url, ops, method, success, fail, complete) {
    wx.request({
        url: 'http://localhost:3000' + url,
        header: {
            'token': wx.getStorageSync('token') || ''
        },
        data: ops,
        method: method,
        success,
        fail,
        complete
    })
}

function uploadFile(url, ops, method, success, fail, complete) {
    if (!ops.url || ops.url == '') {
        msg('图片不能为空')
        return;
    }
    wx.uploadFile({
        url: 'http://localhost:3000/upload',
        filePath: ops.url,
        name: 'file',
        header: {
            'token': wx.getStorageSync('token') || '',
        },
        method: 'post',
        formData: ops || {},
        success(res) {
            let data = res.data && JSON.parse(res.data)
            success({
                data
            })
        },
        fail,
        complete
    })
}
module.exports = http