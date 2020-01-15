// pages/login/login.js
var app = getApp();
var url = app.data.globalurl;
var qm_key = app.data.key;
var version = app.data.version;

var md5 = require('../../utils/md5.js') // 引入md5.js文件
var zhanghao = wx.getStorageSync("zhanghao"); //操作人账号


Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: "",
    password: "",
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hidlogin: true,
    hiduserinfo: true,
    code_login: '', //判断是否登录过
    bgColor:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this; // 查看是否授权 
    var flag = options.islogin;

    // 查看是否授权
    wx.getSetting({
      success: function(res) {

        wx.showLoading({
          title: '正在加载',
        })

        if (res.authSetting['scope.userInfo']) { //用户已经授权
          wx.getUserInfo({
            success: function(res) {

              wx.hideLoading()
              var login_ = wx.getStorageSync('login');

              if (flag == "login") {
                that.setData({
                  hidlogin: false,
                  hiduserinfo: true,
                  bgColor: 'linear-gradient( #3FA1E0 ,#FFFFFF)'
                });
              } else {
                //用户已经授权过,直接跳转首页
                if (zhanghao != "") {
                  wx.switchTab({
                    url: '/pages/flight/flight'
                  });

                  that.setData({
                    hidlogin: true, // 既然有授权，那设为false
                    hiduserinfo: true,
                     bgColor: ''
                  });
                } else {
                  that.setData({
                    hidlogin: false, // 既然没有授权，那设为false
                    hiduserinfo: true,
                    bgColor: 'linear-gradient( #3FA1E0 ,#FFFFFF)'
                  });
                }
              }
            }
          });
          
        } else {
          wx.hideLoading()

          that.setData({
            hiduserinfo: false, // 既然没有授权，那设为false
            hidlogin: true,
            bgColor: 'linear-gradient( #3FA1E0 ,#FFFFFF)'
          });
        }
      }
    });


  },

  //获取输入的账号值
  getpAccount(e) {
    var that = this;
    var val = e.detail.value;
    that.setData({
      account: val
    });

    //存在全局的账号
    app.globalData.account = val;
    wx.setStorageSync("zhanghao", val);

  },
  //获取输入的密码值
  getpPassword(e) {
    var that = this;
    var val = e.detail.value;
    that.setData({
      password: val
    });
  },

  //用户登录
  login(res) {
    var that = this;
    var account = that.data.account; //账号
    var password = that.data.password; //密码

    wx.showLoading({
      title: '正在加载',
    })

    //数据加密
    var data_jm = JSON.stringify({
      "Code": account,
      "PassWord": password
    });

    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
    let miyao = md5(jm).toUpperCase();

    if (account == '') {
      wx.showModal({
        content: '账号不能为空！',
        showCancel: false,
        success: function(res) {}
      });
      wx.hideLoading();

    } else if (password == "") {
      wx.showModal({
        content: '密码不能为空！',
        showCancel: false,
        success: function(res) {}
      });
      wx.hideLoading();

    } else if (password != "" && account != '') {
      //请求数据
      wx.request({
        method: "GET",
        url: url + '/pdaapi/SorterLogin',
        data: {
          "sign": miyao,
          "version": 1,
          data: data_jm
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res)
          if (res.statusCode == 200) {
            if (res.data.code == 200) {
              wx.hideLoading()
              // var data_json = JSON.parse(res.data.data);
              // wx.setStorageSync("login", data_json.Status);

              that.setData({
                hiduserinfo: true,
                hidlogin: false
              });

              wx.switchTab({
                url: '/pages/flight/flight'
              })

            } else {
              
              wx.showModal({
                content: '登录失败，请重新输入账号密码！',
                showCancel: false,
                success: function(res) {}

              });


              wx.hideLoading()
            }

          }
        }

      })
    }

  },
  bindGetUserInfo(res) {
    var that = this;
    wx.showLoading({})
    //确定授权
    if (res.detail.userInfo) {
      that.setData({
        hidlogin: false,
        hiduserinfo: true
      })
      wx.hideLoading()
    } else {
      wx.hideLoading()

      console.log("点击了拒绝授权");
      that.setData({
        hidlogin: true,
        hiduserinfo: false
      })
    }

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

  }
})