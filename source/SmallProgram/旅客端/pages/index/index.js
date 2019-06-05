//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    user_name: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tipdata: "欢度国庆，国庆寄件第二件半价！",
  },
  onLoad: function(options) {
    console.log(options)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      wx.showTabBar({});
      wx.setStorage({
        key: 'user_info',
        data: JSON.stringify(app.globalData.userInfo),
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        wx.showTabBar({});
        console.log(res.rawData)
        wx.setStorage({
          key: 'user_info',
          data: res.rawData,
        });
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          wx.showTabBar({});
          console.log(res)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (!this.data.hasUserInfo && this.data.canIUse) {
      wx.hideTabBar({});
    } else {
      wx.showTabBar({});
    };
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this;
    wx.getStorage({
      key: 'user_name',
      success(res) {
        _this.setData({
          user_name: true
        })
      },
      fail(res) {
        _this.setData({
          user_name: false
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  onShareAppMessage: function() {
    /**
     * 用户点击右上角分享
     */
    return {
      title: '智慧行李',
      path: 'pages/index/index?openid=' + app.open('open').openId,
      imageUrl: "../../image/2.jpg",
      success: function(res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    };
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    wx.showTabBar({});
    wx.setStorage({
      key: 'user_info',
      data: e.detail.rawData,
    });
    this.set_user_info();
  },
  paths(event) {
    var href = event.currentTarget.dataset.link;
    if (href) {
      wx.switchTab({
        url: href,
      });
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '敬请期待'
      })
    };
  },
  set_user_info() {
    var obj = {};
    var customerInfo = {};
    wx.getStorage({
      key: 'user_info',
      success(res) {
        obj = JSON.parse(res.data);
        customerInfo = {
          F_Openid: app.open('open').openId,
          F_City: obj.city,
          F_Sex: obj.sex,
          F_Country: obj.country,
          F_Name: obj.nickName,
          F_Phone: '',
          F_Province: obj.province
        };
        wx.request({
          url: app.path(1) + '/pdaapi/register', // 仅为示例，并非真实的接口地址
          data: {
            sign: app.path(2),
            version: app.path(3),
            data: JSON.stringify({
              customerInfo: customerInfo
            })
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          success(res) {
            console.log(res.data);
          }
        });
      }
    });
  }
})