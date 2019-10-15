//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    app.http('/web/log',{},'get')
    .then(res => {
        console.log(res)
        if(res.data){
            this.setData({
                logs: (res.data || []).map(log => util.formatTime(new Date(log)))
            })
        }
    })
  }
})
