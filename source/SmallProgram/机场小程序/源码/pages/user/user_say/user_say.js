// pages/user/user_say/user_say.js
var app = getApp();
var md5 = require('../../../dist/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    say: "",
    say_data:'',
    phone: "",
  },
  s(event) {
    this.setData({
      say: event.detail.value
    })
  },
  p(event) {
    this.setData({
      phone: event.detail.value
    })
  },
  save() {
    var _this = this;
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          say_data: _this.data.say + "---用户系统信息:" + JSON.stringify(res)
        })
      }
    });
    console.log(this.data)
    if (!this.data.say) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入内容哦~'
      });
      return false;
    };
    if (!this.data.phone) {
      wx.showModal({
        title: '温馨提示',
        content: '确定不留下联系方式吗',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          };
        }
      });
      return false;
    } else {
      var p = /^1[345789]\d{9}$/;
      var e = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      var q = /^[1-9]\d{4,9}$/;
      var w = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
      var data = this.data.phone;

      if (p.test(data) || e.test(data) || q.test(data) || w.test(data)) {
        this.set_say();
      } else {
        wx.showModal({
          title: '温馨提示',
          content: '联系方式只能填入允许手机、微信、QQ、邮箱'
        });
      };
    };
  },
  set_say() {
    var _this = this;
    wx.showLoading({
      title: '反馈中',
    });
    var d = {
      OpenId: app.open("open").openId,
      Content: this.data.say_data,
      ContactWay: this.data.phone
    };
    wx.request({
      url: app.path(1) + "/pdaapi/SaveFeedBack",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(d)}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify(d)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res.data);
        if (res.data.code === 200) {
          wx.showToast({
            title: '反馈成功',
            icon: 'success',
            duration: 2000
          });
          _this.setData({
            say: '',
            phone: '',
            say_data:''
          });
        } else {
          wx.showToast({
            title: '反馈失败',
            image: "../../../image/error.png",
            duration: 2000
          });
        };
      }
    })
  }
})