// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: "",
    name: ""
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
          name: d.nickName
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
  }
})