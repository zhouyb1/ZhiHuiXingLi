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
    name: '', //收货姓名
    phone: '', //收获手机
    name1: '', //乘机人信息
    phone1: '', //乘机人电话
    city_data_index: 0, //用户历史地址下标
    citty_data_list: [], //用户历史地址列表
    citty_data_data: [], //用户历史地址列表
    can_value: "", //托运单号
    can_list: [], //托运单号列表
    self_city: '', //手动获取的地址
    // openid: '', //用户信息
    user_location: '', //用户选择地址
    page1: false, //违禁物品
    page2: false, //委托协议
    page_index: 1, //1寄件人 2航班与行李 3收件人
    suggestion: [], //地址列表
    backfill: '', //选择索引地址
    flight_number: "", //航班号
    flight_number_list: [], //航班列表
    flight_number_type: 'flight_number_box', //显示搜索航班class
    en_city_data: '', //机场信息
    en_city_list: "", //机场列表
    en_city_list1: "", //机场列表
    en_city_type: "en_city_box", //机场class
    search_text: "搜索中", //搜索提示文字
    timers: null, //搜索地址定时器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_user_addr(app.open("open").openId);
  },
  onShow: function () {
    app.logins();
    //获取机场列表
    var _this = this;
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
          console.log(JSON.parse(res.data.data));
          _this.setData({
            en_city_list: JSON.parse(res.data.data),
            en_city_list1: JSON.parse(res.data.data)
          })
        };
      }
    })
    // this.get_addr("清华大学8号楼2楼201");
  },
  onShareAppMessage: function () {
    /**
     * 用户点击右上角分享
     */
    return {
      title: '智慧行李',
      path: 'pages/index/index?openid=' + app.open('open').openId,
      imageUrl: "../../image/Top.jpg",
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    };
  },
  name_fun(e) {
    if (e.target.dataset.type) {
      this.setData({
        name1: e.detail.value
      });
    } else {
      this.setData({
        name: e.detail.value
      });
    };
  },
  phone_fun(e) {
    if (e.target.dataset.type) {
      this.setData({
        phone1: e.detail.value
      });
    } else {
      this.setData({
        phone: e.detail.value
      });
    };
  },
  city_fun(e) {
    this.setData({
      self_city: e.detail.value
    });
    this.get_addr(e.detail.value, 1);
  },
  city_data(e) {
    //选择历史地址
    if (!(e.detail.value - 0)) {
      return false;
    };
    var d = this.data.citty_data_list[(e.detail.value - 0)];
    var info = this.data.citty_data_data[(e.detail.value - 1)];
    this.setData({
      self_city: d,
      city_data_index: e.detail.value - 0,
      name: info.F_Name,
      phone: info.F_Phone
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
            citty_data_list: [],
            self_city: ""
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
      content: '确定要快速填写吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '填写中',
          });
          wx.request({
            url: app.path(1) + "/pdaapi/getuserinfo",
            data: {
              sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({ OpenId: app.open('open').openId })}`).toUpperCase(),
              version: app.path(3),
              data: {
                OpenId: app.open('open').openId
              }
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success(res) {
              wx.hideLoading();
              console.log(res)
              var d = JSON.parse(res.data.data);
              if (res.data.code === 200 && d.Phone) {
                wx.showToast({
                  title: '填写成功',
                  icon: 'success',
                  duration: 2000
                });
                _this.setData({
                  name: d.FullName,
                  phone: d.Phone,
                  name1: d.FullName,
                  phone1: d.Phone,
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
  tab_flight_number(event) {
    // 显示搜索框
    var t = event.currentTarget.dataset
    if (t.type - 0) {
      this.setData({
        en_city_type: this.data.en_city_type + ' ' + t.class,
      });
    } else {
      this.setData({
        flight_number_type: this.data.flight_number_type + ' ' + t.class,
        flight_number: ""
      });
    };
  },
  close_flight_number(event) {
    // 关闭搜索框
    var t = event.currentTarget.dataset
    if (t.type - 0) {
      this.setData({
        en_city_type: t.class
      });
    } else {
      this.setData({
        flight_number_type: t.class
      });
    };
  },
  seach_flight_number(event) {
    // 点击搜索
    console.log(event)
    var _this = this;
    if (!this.data.flight_number) {
      this.setData({
        flight_number_list: []
      })
    } else {
      this.get_flight_number(this.data.flight_number);
    };
  },
  set_flight_number(e, event) {
    // 输入搜索
    var t = e.currentTarget.dataset;
    var val = e.detail.value;
    var _this = this;
    if (t.type - 0) {
      var arr = [];
      var len = this.data.en_city_list1.length;
      for (var i = 0; i < len; i++) {
        if (this.data.en_city_list1[i].F_AirfieldName.includes(val)) {
          arr.push(this.data.en_city_list1[i]);
        };
      };
      this.setData({
        en_city_list: arr,
        flight_number: val
      });
    } else {
      _this.setData({
        flight_number: val,
        search_text: "搜索中"
      });
      if (!val) {
        this.setData({
          flight_number_list: [],
          search_text: "搜索中"
        })
      };
      this.get_flight_number(this.data.flight_number);
    };

  },
  set_flight_number_text(event) {
    // 点击搜索结果
    var t = event.currentTarget.dataset;
    if (t.type - 0) {
      this.setData({
        en_city_data: this.data.en_city_list[t.id],
        en_city_type: t.class
      });
    } else {
      this.setData({
        flight_number: this.data.flight_number_list[t.id],
        flight_number_list: [],
        flight_number_type: t.class
      });
      console.log(this.data.flight_number)
    };

  },
  get_flight_number(obj) {
    // 查询航班号接口
    var _this = this;
    if (!obj) {
      return false;
    };
    wx.showLoading({
      title: '搜索中',
    });
    var da = {
      FlightNumber: obj.toUpperCase(),
      F_AirfieldId: this.data.en_city_data.F_Id
    };
    wx.request({
      url: app.path(1) + "/pdaapi/GetFlightMessage",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(da)}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify(da)
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code === 200) {
          console.log(JSON.parse(res.data.data))
          _this.setData({
            flight_number_list: JSON.parse(res.data.data),
            search_text: "搜索中"
          })
        } else {
          _this.setData({
            flight_number_list: [],
            search_text: "抱歉,没有相关航班号,请更换关键字"
          })
        };
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
  go_pay() {
    var _this = this;
    var d = this.data;
    var da = {
      head: {},
      OrderDetails: []
    };
    var p = /^1[345789]\d{9}$/;
    var n = /^([\u4e00-\u9fa5·s]{1,20}|[a-zA-Z.s]{2,20})$/;
    var h = /^[a-zA-Z0-9]{6}$/;
    var len = d.can_list.length;
    if (!d.en_city_data) {
      wx.showModal({
        title: '温馨提示',
        content: '请选择达到站'
      });
      return false;
    };
    if (!h.test(d.flight_number.F_FlightNumber)) {
      wx.showModal({
        title: '温馨提示',
        content: '请选择正确的航班号，通常是数字加字母组合6个字符'
      });
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
    if (!d.self_city && !d.backfill) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入收货地址'
      })
      return false;
    };
    if (!d.user_location) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入详细地址'
      });
      return false;
    };
    if (!len) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入托运单号'
      })
      return false;
    };
    da.head.F_AirfieldFloor = d.flight_number.F_AirfieldFloor; //航站楼
    da.head.F_AirfieldId = d.en_city_data.F_Id; //机场id
    da.head.F_AirfieldName = d.flight_number.F_AirfieldEnd; //机场名
    da.head.F_StartStation = d.flight_number.AddressBegin + d.flight_number.F_AirfieldBegin + d.flight_number.F_AirfieldFloorBegin; //起始站
    da.head.F_Longitude = d.user_location.lng; //收货地址坐标
    da.head.F_Latitude = d.user_location.lat; //收货地址坐标
    da.head.F_CustomerAddress = d.self_city; //收货地址
    da.head.F_CustomerName = d.name; //收货人姓名
    da.head.F_CustomerPhone = d.phone; //收货人手机
    da.head.F_FareName = d.name1; //寄件人姓名
    da.head.F_FarePhone = d.phone1; //寄件人手机
    da.head.F_CustomerRemarks = "";
    da.head.F_FlightCompany = d.flight_number.F_FlightCompany; //航空公司名
    da.head.F_FlightNumber = d.flight_number.F_FlightNumber; //航班号
    da.head.F_IsUrgent = "普通"; //寄件类型，默认普通
    da.head.F_OpenId = app.open("open").openId; //用户openid
    da.head.F_State = 0; //默认状态
    da.head.F_Stype = "港内配送"; //配送类别
    for (var i = 0; i < d.can_list.length; i++) {
      da.OrderDetails.push({
        F_ConsignmentNumber: d.can_list[i],
        F_Weight: 20.0,
        F_Distance: 100.0,
        F_Price: 10.0,
        F_Qty: 1
      });
    }; //托运单号
    console.log(da, d)
    console.log(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(da)}`);
    // return false;
    wx.showLoading({
      title: '提交中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/SubmitOrder",
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
          wx.hideLoading();
          _this.get_user_addr(app.open("open").openId);
          wx.navigateTo({
            url: '../pays/pays?OrdeNo=' + res.data.data.orderNo + '&totalFee=' + res.data.data.totalFee
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
    if (!obj || obj.length < 6) {
      this.setData({
        user_location: ''
      }); //搜索不到地址清除坐标
      return false;
    };
    var _this = this;
    qqmapsdk.geocoder({
      address: obj,
      success: function (res) {
        _this.setData({
          user_location: res.result.location
        });
        console.log(res.result.location)
      },
      fail: function (error) {
        console.error(error);
        _this.setData({
          user_location: ''
        }); //搜索不到地址清除坐标
      }
    })
  },
  go_help(event) {
    wx.navigateTo({
      url: '/pages/help/help?type=' + event.target.dataset.type,
    });
  },
  user_page() {
    var d = this.data;
    var p = /^1[345789]\d{9}$/;
    var n = /^([\u4e00-\u9fa5·]{2,20}|[a-zA-Z.]{2,20})$/;
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
    if (!d.self_city && !d.backfill) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入收货地址'
      })
      return false;
    };
    if (!d.page2) {
      wx.showModal({
        title: '温馨提示',
        content: '请同意委托服务协议条款'
      });
      return false;
    };
    if (!d.user_location) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入详细地址'
      });
      return false;
    };
    this.setData({
      self_city: d.self_city || d.backfill
    });
    console.log(d.self_city, '---', d.backfill)
    this.get_addr(this.data.self_city);
    this.go_pay();
    this.setData({
      page_index: 1,
      name: '',
      phone: '',
      name1: '',
      phone1: '',
      self_city: '',
      can_list: [],
      can_numbers: 0,
      city_data_index: 0,
      page1: false,
      page2: false,
      citty_data_list: [],
      flight_number: "", //航班号
      flight_number_list: [], //航班列表
      flight_number_type: 'flight_number_box', //显示搜索航班的框框
      en_city_data: '', //机场信息
      en_city_list: "", //机场列表
      en_city_list1: "", //机场列表
      en_city_type: "en_city_box", //机场class
    });
  },
  fly_page() {
    var d = this.data;
    var h = /^[a-zA-Z0-9]{6}$/;
    var len = d.can_list.length;
    console.log(d.en_city_data)
    if (!d.en_city_data) {
      wx.showModal({
        title: '温馨提示',
        content: '请选择到达站'
      });
      return false;
    };
    if (!h.test(d.flight_number.F_FlightNumber)) {
      wx.showModal({
        title: '温馨提示',
        content: '请选择正确的航班号，通常是数字加字母组合6个字符'
      });
      return false;
    };
    if (!len) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入托运单号'
      })
      return false;
    };
    if (!d.page1) {
      wx.showModal({
        title: '温馨提示',
        content: '请确保行李内无贵重、易碎、违禁物品'
      });
      return false;
    };
    this.setData({
      page_index: 3
    });
  },
  user_pre(e) {
    var type = e.target.dataset.type - 0;
    this.setData({
      page_index: type
    });
  },
  page1_fun() {
    var d = this.data.page1;
    this.setData({
      page1: !d
    })
  },
  page2_fun() {
    var d = this.data.page2;
    this.setData({
      page2: !d
    })
  },
  //数据回填方法
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        console.log(this.data.suggestion[i], 1111111);
        this.setData({
          backfill: this.data.suggestion[i].addr + "(" + this.data.suggestion[i].title+")",
          self_city: this.data.suggestion[i].addr + "(" + this.data.suggestion[i].title + ")",
          user_location: this.data.suggestion[i].latitude,
          suggestion: [],
        });
      }
    }
    var _this = this;
    setTimeout(function () {
      _this.setData({
        self_city: _this.data.backfill,
      });
      _this.get_addr(_this.data.backfill);
    }, 50);
  },
  //触发关键词输入提示事件
  getsuggest: function (e) {
    var _this = this;
    clearTimeout(_this.timers);
    if (!e.detail.value) {
      this.setData({
        suggestion: []
      });
      return;
    };
    _this.timers = setTimeout(() => {
      qqmapsdk.getSuggestion({
        keyword: e.detail.value,
        success: function (res) {
          console.log(res)
          var sug = [];
          if (res.data[0]) {
            _this.get_addr(res.data[0].address);
          };
          for (var i = 0; i < res.data.length; i++) {
            sug.push({
              title: res.data[i].title,
              id: res.data[i].id,
              addr: res.data[i].address,
              city: res.data[i].city,
              district: res.data[i].district,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng
            });
          }
           //设置suggestion属性，将关键词搜索结果以列表形式展示
          _this.setData({
            suggestion: sug,
            self_city: e.detail.value,
            backfill: e.detail.value
          });
        },
        fail: function (error) {
          console.error(error);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    }, 500)
  },
  get_user_addr(obj) {
    var _this = this;
    var da = {
      openId: obj
    };
    wx.request({
      url: app.path(1) + "/pdaapi/GetAddressById",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(da)}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify(da)
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.code === 200) {
          var d = ["请选择地址"];
          var addr = JSON.parse(res.data.data);
          for (var i = 0; i < addr.length; i++) {
            d.push(addr[i].F_Address)
          };
          _this.setData({
            citty_data_list: d,
            citty_data_data: addr
          })
        }
      }
    })
  },
  nexts(e) {
    var type = e.target.dataset.type - 0;
    var d = this.data;
    var p = /^1[345789]\d{9}$/;
    var n = /^([\u4e00-\u9fa5·]{2,20}|[a-zA-Z.]{2,20})$/;
    if (type === 2) {
      if (!n.test(d.name1)) {
        wx.showModal({
          title: '温馨提示',
          content: '请输入正确的姓名'
        });
        return false;
      };
      if (!p.test(d.phone1)) {
        wx.showModal({
          title: '温馨提示',
          content: '请输入正确的手机号码'
        });
        return false;
      };
      if (!d.page2) {
        wx.showModal({
          title: '温馨提示',
          content: '请同意委托服务协议条款'
        });
        return false;
      };
    };
    this.setData({
      page_index: type
    });
  },
  close_addr(e) {
    this.setData({
      suggestion: [],
      self_city: e.detail.value,
    });
    var d = this.data.backfill || this.data.self_city;
    this.get_addr(d);
    console.log(this.data.backfill, 1, '----', this.data.self_city, 2)
    var _this = this;
    setTimeout(function () {
      console.log(_this.user_location);
    }, 1500)
  }
})