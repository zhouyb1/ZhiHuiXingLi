// pages/user/user_say/user_say.js
var app = getApp();
var md5 = require('../../../dist/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    say: "",
    say_data: '',
    phone: "",
    show: false,
    title:"请选择反馈类型",
    columns: ['物流状态', '优惠活动', '功能异常', '产品建议', '其他']
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    console.log(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      show: false,
      title: value 
    })
  },
  onCancel(obj) {
    this.setData({
      show: false
    })
  },
  shows() {
    this.setData({
      show: true
    })
  },
  s(event) {
    this.setData({
      say: event.detail.value
    })
  },
  p(value) {
    // console.log(value.detail)
    this.setData({
      phone: value.detail
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
    if (this.data.title == "请选择反馈类型") {
      wx.showModal({
        title: '温馨提示',
        content: '请选择反馈类型~'
      });
      return false;
    };
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
            console.log('用户点击确定');
            _this.set_say()
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
          content: '联系方式只允许手机、微信、QQ、邮箱'
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
      ContactWay: this.data.phone,
      type: this.data.title
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
            say_data: '',
            title:"请选择反馈类型"
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