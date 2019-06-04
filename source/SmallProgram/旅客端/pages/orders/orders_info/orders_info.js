// pages/orders/orders_info/orders_info.js
var app = getApp();
var md5 = require('../../../dist/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verticalCurrent: 0,
    type: 0,
    list: '',
    num_list: '',
    num: '',
    price: '',
    OrderNo: '',
    info: '',
    order_type: "",
    express:[]
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
    this.get_type(d.OrderNo);
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
        var info = {
          OrderNo: d.orderhead[0].F_OrderNo,
          ConsignmentNumber: [],
          status: "",
          Operator: app.open("open").openId
        };
        if (res.data.code === 200) {
          var nums = 0;
          var price = 0;
          var express = [];
          for (var i = 0; i < d.orderbody.length; i++) {
            nums += d.orderbody[i].F_Qty;
            price += (d.orderbody[i].F_Qty * d.orderbody[i].F_Price)
            info.ConsignmentNumber.push(d.orderbody[i].F_ConsignmentNumber);
            express.push(d.orderbody[i].F_ExpressNO);
          };
          console.log(info)
          _this.setData({
            list: d.orderhead[0],
            num_list: d.orderbody,
            num: nums,
            type: d.orderhead[0].F_State - 0,
            price: price,
            OrderNo: d.orderhead[0].F_OrderNo,
            order_type: info,
            express:[...new Set(express)]
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
          _this.get_type(d.OrderNo);
        } else {
          wx.showToast({
            title: '操作失败',
            image: "../../image/error.png",
            duration: 2000
          });
        };
      }
    });
  },
  get_type(obj) {
    var _this = this;
    wx.request({
      url: app.path(1) + "/pdaapi/GetClientOrderLogisticsInfo",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({OrderNo:obj})}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify({
          OrderNo: obj
        })
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        if (res.data.code === 200) {
          var d = JSON.parse(res.data.data);
          var data = d[0].CliLogisticsInfo;
          var len = data.length;
          var da = [];
          for (var i = len; i--;) {
            da.push(data[i]);
          };
          _this.setData({
            info: da,
            verticalCurrent: len
          });
          console.log(da)
        } else {
          _this.setData({
            info: [{
              F_StateDescribe: "暂无物流信息"
            }]
          })
        };
      }
    });
  },
  express_fun(event){
    wx.navigateTo({
      url: '/pages/express/express?num=' + event.currentTarget.dataset.num,
    });
  }
})