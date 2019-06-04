// pages/pays/pays.js
var md5 = require('../../dist/md5.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: false,
    checked: false,
    data: '',
    totalFee: '--',
    totalFees: '--',
    flag: true,
    OrderNo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    this.setData({
      totalFee: app.getFloatSt(options.totalFee),
      OrderNo: options.OrdeNo,
      totalFees: app.getFloatSt(options.totalFee)
    });
    // 获取订单信息
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/GetOrderInfo", // 仅为示例，并非真实的接口地址
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({ OrderNo: options.OrdeNo })}`).toUpperCase(),
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
    if (!this.data.flag) {
      wx.switchTab({
        url: '/pages/index/index',
      });
    };
  },
  onChange(event) {
    var type = event.detail.value ? "加急" : "普通";
    this.setData({
      times: event.detail.value
    });
    var _this = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/SubmitOrderIsUrgent", // 仅为示例，并非真实的接口地址
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({ OrderNo: _this.data.OrderNo, IsUrgent: type })}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify({
          OrderNo: _this.data.OrderNo,
          IsUrgent: type
        })
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      success(res) {
        wx.hideLoading();
        if (res.data.code === 200) {
          _this.setData({
            totalFees: res.data.data.totalFee - 0 < 0 ? _this.data.totalFees : res.data.data.totalFee
          });
        } else {
          wx.showToast({
            title: type + '失败',
            image: "../../image/error.png",
            duration: 2000
          });
          _this.setData({
            totalFees: _this.data.totalFee,
            times: type == "加急" ? false : true
          });
        };
      }
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