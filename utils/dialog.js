const msg = (msg, time=2000) =>{
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: time
    })
}
module.exports = {
    msg
}