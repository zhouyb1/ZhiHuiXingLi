// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: "",
    name: "",
    num:3,
    list: [
      { id: 0, name: "我的订单", icon: "description", url: "/pages/orders/orders" },
      { id: 1, name: "修改资料", icon: "records", url: "/pages/user/user_info/user_info" },
      { id: 2, name: "地址管理", icon: "location-o", url: "/pages/user/user_addr/user_addr" },
      { id: 3, name: "意见反馈", icon: "chat-o", url: "/pages/user/user_say/user_say" },
      { id: 4, name: "联系客服", icon: "service-o", url: "", fun:"phones" }
    ],
    type: false,
    version:"1.1.0"
  },   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      },
      fail(){
        app.get_opneid();
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
  getUserInfo: function (e) {
    
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