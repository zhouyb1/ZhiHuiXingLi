// pages/send/send.js
var QQMapWX = require('../../dist/map.js');
var md5 = require('../../dist/md5.js');
var app = getApp();

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'H76BZ-KV3KW-6GBRI-RP4EE-E4UM5-62BCM' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: [0, 0, 0], //航程
    citty_list: ['请选择始发站'], //航程
    index: 0, //到达站下标
    end_city_list: ["首都机场"], //到达站
    end_city_list_data: '', //到达站
    city_num: ['请先选择到达站'], //航班号
    num_index: 0, //航班号下标
    name: '', //用户姓名
    phone: '', //用户手机
    city_data: [0], //用户历史地址下标
    citty_data_list: [], //用户历史地址列表
    can_value: "", //托运单号
    can_list: [], //托运单号列表
    self_city: '' //手动获取的地址

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.getStorage({
      key: 'city',
      success(res) {
        _this.setData({
          citty_list: [res.data]
        })
      },
      fail(res) {
        _this.setData({
          citty_list: ['请选择起始位置']
        })
      }
    });
    //获取机场列表
    wx.request({
      url: app.path(1) + "/pdaapi/GetAirPort",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data={}`).toUpperCase(),
        version: app.path(3),
        data: {}
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code === 200) {
          var arr = [];
          var arr1 = [];
          var d = JSON.parse(res.data.data);
          for (var i = 0; i < d.length; i++) {
            arr.push(d[i].F_AirfieldName);
            arr1.push(d[i].F_Id);
          };
          _this.setData({
            end_city_list: arr,
            end_city_list_data: arr1
          })
        };
      }
    })
  },
  onShareAppMessage: function() {

  },
  name_fun(e) {
    this.setData({
      name: e.detail.value
    });
  },
  phone_fun(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  city_fun(e) {
    this.setData({
      self_city: e.detail.value
    });
  },
  bindRegionChange: function(e) {
    this.setData({
      citty_list: e.detail.value
    })
  },
  str_city: function(e) {
    this.setData({
      citty_list: e.detail.value
    });
    var addrss = e.detail.value[0] + e.detail.value[1];
    qqmapsdk.geocoder({
      address: addrss, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function(res) { //成功后的回调
        wx.setStorage({
          key: 'city',
          data: addrss
        });
        wx.setStorage({
          key: 'location',
          data: JSON.stringify(res.result.location)
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },
  end_citty(e) {
    var _this = this;
    console.log(e.detail.value);

    //获取航班号
    wx.request({
      url: app.path(1) + "/pdaapi/GetFlightNoInfo",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({F_AirfieldId: _this.data.end_city_list_data[e.detail.value]})}`).toUpperCase(),
        version: app.path(3),
        data: {
          F_AirfieldId: _this.data.end_city_list_data[e.detail.value]
        }
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var d = JSON.parse(res.data.data);
        var t = ['请选择航班号'];
        for (var i = 0; i < d.length; i++) {
          t.push(d[i].F_FlightNumber);
        };
        _this.setData({
          city_num: t
        })
      }
    })

  },
  city_nums(e) {
    // 选择航班号
    this.setData({
      num_index: e.detail.value || 1
    });
  },
  city_data(e) {
    console.log(e.detail.value);
  },
  get_info() {
    this.setData({
      name: "1",
      phone: "123456"
    })
  },
  cans() {
    var _this = this;
    wx.scanCode({
      success(res) {
        _this.setData({
          can_value: res.result
        })
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  can_numbers(e){
    this.setData({
      can_value:e.detail.value
    })
  },
  save_cans() {
    var data = this.data.can_list;
    if (this.data.can_value) {
      data.push(this.data.can_value);
      data = [...new Set(data)];
      this.setData({
        can_list: data,
        can_value: ''
      });
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请输入托运单号'
      })
    }
  },
  del_num(event) {
    var data = this.data.can_list;
    var index = event.target.dataset.id;
    var _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除托运单号【' + data[index] + '】嘛',
      success(res) {
        if (res.confirm) {
          data.splice(index, 1);
          _this.setData({
            can_list: data
          })
        };
      }
    });
  },
  get_city() {
    wx.showLoading({
      title: '获取位置中.',
    });
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var _this = this;
        qqmapsdk.reverseGeocoder({
          //位置坐标，默认获取当前位置，非必须参数
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          } || '',
          success: function(res) { //成功后的回调
            that.setData({
              self_city: res.result.address
            });
            wx.hideLoading()
          },
          fail: function(error) {
            wx.setStorage({
              key: 'city',
              data: ''
            });
          },
          complete: function(res) {
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log("用户拒绝定位");
      }
    });
  },
  go_pay() {
    var p = /^1[345789]\d{9}$/;
    var n = /^[\u4e00-\u9fa5]{2,4}$/;
    var d = this.data;
    var len = d.can_list.length;
    if (d.citty_list[0] === "请选择始发站" || !d.citty_list[0]) {
      wx.showModal({
        title: '温馨提示',
        content: '请选择始发站'
      })
      return false;
    };
    if (!d.end_city_list[0]) {
      wx.showModal({
        title: '温馨提示',
        content: '请选择到达站'
      })
      return false;
    };
    if (d.city_num[d.num_index] === "请选择航班号") {
      wx.showModal({
        title: '温馨提示',
        content: '请选择航班号'
      })
      return false;
    };
    if (!n.test(d.name)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的收件人姓名'
      })
      return false;
    };
    if (!p.test(d.phone)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的收件人手机号码'
      })
      return false;
    };
    if (!d.self_city) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入收货地址'
      })
      return false;
    };
    if (!len) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入托运单号'
      })
      return false;
    };
    wx.navigateTo({
      url: '../pays/pays'
    });
  },
})