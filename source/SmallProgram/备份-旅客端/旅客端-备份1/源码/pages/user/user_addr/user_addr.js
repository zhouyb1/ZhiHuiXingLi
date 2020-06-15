// pages/user/user_addr/user_addr.js
var app = getApp();
var md5 = require('../../../dist/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr: [],
    actions: [{
      name: '删除',
      color: '#fff',
      fontsize: '20',
      width: 100,
      background: '#ed3f14'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.get_addr();
  },
  del(index) {
    var i = index.currentTarget.dataset.id;
    var d = this.data.addr;
    var _this = this;
    var da = {
      F_Id: index.currentTarget.dataset.f_id
    };
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          });
          wx.request({
            url: app.path(1) + "/pdaapi/AddressToDo",
            data: {
              sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(da)}`).toUpperCase(),
              version: app.path(3),
              data: JSON.stringify(da)
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
              wx.hideLoading();
              if (res.data.code === 200) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                });
                d.splice(i, 1);
                _this.setData({
                  addr: d
                });
              } else {
                wx.showToast({
                  title: '删除失败',
                  image: "../../../image/error.png",
                  duration: 2000
                });
              };
            }
          })



        };
      }
    });
  },
  get_addr() {
    wx.showLoading({
      title: '加载中',
    });
    var da = {
      openId: app.open('open').openId
    };
    var _this = this;
    wx.request({
      url: app.path(1) + "/pdaapi/GetAddressById",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(da)}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify(da)
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.hideLoading();
        console.log(res);
        if (res.data.code === 200) {
          _this.setData({
            addr: JSON.parse(res.data.data)
          })
        } else if (res.data.code === 400) {
          wx.showToast({
            title: '没有数据',
            image: "../../../image/error.png",
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '获取失败',
            image: "../../../image/error.png",
            duration: 2000
          });
        };
      }
    })
  }
});