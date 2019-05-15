//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../dist/map.js');
var qqmapsdk;
Page({
  data: {
    user_name: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tipdata: "欢度国庆，国庆寄件第二件半价！",
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    text_list: [{
        id: 0,
        name: "什么是智慧行李",
        text: "什么是智慧行李"
      },
      {
        id: 0,
        name: "什么是智慧行李",
        text: "什么是智慧行李"
      }
    ]
  },
  onLoad: function() {
    // 定位
    qqmapsdk = new QQMapWX({
      key: 'H76BZ-KV3KW-6GBRI-RP4EE-E4UM5-62BCM'
    });
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var _this = this;
        qqmapsdk.reverseGeocoder({
          //位置坐标，默认获取当前位置，非必须参数
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          } || '',
          success: function(res) { //成功后的回调

            wx.setStorage({
              key: 'city',
              data: res.result.address_component.province + res.result.address_component.city
            });
            wx.setStorage({
              key: 'location',
              data: JSON.stringify(res.result.location)
            });
          },
          fail: function(error) {
            wx.setStorage({
              key: 'city',
              data: ''
            });
          },
          complete: function(res) {
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log("用户拒绝定位");
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      wx.showTabBar({});
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          user_name: res.userInfo.nickName
        });
        wx.setStorage({
          key: 'user_name',
          data: res.userInfo.nickName
        });
        wx.setStorage({
          key: 'user_info',
          data: JSON.stringify(res.userInfo)
        });
        wx.showTabBar({});
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.showTabBar({});
          console.log(1)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (!this.data.user_name) {
      wx.hideTabBar({});
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    this.setData({
      user_name: e.detail.userInfo.nickName,
    });
    wx.showTabBar({});
    wx.setStorage({
      key: 'user_name',
      data: e.detail.userInfo.nickName
    });
    wx.setStorage({
      key: 'user_info',
      data: JSON.stringify(e.detail.userInfo)
    });
  },
  paths(event) {
    var href = event.currentTarget.dataset.url;
    if (href) {
      wx.navigateTo({
        url: href
      })
    }else{
      wx.showModal({
        title: '温馨提示',
        content: '敬请期待'
      })
    };
  }
})