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
    multiArray: [
      ['请选择始发站', '广东', '福建'],
      [],
    ],
    multiIndex: [0, 0],
    multiArray1: [
      ['请选择到达站'],
      [],
    ], //机场显示数据
    multiIndex1: [0, 0], //机场下标
    last_city: '', //机场数据
    city_num: ['请先选择到达站'], //航班号
    num_index: 0, //航班号下标
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
    openid: '', //用户信息
    user_location: '', //用户选择地址
    page1: false, //违禁物品
    page2: false, //委托协议
    page_index: 1, //1寄件人 2航班与行李 3收件人
    suggestion: [], //地址列表
    backfill: '', //选择索引地址
    city_num_hend: false, //航班号手动输入
    city_num_hend_value: "", //手动输入的航班号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    // 获取用户信息
    wx.getStorage({
      key: 'open',
      success(res) {
        var d = JSON.parse(res.data);
        _this.setData({
          openid: d.openId
        });
        _this.get_user_addr(d.openId);
      }
    });
  },
  onShow: function() {
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
          var d = JSON.parse(res.data.data);
          var last_city = [
            ["请选择到达站"],
            []
          ];
          for (var i = 0; i < d.length; i++) {
            last_city[0].push(d[i].F_AirfieldName);
          };
          _this.setData({
            last_city: d,
            multiArray1: last_city,
            multiIndex1: [0, 0]
          });
        };
      }
    })
  },
  onShareAppMessage: function() {

  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    });
  },
  bindMultiPickerColumnChange: function(e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    var obj = [];
    var _this = this;

    if (e.detail.value === 1) {
      obj = ["广州", "深圳"];
    } else if (e.detail.value === 2) {
      obj = ["厦门"];
    } else {
      obj = [];
    };
    picks(obj);

    function picks(obj) {
      var data = {
        multiArray: _this.data.multiArray,
        multiIndex: _this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;

      if (e.detail.column === 0) {
        if (data.multiIndex[0] === e.detail.value) {
          data.multiArray[1] = obj;
        };
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
      };
      _this.setData(data);
    }
  },
  bindMultiPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    });
    this.end_citty(this.data.last_city[e.detail.value[0] - 1].F_Id);
  },
  bindMultiPickerColumnChange1: function(e) {
    var _this = this;
    var F_AirfieldId = {
      F_AirfieldId: this.data.last_city[e.detail.value - 1] ? this.data.last_city[e.detail.value - 1].F_Id : false
    };
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/GetFlightFloorById",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify(F_AirfieldId)}`).toUpperCase(),
        version: app.path(3),
        data: JSON.stringify(F_AirfieldId)
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        var d = F_AirfieldId.F_AirfieldId === false ? res.data.data : JSON.parse(res.data.data);
        if (res.data.code === 200) {
          var d_arr = [];
          for (var i = 0; i < d.length; i++) {
            d_arr.push(d[i].F_ExpressCompanyName);
          };
          picks(d_arr);
        } else {
          picks([]);
        };
        if (_this.data.last_city[e.detail.value - 1]) {
          _this.end_citty(_this.data.last_city[e.detail.value - 1].F_Id);
        } else {
          _this.end_citty(false);
        };
      }
    });

    function picks(obj) {
      var data = {
        multiArray1: _this.data.multiArray1,
        multiIndex1: _this.data.multiIndex1
      };
      data.multiIndex1[e.detail.column] = e.detail.value;

      if (e.detail.column === 0) {
        if (data.multiIndex1[0] === e.detail.value) {
          data.multiArray1[1] = obj;
        };
        data.multiIndex1[1] = 0;
        data.multiIndex1[2] = 0;
      };
      _this.setData(data);
    }
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
  //获取航班号
  end_citty(obj) {
    if (!obj) {
      this.setData({
        city_num: ['请选择航班号'],
        en_data: [],
        num_index: 0
      });
      return false;
    };
    var _this = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.path(1) + "/pdaapi/GetFlightNoInfo",
      data: {
        sign: md5(`version=${app.path(3)}&key=${app.path(2)}&data=${JSON.stringify({ F_AirfieldId: obj})}`).toUpperCase(),
        version: app.path(3),
        data: {
          F_AirfieldId: obj
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
  go_pay() {
    var _this = this;
    var d = this.data;
    var da = {
      head: {},
      OrderDetails: []
    };
    var p = /^1[345789]\d{9}$/;
    var n = /^[\u4e00-\u9fa5]{2,4}$/;
    var h = /^[a-zA-Z0-9]{6}$/;
    var len = d.can_list.length;
    if (d.multiArray[0][d.multiIndex[0]] === "请选择始发站") {
      wx.showModal({
        title: '温馨提示',
        content: '请选择始发站'
      })
      return false;
    };
    if (d.multiArray1[0][d.multiIndex1[0]] === "请选择到达站") {
      wx.showModal({
        title: '温馨提示',
        content: '请选择到达站'
      })
      return false;
    };
    if (!d.city_num_hend_value) {
      if (d.city_num[d.num_index] === "请选择航班号" || d.city_num[0] === "请先选择到达站") {
        wx.showModal({
          title: '温馨提示',
          content: '请选择航班号'
        })
        return false;
      };
    };
    if (!h.test(d.city_num_hend_value) && d.city_num_hend_value) {
      wx.showModal({
        title: '温馨提示',
        content: '请填写正确的航班号，通常是6位数字加字母组合'
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
    da.head.F_AirfieldFloor = d.multiArray1[1][d.multiIndex1[1]]; //航站楼
    da.head.F_AirfieldId = d.last_city[d.multiIndex1[0] - 1].F_Id; //机场id
    da.head.F_AirfieldName = d.last_city[d.multiIndex1[0] - 1].F_AirfieldName; //机场名
    da.head.F_StartStation = d.multiArray[0][d.multiIndex[0]] + d.multiArray[1][d.multiIndex[1]]; //起始站
    da.head.F_Longitude = d.user_location.lng; //收货地址坐标
    da.head.F_Latitude = d.user_location.lat; //收货地址坐标
    da.head.F_CustomerAddress = d.self_city; //收货地址
    da.head.F_CustomerName = d.name; //收货人姓名
    da.head.F_CustomerPhone = d.phone; //收货人手机
    da.head.F_FareName = d.name1; //寄件人姓名
    da.head.F_FarePhone = d.phone1; //寄件人手机
    da.head.F_CustomerRemarks = "";
    da.head.F_FlightCompany = d.num_index - 0 === 1 ? d.en_data[d.num_index - 0].F_FlightCompany : d.en_data[d.num_index - 1].F_FlightCompany; //航空公司名
    da.head.F_FlightNumber = d.city_num_hend ? d.city_num_hend_value : d.city_num[d.num_index]; //航班号
    da.head.F_IsUrgent = "普通"; //寄件类型，默认普通
    da.head.F_OpenId = d.openid; //用户openid
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
          _this.get_user_addr(d.openid);
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
    if (!obj || obj.length < 4) {
      return false;
    };
    var _this = this;
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      deviation: 10,
      address: obj, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function(res) { //成功后的回调
        _this.setData({
          user_location: res.result.location
        });
        console.log(res.result.location)
      },
      fail: function(error) {
        console.error(error);
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
    var n = /^[\u4e00-\u9fa5]{2,4}$/;
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
    this.go_pay();
    this.setData({
      page_index: 1,
      name: '',
      phone: '',
      name1: '',
      phone1: '',
      self_city: '',
      can_list: [],
      index: 0,
      num_index: 0, //航班号下标
      can_numbers: 0,
      city_data_index: 0,
      page1: false,
      page2: false,
      citty_data_list: [],
      city_num_hend_value: '',
      city_num_hend: false,
      multiArray: [
        ['请选择始发站', '广东', '福建'],
        [],
      ],
      multiIndex: [0, 0],
      multiArray1: [
        ['请选择到达站'],
        [],
      ], //机场显示数据
      multiIndex1: [0, 0], //机场下标
      last_city: '', //机场数据
    });
  },
  fly_page() {
    var d = this.data;
    var h = /^[a-zA-Z0-9]{6}$/;
    var len = d.can_list.length;
    var first_city = d.multiArray[0][d.multiIndex[0]]; //始发站
    var last_city = d.multiArray1[0][d.multiIndex1[0]]; //到达站
    if (first_city === "请选择始发站") {
      wx.showModal({
        title: '温馨提示',
        content: '请选择始发站'
      })
      return false;
    };
    if (last_city === "请选择到达站") {
      wx.showModal({
        title: '温馨提示',
        content: '请选择到达站'
      })
      return false;
    };
    if (!d.city_num_hend_value) {
      if (d.city_num[d.num_index] === "请选择航班号" || d.city_num[0] === "请先选择到达站") {
        wx.showModal({
          title: '温馨提示',
          content: '请选择航班号'
        })
        return false;
      };
    };
    if (!h.test(d.city_num_hend_value) && d.city_num_hend_value) {
      wx.showModal({
        title: '温馨提示',
        content: '请填写正确的航班号，通常是6位数字加字母组合'
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
  backfill: function(e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        console.log(this.data.suggestion[i]);
        this.setData({
          backfill: this.data.suggestion[i].addr,
          self_city: this.data.suggestion[i].addr,
          user_location: this.data.suggestion[i].latitude,
          suggestion: [],
        });
      }
    }
  },
  //触发关键词输入提示事件
  getsuggest: function(e) {
    if (!e.detail.value) {
      this.setData({
        suggestion: []
      });
      return false;
    };
    var _this = this;
    qqmapsdk.getSuggestion({
      keyword: e.detail.value,
      success: function(res) {
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
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
          self_city: e.detail.value,
          backfill: e.detail.value
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
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
    var n = /^[\u4e00-\u9fa5]{2,4}$/;
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
      backfill:e.detail.value
    });
    var d = this.data.backfill || this.data.self_city;
    this.get_addr(d);
    console.log(this.data.backfill,1,'----', this.data.self_city,2)
    var _this = this;
    setTimeout(function(){
      console.log(_this.user_location);
    },1500)
  },
  city_num_hends() {
    var d = !this.data.city_num_hend;
    this.setData({
      city_num_hend: d
    })
  },
  city_num_hends_val(e) {
    this.setData({
      city_num_hend_value: e.detail.value
    })
  }
})