// pages/pays/pays.js
var md5 = require('../../dist/md5.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: false,
    checked: true,
    data: '',
    totalFee: '--',
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    _this.setData({
      totalFee: app.getFloatSt(options.totalFee)
    });
    // 获取订单信息
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/GetOrderInfo", // 仅为示例，并非真实的接口地址
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({OrderNo: options.OrdeNo})}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify({
          OrderNo: options.OrdeNo
        })
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      success(res) {
        console.log(res.data)
        if (res.data.code === 200) {
          wx.hideLoading();
          var d = JSON.parse(res.data.data);
          _this.setData({
            data: d
          });
          console.log(d.Details);
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '获取订单失败',
            image: "../../image/error.png",
            duration: 2000
          });
        };
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!this.data.flag){
      wx.switchTab({
        url: '/pages/index/index',
      });
    };
  },
  onChange(event) {
    var num = event.detail.value ? 20 : -20;
    this.setData({
      times: event.detail.value,
      totalFee: this.data.totalFee + num
    })
  },
  checkboxChange: function(e) {
    var c = !this.data.checked;
    this.setData({
      checked: c
    });
    console.log(c)
  },
  go_help(event) {
    wx.navigateTo({
      url: '/pages/help/help?type=' + event.target.dataset.type,
    });
  },
  pays() {

    // return false;
    var d = this.data.checked;
    if (!d) {
      wx.showModal({
        title: '温馨提示',
        content: '请同意xxx'
      });
      return false;
    } else {
      console.log(2)
      wx.showModal({
        title: '温馨提示',
        content: '支付成功'
      });
      wx.navigateTo({
        url: '../../pages/orders/orders',
      });
      this.setData({
        flag: false
      });
    };
  },
  go_index() {
    wx.switchTab({
      url: '/pages/index/index',
    });
  }
})