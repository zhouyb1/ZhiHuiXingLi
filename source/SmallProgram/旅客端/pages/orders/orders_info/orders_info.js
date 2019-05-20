// pages/orders/orders_info/orders_info.js
var app = getApp();
var md5 = require('../../../dist/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verticalCurrent: 5,
    type: 0,
    list:'',
    num_list:'',
    num:'',
    price:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var d = {
      OrderNo: options.order
    };
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/GetOrderDetailByNo",
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
        var d = JSON.parse(res.data.data);
        console.log(d);
        if (res.data.code === 200) {
          var nums = 0;
          var price = 0;
          for (var i = 0; i < d.orderbody.length;i++){
            nums += d.orderbody[i].F_Qty;
            price += (d.orderbody[i].F_Qty * d.orderbody[i].F_Price)
          };
          _this.setData({
            list: d.orderhead[0],
            num_list: d.orderbody,
            num:nums,
            type: d.orderhead[0].F_State-0,
            price: price
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
            image: "../../../image/error.png",
            duration: 2000
          });
        };
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
  pays(){
    wx.showToast({
      title: '调取支付',
      icon: 'success',
      duration: 2000
    })
  },
  close_order(){
    wx.showToast({
      title: '取消订单',
      icon: 'success',
      duration: 2000
    })
  },
  refund(){
    var d = {
      OrderNo:this.list,
      status:""
    };
    wx.request({
      url: app.path(1) + "/ClientUpdateOrder",
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
       console.log(res.data)
      }
    });
  }
})