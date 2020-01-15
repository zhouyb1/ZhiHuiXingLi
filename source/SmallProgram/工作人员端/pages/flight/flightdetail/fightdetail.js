// pages/flight/flightdetail/fightdetail.js

var app = getApp();
var url = app.data.globalurl;
var qm_key = app.data.key;
var version = app.data.version;

var md5 = require('../../../utils/md5.js') // 引入md5.js文件 


Page({

  /**
   * 页面的初始数据
   */
  data: {

    detalilist:[],
    hangbanhao:'',//航班号
    xinglishu:'',//行李数
    xingdanshu:''//订单数

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var hb = options.hanghanhao;
    var xl = options.xinglishu;
    var dd = options.dingdanshu;

    that.setData({
      hangbanhao: hb,//航班号
      xinglishu: xl,//行李数
      xingdanshu:dd,//订单数
    })

    var myDate = new Date(); //获取系统当前时间
    var mytime = myDate.toLocaleString(); //获取当前时间
    var str = mytime.trim().split(" ")[0];
    var datastr = str.replace(/\//g, '-');

    //数据加密
    var data_jm = JSON.stringify({
      "FlightNumber": that.data.hangbanhao,
      "OrderDate": datastr
    });

    // console.log(data_jm)
    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
    let miyao = md5(jm).toUpperCase();

    //请求数据
    wx.request({
      method: "GET",
      url: url + '/pdaapi/GetConNumberListByFNo',
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
            that.setData({
              detalilist: json_data
            })

        

          }

        }
      }

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