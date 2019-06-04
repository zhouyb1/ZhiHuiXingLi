// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: "",
    name: "",
    type: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.getStorage({
      key: 'user_info',
      success(res) {
        var d = JSON.parse(res.data)
        _this.setData({
          images: d.avatarUrl,
          name: d.nickName,
          type: true
        })
      }
    });
  },
  phones() {
    wx.makePhoneCall({
      phoneNumber: '10086' // 仅为示例，并非真实的电话号码
    })
  },
  to_path(event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url,
    });
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorage({
      key: 'user_info',
      data: e.detail.rawData,
    });
    var _this = this;
    wx.getStorage({
      key: 'user_info',
      success(res) {
        var d = JSON.parse(res.data)
        _this.setData({
          images: d.avatarUrl,
          name: d.nickName,
          type: true
        })
      }
    });
  }
})