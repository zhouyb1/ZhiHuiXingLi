//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var _this = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId、
        wx.request({
          url: _this.path(1) + '/pdaapi/onlogin',
          data: {
            sign: _this.path(2),
            version: _this.path(3),
            data: (JSON.stringify({
              code: res.code
            }))
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "POST",
          success(res) {
            wx.setStorage({
              key: 'open',
              data: res.data.data
            })
          }
        });
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
    });

    // 更新
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function() {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        });
      }
    });
    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },
  globalData: {
    userInfo: null
  },
  path(obj) {
    if (obj === 1) {
      return "https://zhonghuijinxin.com:8011";
    };
    if (obj === 2) {
      return "o6IgFIj7gJanSJyyg6ruaiq0PHRFpVd9";
    };
    if (obj === 3) {
      return "1";
    };
  },
  getFloatSt(num) {
    num += '';
    num = num.replace(/[^0-9|\.]/g, '');

    if (/^0+/)
      num = num.replace(/^0+/, '');
    if (!/\./.test(num))
      num += '.00';
    if (/^\./.test(num))
      num = '0' + num;
    num += '00';
    num = num.match(/\d+\.\d{2}/)[0];
    return num - 0;
  }
})