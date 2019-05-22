// pages/user/user_addr/user_addr.js
var app = getApp();
var md5 = require('../../../dist/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr: [],
    open: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.getStorage({
      key: 'open',
      success(res) {
        _this.setData({
          open: JSON.parse(res.data)
        });
        _this.get_addr();
      }
    })
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
      openId: this.data.open.openId
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