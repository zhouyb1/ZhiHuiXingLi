//app.js


App({
  data:{
    globalurl: "https://mp.zhonghuijinxin.com:8011/",//接口地址
    key:"o6IgFIj7gJanSJyyg6ruaiq0PHRFpVd9",//md5加密key
    version:1,//版本号
  },
  onLaunch: function () {
    var that = this;
  
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
         // 展示本地存储能力
        wx.setStorageSync('code', res.code)
      }
    })

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
  globalData: {
    xlhnumber: "",//行李号
    ordernumber:"",//订单号
    phonestr:"",//手机号
    account: ""//登录账号
  }
})