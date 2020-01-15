// pages/order/list/list.js
import {
  $wuxSelect
} from '../../../dist/index'
import {
  $wuxCalendar
} from '../../../dist/index'
import {
  $wuxToast
} from '../../../dist/index'

var app = getApp();
var url = app.data.globalurl;
var qm_key = app.data.key;
var version = 1;
var zhanghao = wx.getStorageSync("zhanghao"); //操作人账号


var myDate = new Date(); //获取系统当前时间
var mytime = myDate.toLocaleString(); //获取当前时间
var str = mytime.trim().split(" ")[0];
var datastr = str.replace(/\//g, '-');


var md5 = require('../../../utils/md5.js'); // 引入md5.js文件


//全部订单
function Getorderlist(e) {
  wx.showLoading({ });
  var that = e;
  var data_jm = JSON.stringify({
    "status": ""
  });
  let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
  let miyao = md5(jm).toUpperCase();
  wx.request({
    method: "GET",
    url: url + '/pdaapi/GetOrderListByStatus',
    data: {
      "sign": miyao,
      "version": 1,
      data: data_jm
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      // console.log(res)
      if (res.statusCode == 200) {
        if (res.data.code == 200) {
          wx.hideLoading()
          var dtr = res.data.data;
          var json_data = JSON.parse(dtr);
          console.log(json_data)

          var statearr = [];//保存状态的数组
         
          for (var i = 0; i < json_data.length; i++) {
            var time = json_data[i].DateTimeEnd;//航班到达时间
            var plan = time.split(' ')[1];
            var t1 = plan.substr(0, 5);
            json_data[i].time = t1;//更新时间

            //订单状态为未分拣的情况下的所有行李号和订单号
            if (json_data[i].F_State == 1) {
              var al_wfj = that.data.abnormal_orderno;
              al_wfj.push(json_data[i].F_OrderNo);
              var al_xlh = json_data[i].CNumberList;//未分拣的订单号
              for (var a = 0; a < al_xlh.length; a++) {
                var al_xll = that.data.notsorxlh;//未分拣的行李号
                al_xll.push(al_xlh[a].F_ConsignmentNumber)
                that.setData({
                  abnormal_orderno: al_wfj,
                  notsorxlh: al_xll
                })
              } 
            }
            statearr.push(json_data[i].F_State);

            
            //更新订单列表数据
            that.setData({
              orderlist: json_data, //全部订单列表数据
            })
          }

          if (statearr.indexOf("1") == -1) {
            that.setData({
              hid1: false,
            })
          }

          if (statearr.indexOf("2") == -1) {
            that.setData({
              hid2: false,
            })
          }

          if (statearr.indexOf("4") == -1) {
            that.setData({
              hid4: false,
            })
          }

          if (statearr.indexOf("5") == -1) {
            that.setData({
              hid5: false,
            })
          }

          if (statearr.indexOf("41") == -1) {
            that.setData({
              hid41: false,
            })
          }

        } else{
          wx.hideLoading()
         
        }
       
        if (that.data.orderlist.length == 0) {
          that.setData({
            orderlistnull: false,
            flightlist: ['选择航班'],
            hidshown:false
          })
        } else {
          that.setData({
            orderlistnull: true,
            hidshown: true
          })
        }
      }
    },
  })
}





//获取航班信息
function Getflight(e) {
  var that = e;

}

Page({
  data: {
    hidshown:true,
    clientHeight:0,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    orderlist: [], //全部订单列表数据
    notsorting: [], //未分拣订单列表数据
    thesorting: [], //分拣中订单列表数据
    intransit: [], //运输中订单列表数据
    finsh: [], //已完成订单列表数据
    abnormal: [], //异常订单列表数据
    hid1:true,
    hid2: true,
    hid4: true,
    hid5: true,
    hid41: true,
    flightlist: [], //获取航班列表
    nickName: "",
    avatarUrl: "",
    userName: '',
    mobile: '',
    Gender: 'female',
    casIndex: 0,
    hangban: "", //航班号
    date: "2016-09-01",//日期
    bgColor: "#fff", //样式开始默认颜色
    abnormal_orderno: [], //未分拣状态的所有订单号
    notsorxlh: [],//未分拣中的所有行李号
    ConsignmentNumber: [], //未分拣状态下的所有行李号
    hidd: true,
    datetimeend:[],//航班到达时间
    select_all: false,
    batchIds: '',    //选中的ids
    notorder:''


  },
 
  //拨打电话
  call_tel(e) {
    var phone = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function () {
        // console.log("拨打电话成功！")
      },
      fail: function () {
        // console.log("拨打电话失败！")
      }
    })
  },
  bindDateChange(e) {
    let {
      value
    } = e.detail;


    this.setData({
      date: value
    })
  },

  //航班列表选择
  bindCasPickerChange(e) {
    var that = this;

    // 数据加密
    var tr_jm = JSON.stringify({
      "FlightNumber": "",
    });

    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
    let md5_jm = md5(jm).toUpperCase();
    wx.request({
      method: "get",
      url: url + '/pdaapi/SerGetFlightList',
      data: {
        "sign": md5_jm,
        "version": 1,
        "data": tr_jm
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        // console.log(res)
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            var dtr = res.data.data;
            var json_data = JSON.parse(dtr);
            // console.log(json_data);
          }

        }
      },
    })

    if (e.detail.value == 4) {
      this.setData({
        reply: true
      })
    } else {
      this.setData({
        reply: false
      })
    }

    this.setData({
      casIndex: e.detail.value
    })

    //选择的航班信息
    var hangban = that.data.flightlist[e.detail.value];

    that.setData({
      hangban: hangban
    })

  },
  //按时间/航班号查询订单
  searlist(e) {
    var that = this;
    var dataing = new Date(datastr).getTime();  //当前今天的日期
    var datebefore = new Date(that.data.date).getTime(); //今天之前的日期

    // 数据加密
    var tr_jm = JSON.stringify({
      "FlightNumber": that.data.hangban,
      "OrderDate": that.data.date
    });
    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
    let md5_jm = md5(jm).toUpperCase();
    wx.request({
      method: "get",
      url: url + '/pdaapi/ReasonNoMessage',
      data: {
        "sign": md5_jm,
        "version": 1,
        "data": tr_jm
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            // wx.hideLoading();
            var dtr = res.data.data;
            var json_data = JSON.parse(dtr);
            console.log(json_data);

            var cxdingdan = [];//存储查询到的订单状态数组

            for (var i = 0; i < json_data.length; i++) {
              if (json_data[i].F_State == 1 || json_data[i].F_State == 2 || json_data[i].F_State == 3 || json_data[i].F_State == 4 || json_data[i].F_State == 5 || json_data[i].F_State == 41) {

                var time = json_data[i].DateTimeEnd;//航班到达时间
                var plan = time.split(' ')[1];
                var t1 = plan.substr(0, 5);
                json_data[i].time = t1;//更新时间

                //更新订单列表数据
                that.setData({
                  orderlist: json_data
                })
                
                that.setData({
                  orderlist: json_data, //全部订单列表数据
                })
              //向cxdingdan中添加查询到的订单状态
                cxdingdan.push(json_data[i].F_State)

              }

            }
            console.log(cxdingdan)
            if (cxdingdan.indexOf("1") == -1) {
              that.setData({
                hid1: false,
              })
            }

            if (cxdingdan.indexOf("2") == -1) {
              that.setData({
                hid2: false,
              })
            }

            if (cxdingdan.indexOf("4") == -1) {
              that.setData({
                hid4: false,
              })
            }

            if (cxdingdan.indexOf("5") == -1) {
              that.setData({
                hid5: false,
              })
            }

            if (cxdingdan.indexOf("41") == -1) {
              that.setData({
                hid41: false,
              })
            }
          } else if (res.data.code == 400) {
            var datast = str.replace(/\//g, '-');

            that.setData({
              date: datast
            })
            wx.showModal({
              title: '提示',
              content: '查询的日期没有订单记录！',
            })

        
          }

        }
      },
    })
  },

  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  swiperchange: function(e) {
    var that = this;
    that.setData({
      'currentTab': e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;


    //数据加密
    var data_jm = JSON.stringify({
      "FlightNumber": ""
    });
    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
    let miyao = md5(jm).toUpperCase();

    //请求数据
    wx.request({
      method: "GET",
      url: url + '/pdaapi/SerGetFlightList',
      data: {
        "sign": miyao,
        "version": 1,
        data: data_jm
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            var dtr = res.data.data;
            var json_data = JSON.parse(dtr);
            var arr = [];
            var arr2 = [];

            for (var i = 0; i < json_data.length; i++) {
              var hangbanhao = json_data[i].F_FlightNumber;
              var hangbanhao2 = json_data[0].F_FlightNumber;
              arr.push(hangbanhao)
              arr2.push(hangbanhao)
              if (that.data.flightlist != "") {
                that.setData({
                  flightlist: arr
                })
              } else {
                that.setData({
                  flightlist: arr2,
                  hangban: arr2[0]
                })
              }
            }
          } 
        }
      }
    });
 
    var datast = str.replace(/\//g, '-');

    that.setData({
      date: datast
    })

    if (that.data.orderlist.length == 0 && that.data.notsorting.length == 0 && that.data.thesorting.length == 0 && that.data.intransit.length == 0 && that.data.finsh.length == 0 && that.data.abnormal.length == 0) {
        that.setData({
          hidshown:true
        })
    } else {
      that.setData({
        hidshown: false
      })
    }

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          clientHeight: res.windowHeight
        });
      }

    });

  },
  //批量操作分拣中
  allfenjianzhong() {
    var that = this;
    // 数据加密
    var tr_jm = JSON.stringify({
      "status": "2",
      "OrderNo": that.data.abnormal_orderno,
      "ConsignmentNumber": that.data.notsorxlh,
      "Operator": zhanghao
    });
    console.log(tr_jm)
    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
    let md5_jm = md5(jm).toUpperCase();
    wx.showModal({
      title: '提示',
      content: '确定要全部修改订单状态为【分拣中】？',
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        //确定
        if (res.confirm) {
          //请求数据
          wx.request({
            method: "post",
            url: url + '/pdaapi/UpdateBatchOrderStatus',
            data: {
              "sign": md5_jm,
              "version": 1,
              "data": tr_jm
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res)
              if (res.statusCode == 200) {
                if (res.data.code == 200) {
                  //更新数据

                  that.setData({
                    orderlistnull: [],//更新数据
                    hid2:true
                  })

                  Getorderlist(that); //全部订单数据
              
                  wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 2000
                  });
                } else {
                  wx.showToast({
                    title: res.data.info,
                    icon:"none",
                    duration: 2000
                  })
                }

              }
            },
          })
        }
      }
    });

  },


  //点击跳到订单详情
  go_detail(e) {
    wx.showLoading({
      title: '正在加载',
    })
    //获取行李号
    var luggage = e.currentTarget.dataset.item;
    var ddh = e.currentTarget.dataset.ddh;
    // 带参数跳转详情页面
    wx.navigateTo({
      url: '/pages/order/detail/detail?luggagestr=' + luggage + "&ddhnum=" + ddh
    })
    wx.hideLoading()
  },


  /**
   * 滑动切换tab
   */
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  /**
   * 点击tab切换
   */
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onChange(e) {
    this.setData({
      current: e.detail.key,
    })
  },
  onTabsChange(e) {
    const {
      key
    } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;

    Getorderlist(that); //全部订单数据

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
    // var that = this;

    // Getorderlist(that); //全部订单数据

    // setTimeout(function (e) {
    //   wx.stopPullDownRefresh(); //停止下拉刷新
    // }, 2000);
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