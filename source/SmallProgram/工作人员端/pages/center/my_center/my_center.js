// pages/center/my_center/my_center.js
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
    isphone:true
  },
  getPhoneNumber: function (e) {
    var that = this;
    var code = wx.getStorageSync("code");
    // console.log(code)
    var data_jm = JSON.stringify({
      "code": code,
      "encrytedData": e.detail.encryptedData,
      "iv": e.detail.iv
    });

    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
    let miyao = md5(jm).toUpperCase();

    if (code) {
      //请求数据
      wx.request({
        method: "GET",
        url: url + '/pdaapi/SerGetPhone',
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
              wx.setStorageSync("phone", res.data.data)
              that.setData({
                isphone:false
              })
               wx.navigateTo({
                 url: '../personal/personal'
                })
            } 
          }
        }

      })
    } else {
      console.log('获取用户登录态失败！' + res.errMsg)
    }



  },
  ge_per() {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },

  //联系客服
  Tel() {
    wx.showModal({
      title: '拨打客服电话',
      content: '4001169016',
      confirmText: "拨打",
      cancelText: "取消",
      success: function (res) {
        // console.log(res);
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '4001169016', 
            success: function () {
              console.log("拨打电话成功！")
            },
            fail: function () {
              console.log("拨打电话失败！")
            }
          })
        } else {
          
        }

      }
    });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var phone = wx.getStorageSync("phone");
    console.log(phone)

    if (phone !== '') {
      that.setData({
        isphone:false
      })
    }

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