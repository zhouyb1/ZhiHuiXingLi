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
    end_city_list: ["请选择到达站"], //到达站
    en_data: [], //到达站数据
    end_city_list_data: ['0'], //到达站
    city_num: ['请先选择到达站'], //航班号
    num_index: 0, //航班号下标
    name: '', //用户姓名
    phone: '', //用户手机
    city_data: [0], //用户历史地址下标
    citty_data_list: [], //用户历史地址列表
    can_value: "", //托运单号
    can_list: [], //托运单号列表
    self_city: '', //手动获取的地址
    openid: '', //用户信息
    en_location: '', //到达站坐标
    user_location: '', //用户选择地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.getStorage({
      key: 'open',
      success(res) {
        var d = JSON.parse(res.data);
        _this.setData({
          openid: d.openId
        })
      }
    });

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
          var arr = _this.data.end_city_list;
          var arr1 = ['0'];
          var d = JSON.parse(res.data.data);
          for (var i = 0; i < d.length; i++) {
            arr.push(d[i].F_AirfieldName);
            arr1.push(d[i].F_Id);
          };
          _this.setData({
            end_city_list: arr,
            end_city_list_data: arr1,
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
    this.get_addr(e.detail.value, 1);
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
  },
  end_citty(e) {
    var _this = this;
    console.log();
    if (_this.data.end_city_list_data[e.detail.value] === '0') {
      return false;
    };
    // this.get_addr(_this.data.end_city_list[e.detail.value]);
    wx.showLoading({
      title: '',
    });
    this.setData({
      index: e.detail.value
    });
    //获取航班号
    wx.request({
      url: app.path(1) + "/pdaapi/GetFlightNoInfo",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({ F_AirfieldId: _this.data.end_city_list_data[e.detail.value] })}`).toUpperCase(),
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
        wx.hideLoading();
        if (res.data.code === 200) {
          var d = JSON.parse(res.data.data);
          var t = ['请选择航班号'];
          for (var i = 0; i < d.length; i++) {
            t.push(d[i].F_FlightNumber);
          };
          _this.setData({
            city_num: t,
            en_data: d
          });
        } else {
          wx.showToast({
            title: '获取航班号失败',
            image: "../../image/error.png",
            duration: 2000
          })
        };
      }
    })

  },
  city_nums(e) {
    // 选择航班号
    if (this.data.city_num[e.detail.value] === '请选择航班号') {
      return false;
    };
    this.setData({
      num_index: (e.detail.value - 0)
    });
  },
  city_data(e) {
    //选择历史地址
    var d = this.data.citty_data_list[(e.detail.value - 0)]
    this.setData({
      self_city: d
    });
    this.get_addr(d, 1);
  },
  city_types() {
    // 切换手动填写地址
    var _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要切换手动填写吗？',
      success(res) {
        if (res.confirm) {
          _this.setData({
            citty_data_list: []
          });
        };
      }
    })
  },
  get_info() {
    // 导入用户信息
    var _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要导入信息吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '导入中',
          })
          wx.getStorage({
            key: 'open',
            success(res) {
              res.data = JSON.parse(res.data);
              _this.setData({
                open: res.data
              });
              wx.request({
                url: app.path(1) + "/pdaapi/getuserinfo",
                data: {
                  sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({ OpenId: res.data.openId })}`).toUpperCase(),
                  version: app.path(3),
                  data: {
                    OpenId: res.data.openId
                  }
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success(res) {
                  if (res.data.code === 200) {
                    wx.showToast({
                      title: '信息导入成功',
                      icon: 'success',
                      duration: 2000
                    });
                    wx.hideLoading();
                    var d = JSON.parse(res.data.data);
                    _this.setData({
                      name: d.FullName,
                      phone: d.Phone,
                    })
                  } else {
                    wx.showModal({
                      title: '温馨提示',
                      content: '抱歉,暂时没有获取到您的信息，是否前去填写？',
                      success(res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '/pages/user/user_info/user_info',
                          })
                        };
                      }
                    })
                  };
                }
              })
            }
          });
        };
      }
    });
  },
  cans() {
    var _this = this;
    wx.scanCode({
      success(res) {
        _this.setData({
          can_value: res.result.substr(res.result.length - 6)
        })
      },
      fail(res) {
        wx.showToast({
          title: '扫码失败',
          image: "../../image/error.png",
          duration: 2000
        });
      }
    });
  },
  can_numbers(e) {
    this.setData({
      can_value: e.detail.value
    })
  },
  save_cans() {
    var data = this.data.can_list;
    var _this = this;
    if (this.data.can_value.length === 6) {
      wx.showModal({
        title: '温馨提示',
        content: '请确保[' + _this.data.can_value + ']是托运单号后六位,填入错误可能会找不到行李',
        success(res) {
          if (res.confirm) {
            data.push(_this.data.can_value);
            data = [...new Set(data)];
            _this.setData({
              can_list: data,
              can_value: ''
            });
          };
        }
      });
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请输入托运单号后六位'
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
            wx.hideLoading();
            that.get_addr(res.result.address, 1);
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
    var d = this.data;
    var da = {
      head: {},
      OrderDetails: []
    };
    var p = /^1[345789]\d{9}$/;
    var n = /^[\u4e00-\u9fa5]{2,4}$/;
    var len = d.can_list.length;
    if (d.citty_list[0] === "请选择始发站") {
      wx.showModal({
        title: '温馨提示',
        content: '请选择始发站'
      })
      return false;
    };
    if (d.end_city_list[d.index] === "请选择到达站") {
      wx.showModal({
        title: '温馨提示',
        content: '请选择到达站'
      })
      return false;
    };
    if (d.city_num[d.num_index] === "请选择航班号" || d.city_num[0] === "请先选择到达站") {
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
    da.head.F_AirfieldFloor = d.en_data[d.num_index - 1].F_AirfieldFloor;
    da.head.F_AirfieldId = d.en_data[d.num_index - 1].F_AirfieldId;
    da.head.F_AirfieldName = d.en_data[d.index - 0].F_AirfieldName;
    da.head.F_StartStation = d.citty_list[0];
    da.head.F_Longitude = d.user_location.lng;
    da.head.F_Latitude = d.user_location.lat;
    // da.head.F_CreateTime = '';
    // da.head.F_CreateUserName = d.name;
    da.head.F_CustomerAddress = d.self_city;
    da.head.F_CustomerName = d.name;
    da.head.F_CustomerPhone = d.phone;
    da.head.F_CustomerRemarks = "";
    da.head.F_FlightCompany = d.en_data[d.index - 0].F_FlightCompany;
    da.head.F_FlightNumber = d.city_num[d.num_index];
    da.head.F_IsUrgent = "普通";
    da.head.F_OpenId = d.openid;
    // da.head.F_OrderDate = '';
    // da.head.F_OrderNo = '';
    da.head.F_State = 0;
    da.head.F_Stype = "港内配送";

    for (var i = 0; i < d.can_list.length; i++) {
      da.OrderDetails.push({
        F_ConsignmentNumber: d.can_list[i],
        F_Weight: 20.0,
        F_Distance: 100.0,
        F_Price: 10.0,
        F_Qty: 1
      });
    };
    console.log(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(da)}`);
    wx.showLoading({
      title: '提交中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/SubmitOrder", // 仅为示例，并非真实的接口地址
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(da)}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify(da)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        if (res.data.code === 200) {
          wx.hideLoading()
          wx.navigateTo({
            url: '../pays/pays?OrdeNo=' + res.data.data.OrdeNo
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '提交失败',
            image: "../../image/error.png",
            duration: 2000
          })
        };
      }
    });
  },
  get_addr(obj, type) {
    if (!obj || obj.length < 4){
      return false;
    };
    var _this = this;
    qqmapsdk.search({
      keyword: obj,
      auto_extend:1,
      success: function(res) {
        _this.setData({
          user_location: res.data[0].location
        })
        console.log(res.data[0].location)
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  go_help(event) {
    wx.navigateTo({
      url: '/pages/help/help?type=' + event.target.dataset.type,
    });
  },
})