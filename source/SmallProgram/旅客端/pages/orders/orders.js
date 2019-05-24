// pages/orders/orders.js
var app = getApp();
var md5 = require('../../dist/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '0',
    openid: "",
    list: '',
    id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var id = 0;
    if (options.id === '0') {
      id='';
    };
    if (options.id === '1') {
      id=5
    };
    if (options.id === '2') {
      id='0'
    };
    if (options.id === '3') {
      id=4;
    };
    if (options.id === '4') {
      id=-1
    };
    wx.getStorage({
      key: 'open',
      success(res) {
        var d = JSON.parse(res.data);
        _this.setData({
          openid: d.openId,
          id:id
        });
        _this.get_order(id);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.get_order();
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
    wx.showNavigationBarLoading();
    this.get_order(this.data.id);
    wx.stopPullDownRefresh();
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
  handleChange({
    detail
  }) {
    this.setData({
      index: detail.key
    });
    if (detail.key === '0') {
      this.get_order('');
    };
    if (detail.key === '1') {
      this.get_order(5);
    };
    if (detail.key === '2') {
      this.get_order('0');
    };
    if (detail.key === '3') {
      this.get_order(4);
    };
    if (detail.key === '4') {
      this.get_order(-1);
    };
  },
  get_info(event) {
    wx.navigateTo({
      url: '/pages/orders/orders_info/orders_info?order=' + event.currentTarget.dataset.order
    })
  },
  get_order(type) {
    wx.showLoading({
      title: '加载中',
    });
    var _this = this;
    var d = {
      openId: this.data.openid,
      status: type || ''
    };
    wx.request({
      url: app.path(1) + "/pdaapi/GetOrderList",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(d)}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify(d)
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading()
        var d = JSON.stringify(res.data.data) == '{}' ? [] : JSON.parse(res.data.data);
        if (res.data.code === 200) {
          _this.setData({
            list: d
          })
        }else if(res.data.code === 400){
          _this.setData({
            list: d
          });
          wx.hideLoading();
          // wx.showToast({
          //   title: '没有数据',
          //   image: "../../image/error.png",
          //   duration: 2000
          // });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
            image: "../../image/error.png",
            duration: 2000
          });
        };
      }
    });
  }
})