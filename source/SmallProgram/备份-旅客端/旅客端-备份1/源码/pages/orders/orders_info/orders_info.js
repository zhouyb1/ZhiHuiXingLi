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
    list: '',
    num_list: '',
    num: '',
    price: '',
    OrderNo: '',
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
          for (var i = 0; i < d.orderbody.length; i++) {
            nums += d.orderbody[i].F_Qty;
            price += (d.orderbody[i].F_Qty * d.orderbody[i].F_Price)
          };
          _this.setData({
            list: d.orderhead[0],
            num_list: d.orderbody,
            num: nums,
            type: d.orderhead[0].F_State - 0,
            price: price,
            OrderNo: d.orderhead[0].F_OrderNo
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
  pays() {
    wx.showToast({
      title: '调取支付',
      icon: 'success',
      duration: 2000
    })
  },
  close_pay() {
    var _this = this;
    var _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要申请退款吗',
      success(res) {
        if (res.confirm) {
          _this.refund(-3);
        };
      }
    });
  },
  close_order() {
    var _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要取消订单吗',
      success(res) {
        if (res.confirm) {
          _this.refund(-1);
        };
      }
    });
  },
  order_success() {
    var _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定收到行李吗？',
      success(res) {
        if (res.confirm) {
          _this.refund(5);
        };
      }
    });
  },
  Reminder() {
    var num = this.data.OrderNo;
    wx.getStorage({
      key: 'order_arr',
      success(res) {
        var d = JSON.parse(res.data);
        if (d.includes(num)) {
          wx.showModal({
            title: '温馨提示',
            content: '请勿重复催单'
          });
        } else {
          d.push(num)
          wx.setStorage({
            key: "order_arr",
            data: JSON.stringify(d)
          });
          wx.showToast({
            title: '催单成功',
            icon: 'success',
            duration: 2000
          });
        };
      },
      fail(res) {
        var arr = [num]
        wx.setStorage({
          key: "order_arr",
          data: JSON.stringify(arr)
        });
        wx.showToast({
          title: '催单成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
  },
  refund(obj) {
    var d = {
      OrderNo: this.data.list.F_OrderNo,
      status: obj
    };
    var _this = this;
    wx.request({
      url: app.path(1) + "/pdaapi/ClientUpdateOrder",
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
        if (res.data.code === 200) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          });
          _this.setData({
            type: obj
          });
        } else {
          wx.showToast({
            title: '操作失败',
            image: "../../image/error.png",
            duration: 2000
          });
        };
      }
    });
  }
})