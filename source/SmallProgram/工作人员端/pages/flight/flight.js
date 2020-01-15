// pages/flight/flight.js
var app = getApp();
var url = app.data.globalurl;
var qm_key = app.data.key;
var version = app.data.version;

var md5 = require('../../utils/md5.js') // 引入md5.js文件

var zhanghao = wx.getStorageSync("zhanghao"); //操作人账号



function Getflight(e) {
  var that = e;
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
    success: function(res) {
      // console.log(res)
      if (res.statusCode == 200) {
        if (res.data.code == 200) {
          // wx.hideLoading();
          var dtr = res.data.data;
          var json_data = JSON.parse(dtr);
          // console.log(json_data)
          for (var i = 0; i < json_data.length; i++) {
            var plan = json_data[i].DateTimeEndReality.split(' ')[1];
            var t1 = plan.substr(0, 5);
            var reality = json_data[i].DateTimeEnd.split(' ')[1];
            var t2 = reality.substr(0, 5);
            json_data[i].time1 = t1; //计划到达时间
            json_data[i].time2 = t2; //实际到达时间
            that.setData({
              Hbanjiwei: json_data[i].F_Placement,//航班机位
              Fenjiankou: json_data[i].F_ConveyorNumber,//分拣口
            })
          }
          //如果没有航班信息
          if (json_data == '') {
            that.setData({
              shownlist: false
            })
          } else {
            //更新航班数据
            that.setData({
              flightlist: json_data,
              searchlist: json_data
            })
          }
        } else {
          that.setData({
            shownlist: false
          })
        }

      }
    }

  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    flightlist: [], //航班数据
    shownlist: true, //显示航班列表
    lists: [], // 接收搜索的内容
    wxSearchData: '', // 输入的值
    searchlist: [], //查询到的航班列表
    hiddenmodalput: true,
    hiddenmodalput2:true,
    jiwei: "",//航班机位 
    flightnumber:'',//航班号
    jcid:'',//机场id
    fenjiankou: "",//分拣口

  },
  //修改航班机位
  amend_hbjw(e) {
    //航班号
    var hbh = e.currentTarget.dataset.fit_num;
    //机场id
    var id = e.currentTarget.dataset.id;
    this.setData({
      hiddenmodalput: false,
      flightnumber: hbh,
      jcid:id,
    })
  },
  //修改的值
  iName: function (e) {
    this.setData({
      jiwei: e.detail.value
    })
  },
  //取消
  cancelM: function(e) {
    this.setData({
      hiddenmodalput: true,
    })
  },
  //提交
  confirmM: function(e) {
    var that = this;
    //航班机位
     // 数据加密
     var tr_jm = JSON.stringify({
       "F_AirfieldId": that.data.jcid,//机场id
       "F_FlightNumber": that.data.flightnumber,//航班号
       "F_ConveyorNumber": "",//分拣口
       "F_Placement": that.data.jiwei,//机位
       "Operator": zhanghao,//操作人
     });

     let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
     let md5_jm = md5(jm).toUpperCase();
     wx.request({
       method: "get",
       url: url + '/pdaapi/ModifyFlightInfo',
       data: {
         "sign": md5_jm,
         "version": 1,
         "data": tr_jm
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
        //  console.log(res)
         if (res.statusCode == 200) {
           that.setData({
             hiddenmodalput: true,
           })
           if (res.data.code == 200) {
             that.setData({
               jiwei: ''
             })
            //  console.log(that.data.jiwei)
             Getflight(that);
             wx.showToast({
               title: '修改成功',
               icon: 'success',
               duration: 2000
             });
             
           } else if (res.data.code == 400) {
             that.setData({
               jiwei: ''
             })
             wx.showToast({
               title: '没有数据要修改！',
               icon: "none",
               duration: 2000
             });
            
           }
         }
       },
     }) 
  },
 

  //修改航班机位
  amend_fjk(e) {
    //航班号
    var hbh = e.currentTarget.dataset.fit_num;
    //机场id
    var id = e.currentTarget.dataset.id;
    this.setData({
      hiddenmodalput2: false,
      flightnumber: hbh,
      jcid: id,
    })
  },
  //修改的值
  iName2: function (e) {
    this.setData({
      fenjiankou: e.detail.value
    })
  },
  //取消
  cancelM2: function (e) {
    this.setData({
      hiddenmodalput2: true,
    })
  },
  //提交
  confirmM2: function (e) {
    var that = this;
    //航班机位

    // 数据加密
    var tr_jm = JSON.stringify({
      "F_AirfieldId": that.data.jcid,//机场id
      "F_FlightNumber": that.data.flightnumber,//航班号
      "F_ConveyorNumber": that.data.fenjiankou,//分拣口
      "F_Placement": that.data.jiwei,//机位
      "Operator": zhanghao,//操作人
    });
    // console.log(tr_jm)
    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
    let md5_jm = md5(jm).toUpperCase();
    wx.request({
      method: "get",
      url: url + '/pdaapi/ModifyFlightInfo',
      data: {
        "sign": md5_jm,
        "version": 1,
        "data": tr_jm
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            hiddenmodalput2: true,
          })
          if (res.data.code == 200) {

            that.setData({
              fenjiankou: ''
            })

            Getflight(that);
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 3000
            });

          } else if (res.data.code == 400) {
            that.setData({
              fenjiankou: ''
            })
            wx.showToast({
              title: '没有数据要修改！',
              icon: "none",
              duration: 2000
            });
          }
        }
      },
    })
  },
 

  
  //搜索
  searchbtn: function(e) {
    var that = this;
    //获取搜索框内容
    var search_Val = that.data.inputVal;
    if (search_Val != '') {
      //如果是输入航班号查询
      if (/^[a-z,A-Z]/.test(search_Val) && search_Val.length == 6) {
        //数据加密
        var data_jm = JSON.stringify({
          "FlightNumber": search_Val
        });
        let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
        let miyao = md5(jm).toUpperCase();
        if (search_Val.length > 0 && search_Val.length == 6) {
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
            success: function(res) {
              if (res.statusCode == 200) {
                if (res.data.code == 200) {
                  var dtr = res.data.data;
                  var json_data = JSON.parse(dtr);
                  // console.log(json_data)
                  that.setData({
                    flightlist: json_data,
                  })
                  // Getflight(that);
                }
              }
            },
          })
        }
      } else if (/^[0-9]/.test(search_Val)) {
        //输入行李号查询跳到详情页
        if (search_Val.length == 6) {
          Getflight(that);
          wx.navigateTo({
            url: '/pages/order/detail/detail?luggagestr=' + search_Val,
          })
          //如果是输入手机号进入订单详情
        } else if ((search_Val.length == 11)) {

          Getflight(that);
          wx.navigateTo({
            url: '/pages/order/telorder/telorder?phonestr=' + search_Val,
          })

        } else if ((search_Val.length < 6)) {
          wx.showModal({
            content: '请输入正确的行李号！',
            showCancel: false,
          });
        } else if ((search_Val.length < 11)) {
          wx.showModal({
            content: '请输入正确的手机号！',
            showCancel: false,
          });
        } else if ((search_Val.length > 11)) {
          wx.showModal({
            content: '请输入正确的手机号！',
            showCancel: false,
          });
        }
      } else if (/^[a-z,A-Z]/.test(search_Val) && search_Val.length == 15) {
        Getflight(that);
        wx.navigateTo({
          url: '/pages/order/detail/detail?ddhnum=' + search_Val,
        })
      } else if (/^[a-z,A-Z]/.test(search_Val) && search_Val.length < 6) {
        wx.showModal({
          content: '请输入正确的航班号！',
          showCancel: false,
        });
      } else if (/^[a-z,A-Z]/.test(search_Val) && search_Val.length > 6 && search_Val.length < 15) {
        wx.showModal({
          content: '请输入正确的行李号！',
          showCancel: false,
        });
      }
    }

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  clearInput: function(e) {
    var that = this;
    Getflight(that);
    this.setData({
      inputVal: ""
    });
  },
  //搜索框内容
  inputTyping: function(e) {
    var that = this;
    //输入框内容
    var input_val = e.detail.value;
    //更新输入框内容
    that.setData({
      inputVal: input_val
    });
  },
  //调到航班详情
  go_fightdetail(e) {
    var hbh = e.currentTarget.dataset.hbh;
    var xls = e.currentTarget.dataset.xls;
    var dds = e.currentTarget.dataset.dds;

    wx.navigateTo({
      url: "/pages/flight/flightdetail/fightdetail?hanghanhao=" + hbh + "&xinglishu=" + xls + "&dingdanshu=" + dds
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    Getflight(that);

    var search_Val = that.data.inputVal;

    // console.log(search_Val.length)

    if (search_Val.length != 6) {
      Getflight(that);
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
    var that = this;



    that.onLoad();
    Getflight(that);


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
    var that = this;
    Getflight(that); //全部航班数据

    setTimeout(function(e) {
      wx.stopPullDownRefresh(); //停止下拉刷新
    }, 1000);


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