// pages/order/telorder/telorder.js


var app = getApp();
var url = app.data.globalurl;
var qm_key = app.data.key;
var version = 1;
var zhanghao = wx.getStorageSync("zhanghao"); //操作人账号

var myDate = new Date(); //获取系统当前时间
var mytime = myDate.toLocaleString(); //获取当前时间
var str = mytime.trim().split(" ")[0];
var datastr = str.replace(/\//g, '-');

var md5 = require('../../../utils/md5.js'); // 引入md5.js文件


//全部订单
function Getorderlist(e) {
  var that = e;
  var data_jm = JSON.stringify({
    "Phone": that.data.phone
  });
  let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
  let miyao = md5(jm).toUpperCase();
  wx.request({
    method: "GET",
    url: url + '/pdaapi/GetOrderListByPhone',
    data: {
      "sign": miyao,
      "version": 1,
      data: data_jm
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      // console.log(res)
      if (res.statusCode == 200) {
        if (res.data.code == 200) {
          var dtr = res.data.data;
          var json_data = JSON.parse(dtr);
          // console.log(json_data)

          for (var i = 0; i < json_data.length; i++) {
            var time = json_data[i].DateTimeEnd;//航班到达时间
            // console.log(time)
            var plan = time.split(' ')[1];
            var t1 = plan.substr(0, 5);
            json_data[i].time = t1;//更新时间
            //更新订单列表数据
            that.setData({
              orderlist: json_data
            })
          }

        } else {
          wx.showModal({
            title: '提示',
            content: '没有相关手机号的订单！',
            showCancel: false,
            success: function (sm) {
              if (sm.confirm) {
               wx.navigateBack({
                 url:"pages/flight/flight?isnull=null"
               })
              } else if (sm.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        }

      }
    },
  })
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [], //全部订单列表数据
    datetimeend: [],//航班到达时间
    phone:''//手机号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(options.phonestr)
    that.setData({
      phone: options.phonestr
    })
    Getorderlist(that); //全部订单数据
  },

  //点击跳到订单详情
  go_detail(e) {
    //获取行李号
    var luggage = e.currentTarget.dataset.item;
    var ddh = e.currentTarget.dataset.ddh;
    // console.log(e)
    // 带参数跳转详情页面
    wx.navigateTo({
      url: '/pages/order/detail/detail?luggagestr=' + luggage + "&ddhnum=" + ddh
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})