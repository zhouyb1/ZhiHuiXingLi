// pages/user/user_info/user_info.js
var app = getApp();
var md5 = require('../../../dist/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    card: '',
    open: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    });

    wx.request({
      url: app.path(1) + "/pdaapi/getuserinfo",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({ OpenId: app.open('open').openId })}`).toUpperCase(),
        version: app.path(3),
        data: {
          OpenId: app.open('open').openId
        }
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        console.log(res.data)
        if (res.data.code === 200) {
          wx.hideLoading()
          var d = JSON.parse(res.data.data);
          _this.setData({
            name: d.FullName,
            phone: d.Phone,
            card: d.IDCard
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '获取失败',
            image: "../../../image/error.png",
            duration: 2000
          });
        };
      }
    })
  },
  names(event) {
    this.setData({
      name: event.detail.detail.value
    })
  },
  phones(event) {
    this.setData({
      phone: event.detail.detail.value
    })
  },
  cards(event) {
    this.setData({
      card: event.detail.detail.value
    })
  },
  svaes() {
    var d = this.data;
    var p = /^1[345789]\d{9}$/;
    var n = /^[\u4e00-\u9fa5]{2,4}$/;
    var c = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!n.test(d.name)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的姓名'
      });
      return false;
    }
    if (!p.test(d.phone)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的手机号码'
      });
      return false;
    };
    if (d.card && !c.test(d.card)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的身份证号码'
      });
      return false;
    };
    this.set_info({
      name: d.name,
      phone: d.phone,
      id: d.card
    });
  },
  set_info(obj) {
    var d = this.data;
    var da = {
      FullName: obj.name,
      Phone: obj.phone,
      IDCard: obj.id,
      OpenId: app.open('open').openId
    };
    wx.showLoading({
      title: '修改中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/saveuserinfo",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(da)}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify(da)
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code === 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '修改失败',
            image: "../../../image/error.png",
            duration: 2000
          });
        };
      }
    })
  },
  getPhoneNumber(e) {
    var _this = this;
    wx.showLoading({
      title: '获取中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/getphone",
      data: {
        sign: app.path(2),
        version: app.path(3),
        data: JSON.stringify({
          iv: e.detail.iv,
          encrytedData: e.detail.encryptedData,
          sessionId: app.open('open').sessionId,
          errMsg: e.detail.errMsg,
        })
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        if (res.data.code === 200) {
          wx.hideLoading();
          _this.setData({
            phone: res.data.data
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '获取失败',
            image: "../../../image/error.png",
            duration: 2000
          });
        };
      }
    })
  }
})