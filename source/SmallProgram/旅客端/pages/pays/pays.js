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
    radios: false,
    data: '',
    totalFee: '--',
    totalFees: '--',
    flag: true,
    alert_falg: false,
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
    var d = this.data.checked;
    console.log(d, this.data.radios)
    if (!this.data.radios) {
      wx.showModal({
        title: '温馨提示',
        content: '请选择报价服务'
      });
      return false;
    };
    if (!d) {
      wx.showModal({
        title: '温馨提示',
        content: '请同意xxx'
      });
      return false;
    } else {
      // console.log(2)
      // wx.showModal({
      //   title: '温馨提示',
      //   content: '支付成功'
      // });
      var _this = this;
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        url: app.path(1) + "/pdaapi/WxPay",
        data: {
          sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({orderNo: _this.data.OrderNo, openId: app.open("open").openId })}`).toUpperCase(),
          version: app.path(3),
          data: JSON.stringify({
            orderNo: _this.data.OrderNo,
            openId: app.open("open").openId
          })
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "GET",
        success(res) {
          wx.hideLoading();
          var d = JSON.parse(res.data.data);
          wx.requestPayment({
            timeStamp: d.timeStamp,
            nonceStr: d.nonceStr,
            package: d.package,
            signType: d.signType,
            paySign: d.paySign,
            success(res) {
              _this.setData({
                alert_falg: true
              });
              console.log("支付成功")
            },
            fail(res) {
              wx.showModal({
                title: '温馨提示',
                content: '支付失败了,是否重新支付？',
                cancelText:"返回首页",
                confirmText:"重新支付",
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    _this.pays();
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  }
                }
              })
              console.log("支付失败");
            }
          })
        }
      });
    };
  },
  navigateTos(event) {
    if (event.target.dataset.type - 0) {
      this.setData({
        flag: true,
        alert_falg: false
      });
      wx.switchTab({
        url: event.target.dataset.link,
      });
    } else {
      this.setData({
        flag: false,
        alert_falg: false
      });
      wx.navigateTo({
        url: event.target.dataset.link,
      });
    };
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      radios: e.detail.value
    })
  }
})