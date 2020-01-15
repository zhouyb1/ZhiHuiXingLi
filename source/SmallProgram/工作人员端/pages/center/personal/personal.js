// pages/center/personal/personal.js
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
    phone:"",
    zhanghao:""
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;

    var phonenumber = options.phone;

    var zh = wx.getStorageSync("zhanghao");
    var hm = wx.getStorageSync("phone");
    that.setData({
      zhanghao: zh,
      phone: hm
    })

  },

  //切换账号
  cut_login() {
    wx.navigateTo({
      url: '/pages/login/login?islogin=login',
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