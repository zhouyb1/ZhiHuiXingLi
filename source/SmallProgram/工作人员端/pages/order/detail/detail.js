// pages/order/detail/detail.js
import {
  $wuxSelect
} from '../../../dist/index';

var app = getApp();
var url = app.data.globalurl;
var qm_key = app.data.key;
var version = 1;
var zhanghao = wx.getStorageSync("zhanghao"); //操作人账号
var md5 = require('../../../utils/md5.js') // 引入md5.js文件

//全部订单
function Orderdatial(e) {
    var that = e;
    var xlhnum = app.globalData.xlhnumber; //行李号
    var ddhnumber = app.globalData.ordernumber; //订单号

    if (ddhnumber != undefined) {
      //数据加密
      var data_jm = JSON.stringify({
        "ConsignmentNumber": "",
        "OrderNo": ddhnumber,
        "CustPhone": ""
      });

      let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
      let miyao = md5(jm).toUpperCase();
      //请求数据
      wx.request({
        method: "GET",
        url: url + '/pdaapi/SerGetOrderDetailByNo',
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
              // console.log(json_data)
              var arr = []; //存放订单状态为3已完成的行李号
              var xlhstr = '';
              var onexlh = [];//存放只有一条行李号
              var xlarr = [];//存放订单行李号数组
              var statuall = [];//存放行李号的状态
              var kdarrxlh = [];//存放快递信息中的行李号数组

              for (var i = 0; i < json_data.length; i++) {
                var dd_stat = json_data[i].F_State;
                //循环行李号
                for (var j = 0; j < json_data[i].CNumberList.length; j++) {

                  xlarr.push(json_data[i].CNumberList[j].F_ConsignmentNumber);

                  //快递信息中的行李号转为字符串
                  var Kd = json_data[i].ExpressNoList;
                  for (var k = 0; k < Kd.length; k++) {
                    if (xlarr = Kd[k].F_ConsignmentNumber) {
                      that.setData({
                        istrue: false,
                        kdtext:"快递信息已填写",
                        finshxlh: xlarr
                      })
                    } 

                    //去重行李号
                    var temp = []; //一个新的临时数组
                    for (var p = 0; p < Kd[k].F_ConsignmentNumber.length; p++) {
                      if (temp.indexOf(Kd[k].F_ConsignmentNumber[p]) == -1) {
                        temp.push(Kd[k].F_ConsignmentNumber[p]);
                      }
                    }
                    Kd[k].F_ConsignmentNumber = temp;
                    kdarrxlh = Kd[k].F_ConsignmentNumber;
                    Kd[k].F_ConsignmentNumber == Kd[k].F_ConsignmentNumber.join(",");
                   
                  }
                 
                  //如果只有一条行李号
                  if (json_data[i].CNumberList.length == 1) {
                    onexlh.push(json_data[i].CNumberList[j].F_ConsignmentNumber)
                    that.setData({
                      finshxlh: onexlh,
                    })

                    //只有一条行李号，默认选中
                    if (json_data[i].CNumberList[j].FB_State == 1 || json_data[i].CNumberList[j].FB_State == 2 || json_data[i].CNumberList[j].FB_State == 3 || json_data[i].CNumberList[j].FB_State == 4) {
                      that.setData({
                        checked: true
                      })
                    }

                    if (json_data[i].CNumberList[j].FB_State == 5 || json_data[i].CNumberList[j].FB_State == 41) {
                      that.setData({
                        checked: false
                      })
                    }

                    //一个行李号中异常订单下的异常行李号不显示快递信息
                    if (json_data[i].CNumberList[j].FB_State == 41 || json_data[i].CNumberList[j].FB_State == 41) {
                      that.setData({
                        express_information: true,
                        hiddenyichang:false
                      })
                    }

                    //判断在正常单下正常运输的行李号
                    if (json_data[i].CNumberList[j].FB_State.indexOf(5) == 0) {
                      that.setData({
                        express_information:false,
                      })
                    }

                    if (dd_stat == "5") {
                      that.setData({
                        checked: false,
                        express_information:false,
                      })
                    }

                    //判断在异常单下正常运输的行李号
                    if (json_data[i].CNumberList[j].FB_State.indexOf(4) == 0) {
                      that.setData({
                        isyunsuing: true,
                        checked: false,
                      })
                    }

                    //如果行李状态是分拣完成
                    if (json_data[i].CNumberList[j].FB_State == 3) {
                      arr.push(json_data[i].CNumberList[j].F_ConsignmentNumber)
                      that.setData({
                        finshxlh: arr,
                        express_information: false,
                        hiddenyichang:true
                      })
                    }

                    //如果行李状态是运输中
                    if (json_data[i].CNumberList[j].FB_State == 4) {
                      that.setData({
                        isyunsuing: false,
                        express_information: false,
                        hiddenyichang: true

                      })
                    }

                    if (json_data[i].CNumberList[j].FB_State == 5) {
                      that.setData({
                        express_information: false,
                        hiddenyichang: true,
                      })
                    }

                    if (json_data[i].CNumberList[j].FB_State == 41) {
                      that.setData({
                        hiddenyichang: false,
                      })
                    }

                    //如果是多条行李号
                  } else if (json_data[i].CNumberList.length > 0) {
                    //如果多条行李号
                    if (json_data[i].CNumberList[j].FB_State.indexOf(41) != -1) {
                      that.setData({
                        xlhstatus: 41,
                      })
                    }

                    //如果是在异常订单下正常的行李号状态
                    if (json_data[i].F_State == 41) {
                     
                      statuall.push(json_data[i].CNumberList[j].FB_State)

                      that.setData({
                        hiddenyichang: false,

                      })


                      //如果异常订单中有行李号为异常的有行李号为已分拣的情况下
                      if (statuall.indexOf("3") != -1  && statuall.indexOf("41") != -1) {
                        that.setData({
                          hiddenyichang: true,
                          finshxlh: arr,
                          yunshuing: false
                         
                        })
                      }

                      if (statuall.indexOf("3") != -1) {
                        that.setData({
                          kdtext: "请填写快递信息",
                        })
                      }


                      //如果异常订单有一个行李号运输中有行李号还是异常
                      if (statuall.indexOf("4") != -1 && statuall.indexOf("41") != -1) {
                        that.setData({
                          hiddenyichang: true,
                          express_information:false,
                          isyunsuing:false,
                          yunshuing:true
                        })
                      }

                      if (statuall.indexOf("4") != -1 && statuall.indexOf("3") != -1) {
                       
                        that.setData({
                          hiddenyichang: true,
                          express_information: false,
                          isyunsuing: false,

                        })
                      }

                      if (json_data[i].CNumberList[j].FB_State.indexOf(2) != -1) {
                        that.setData({
                          xlhstatus: 2,
                        })
                      }

                      if (json_data[i].CNumberList[j].FB_State.indexOf(3) != -1) {
                        that.setData({
                          xlhstatus: 3,
                          isyunsuing:true,
                        })
                      }

                    } else {
                      that.setData({
                        hiddenyichang: true
                      })
                    }

                    if (dd_stat == 5) {
                      that.setData({
                        isyunsuing: true,
                        express_information:false
                      })
                    }

                    //如果在异常的订单中行李号中有一个是分拣完成状态，继续走快递
                    if (dd_stat == 41) {
                     
                      //如果行李状态中存在分拣完成的状态显示填写快递信息
                      if (dd_stat == 41 && json_data[i].CNumberList[j].FB_State.indexOf(3) != -1) {
                        that.setData({
                          express_information: false,
       

                        })
                      }

                      //只要有行李号是运输中或已完成的状态
                      if (json_data[i].CNumberList[j].FB_State == 4 || json_data[i].CNumberList[j].FB_State == 5) {
                        that.setData({
                          isyunsuing: false,
                          express_information: false
                          

                        })
                      }

                      if (json_data[i].CNumberList[j].FB_State.indexOf(3) != -1) {
                        that.setData({
                          express_information: false,

                        })
                      }

                    }

                    //如果分拣已完成的订单状态中
                    if (dd_stat == "3") {

                      //如果行李状态中存在分拣完成的状态
                      if (json_data[i].CNumberList[j].FB_State.indexOf(3) == 0) {
                        // console.log(xlarr)
                        that.setData({
                          isyunsuing: true,
                          express_information:false,
                          kdtext:"请填写快递信息"

                        })
                      } else if (json_data[i].CNumberList[j].FB_State.indexOf("4") != -1) {
                        that.setData({
                          istrue: false,

                        })
                      }
                       //如果订单是运输中状态
                    } else if (dd_stat == 4) {
                      that.setData({
                        isyunsuing: false,


                      })
                    } 

                    //如果行李状态是分拣完成
                    if (json_data[i].CNumberList[j].FB_State == "3") {
                      arr.push(json_data[i].CNumberList[j].F_ConsignmentNumber);
                      that.setData({
                        finshxlh: arr,
                      })
                    }

                  }
                }

                that.setData({
                  dd_status: dd_stat
                })
              }

            
              if (kdarrxlh.length == xlarr.length) {
                that.setData({
                  kdtext: "快递信息已填写"
                })
              }

              //更新订单详情数据
              that.setData({
                detaillist: json_data,
                showndetail: true
              })
            } else {
              that.setData({
                showndetail: false
              })
            }
          }
        }
      })
    } else {
      //数据加密
      var data_jm = JSON.stringify({
        "ConsignmentNumber": "",
        "OrderNo": ddhnumber,
        "CustPhone": ""
      });

      let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
      let miyao = md5(jm).toUpperCase();
      //请求数据
      wx.request({
        method: "GET",
        url: url + '/pdaapi/SerGetOrderDetailByNo',
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
              // console.log(json_data)
              var arr = []; //存放订单状态为3已完成的行李号
              var xlhstr = '';
              var onexlh = [];//存放只有一条行李号
              var xlarr = [];//存放订单行李号数组
              var statuall = [];//存放行李号的状态
              var kdarrxlh = [];//存放快递信息中的行李号数组

              for (var i = 0; i < json_data.length; i++) {
                var dd_stat = json_data[i].F_State;
                //循环行李号
                for (var j = 0; j < json_data[i].CNumberList.length; j++) {
                  // console.log(json_data[i].CNumberList);
                  // console.log(json_data[i].ExpressNoList)

                  xlarr.push(json_data[i].CNumberList[j].F_ConsignmentNumber);

                  //快递信息中的行李号转为字符串
                  var Kd = json_data[i].ExpressNoList;
                  for (var k = 0; k < Kd.length; k++) {
                    if (xlarr = Kd[k].F_ConsignmentNumber) {
                      that.setData({
                        istrue: false,
                        kdtext: "快递信息已填写",
                        finshxlh: xlarr
                      })
                    }

                    //去重行李号
                    var temp = []; //一个新的临时数组
                    for (var p = 0; p < Kd[k].F_ConsignmentNumber.length; p++) {
                      if (temp.indexOf(Kd[k].F_ConsignmentNumber[p]) == -1) {
                        temp.push(Kd[k].F_ConsignmentNumber[p]);
                      }
                    }
                    Kd[k].F_ConsignmentNumber = temp;
                    kdarrxlh = Kd[k].F_ConsignmentNumber;
                    Kd[k].F_ConsignmentNumber == Kd[k].F_ConsignmentNumber.join(",");

                  }

                  //如果只有一条行李号
                  if (json_data[i].CNumberList.length == 1) {
                    onexlh.push(json_data[i].CNumberList[j].F_ConsignmentNumber)
                    that.setData({
                      finshxlh: onexlh,
                    })

                    //只有一条行李号，默认选中
                    if (json_data[i].CNumberList[j].FB_State == 1 || json_data[i].CNumberList[j].FB_State == 2 || json_data[i].CNumberList[j].FB_State == 3 || json_data[i].CNumberList[j].FB_State == 4) {
                      that.setData({
                        checked: true
                      })
                    }

                    if (json_data[i].CNumberList[j].FB_State == 5 || json_data[i].CNumberList[j].FB_State == 41) {
                      that.setData({
                        checked: false
                      })
                    }

                    //一个行李号中异常订单下的异常行李号不显示快递信息
                    if (json_data[i].CNumberList[j].FB_State == 41 || json_data[i].CNumberList[j].FB_State == 41) {
                      that.setData({
                        express_information: true,
                        hiddenyichang: false
                      })
                    }

                    //判断在正常单下正常运输的行李号
                    if (json_data[i].CNumberList[j].FB_State.indexOf(5) == 0) {
                      that.setData({
                        express_information: false,
                      })
                    }

                    if (dd_stat == "5") {
                      that.setData({
                        checked: false,
                        express_information: false,
                      })
                    }

                    //判断在异常单下正常运输的行李号
                    if (json_data[i].CNumberList[j].FB_State.indexOf(4) == 0) {
                      that.setData({
                        isyunsuing: true,
                        checked: false,
                      })
                    }

                    //如果行李状态是分拣完成
                    if (json_data[i].CNumberList[j].FB_State == 3) {
                      arr.push(json_data[i].CNumberList[j].F_ConsignmentNumber)
                      that.setData({
                        finshxlh: arr,
                        express_information: false,
                        hiddenyichang: true
                      })
                    }

                    //如果行李状态是运输中
                    if (json_data[i].CNumberList[j].FB_State == 4) {
                      that.setData({
                        isyunsuing: false,
                        express_information: false,
                        hiddenyichang: true

                      })
                    }

                    if (json_data[i].CNumberList[j].FB_State == 5) {
                      that.setData({
                        express_information: false,
                        hiddenyichang: true,
                      })
                    }

                    if (json_data[i].CNumberList[j].FB_State == 41) {
                      that.setData({
                        hiddenyichang: false,
                      })
                    }

                    //如果是多条行李号
                  } else if (json_data[i].CNumberList.length > 0) {
                    //如果多条行李号
                    if (json_data[i].CNumberList[j].FB_State.indexOf(41) != -1) {
                      that.setData({
                        xlhstatus: 41,
                      })
                    }

                    //如果是在异常订单下正常的行李号状态
                    if (json_data[i].F_State == 41) {

                      statuall.push(json_data[i].CNumberList[j].FB_State)

                      that.setData({
                        hiddenyichang: false,

                      })


                      //如果异常订单中有行李号为异常的有行李号为已分拣的情况下
                      if (statuall.indexOf("3") != -1 && statuall.indexOf("41") != -1) {
                        that.setData({
                          hiddenyichang: true,
                          finshxlh: arr,
                          yunshuing: false

                        })
                        // console.log(that.data.finshxlh)
                      }

                      if (statuall.indexOf("3") != -1) {
                        that.setData({
                          kdtext: "请填写快递信息",
                        })
                      }


                      //如果异常订单有一个行李号运输中有行李号还是异常
                      if (statuall.indexOf("4") != -1 && statuall.indexOf("41") != -1) {
                        that.setData({
                          hiddenyichang: true,
                          express_information: false,
                          isyunsuing: false,
                          yunshuing: true
                        })
                      }

                      if (statuall.indexOf("4") != -1 && statuall.indexOf("3") != -1) {

                        that.setData({
                          hiddenyichang: true,
                          express_information: false,
                          isyunsuing: false,

                        })
                      }

                      if (json_data[i].CNumberList[j].FB_State.indexOf(2) != -1) {
                        that.setData({
                          xlhstatus: 2,
                        })
                      }

                      if (json_data[i].CNumberList[j].FB_State.indexOf(3) != -1) {
                        that.setData({
                          xlhstatus: 3,
                          isyunsuing: true,
                        })
                      }

                    } else {
                      that.setData({
                        hiddenyichang: true
                      })
                    }

                    if (dd_stat == 5) {
                      that.setData({
                        isyunsuing: true,
                        express_information: false
                      })
                    }

                    //如果在异常的订单中行李号中有一个是分拣完成状态，继续走快递
                    if (dd_stat == 41) {

                      //如果行李状态中存在分拣完成的状态显示填写快递信息
                      if (dd_stat == 41 && json_data[i].CNumberList[j].FB_State.indexOf(3) != -1) {
                        that.setData({
                          express_information: false,


                        })
                      }

                      //只要有行李号是运输中或已完成的状态
                      if (json_data[i].CNumberList[j].FB_State == 4 || json_data[i].CNumberList[j].FB_State == 5) {
                        that.setData({
                          isyunsuing: false,
                          express_information: false


                        })
                      }

                      if (json_data[i].CNumberList[j].FB_State.indexOf(3) != -1) {
                        that.setData({
                          express_information: false,

                        })
                      }

                    }

                    //如果分拣已完成的订单状态中
                    if (dd_stat == "3") {

                      //如果行李状态中存在分拣完成的状态
                      if (json_data[i].CNumberList[j].FB_State.indexOf(3) == 0) {
                        // console.log(xlarr)
                        that.setData({
                          isyunsuing: true,
                          express_information: false,
                          kdtext: "请填写快递信息"

                        })
                      } else if (json_data[i].CNumberList[j].FB_State.indexOf("4") != -1) {
                        that.setData({
                          istrue: false,

                        })
                      }
                      //如果订单是运输中状态
                    } else if (dd_stat == 4) {
                      that.setData({
                        isyunsuing: false,


                      })
                    }

                    //如果行李状态是分拣完成
                    if (json_data[i].CNumberList[j].FB_State == "3") {
                      arr.push(json_data[i].CNumberList[j].F_ConsignmentNumber);
                      that.setData({
                        finshxlh: arr,
                      })
                    }

                  }
                }

                that.setData({
                  dd_status: dd_stat
                })
              }


              if (kdarrxlh.length == xlarr.length) {
                that.setData({
                  kdtext: "快递信息已填写"
                })
              }

              //更新订单详情数据
              that.setData({
                detaillist: json_data,
                showndetail: true
              })
            } else {
              that.setData({
                showndetail: false
              })
            }
          }
        }
      })
    }
  }
 

//操作人操作信息
function Operation(e) {
  var that = e;
  var data_czl = JSON.stringify({
    "OrderNo": that.data.ddhnumber
  });
  let czl = 'version=' + version + '&key=' + qm_key + '&data=' + data_czl;
  let miyao_czl = md5(czl).toUpperCase();
  //请求数据
  wx.request({
    method: "GET",
    url: url + '/pdaapi/GetOrderLogisticsInfo',
    data: {
      "sign": miyao_czl,
      "version": 1,
      data: data_czl
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      if (res.statusCode == 200) {
        if (res.data.code == 200) {
          var dtr = res.data.data;
          var json_data = JSON.parse(dtr);
          that.setData({
            operator: json_data
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
    tracking_price: '',
    tracking_number: '',
    ddhnumber: '', //订单号
    detaillist: [], //详情数据
    showndetail: true,
    expressage: [],
    index: 0,
    dd_status: "", //订单状态
    express_company: "", //快递公司
    express_price: "", //快递费用
    express_order: "", //快递单号
    value2: ['1'],
    xlhstatus: "", //行李号的订单状态
    finshxlh: [], //已完成订单的行李号
    operator: [], //操作记录
    express: [], //合并的快递信息
    isyunsuing:true,//判断订单是否正在运输中
    checked:false,
    isflase:false,
    istrue:true,
    visible1: false,
    model1:false,
    yunshuing:true,
    arrxlhs:[],//存储多条行李号
    kdtext:"请填写快递信息",
    express_information:true,//快递信息显示
    hiddenyichang:true,//整个订单都异常

  },
  //打开弹窗
  open1() {
    var that = this;
    //如果没有选择行李号
    if(that.data.kdtext == "请填写快递信息") {
      if (that.data.finshxlh == "undefined") {
        that.setData({
          visible1: false,
          model1: false,
        });
        wx.showModal({
          title: '提示',
          content: '请先选择行李号！',
        })
      } else {

        that.setData({
          visible1: true,
          model1: true,
        });
      }


      

        
    }

    // if (expresscompanyid == "") {
    //   wx.showToast({
    //     title: '快递公司不能为空！',
    //     icon: "none",
    //     duration: 3000
    //   });
    // } else if (that.data.tracking_number == "") {
    //   wx.showToast({
    //     title: '快递单号不能为空！',
    //     icon: "none",
    //     duration: 3000
    //   });
    // } else if (that.data.tracking_price == "") {
    //   wx.showToast({
    //     title: '快递费用不能为空！',
    //     duration: 3000
    //   });
    // } else if (expresscompanyid != '' && that.data.tracking_number != "" && that.data.tracking_price != "") {

   
  },
  // 关闭弹窗
  close1() {
    this.setData({
      visible1: false,
    })
  },
 
 //快递信息保存按钮
  submit() {
    var that = this;

    var ExpressCompanyId = that.data.express_company;//快递公司
    var Amount = that.data.tracking_price;//快递费用
    var ExpressNO = that.data.tracking_number;//快递单号

    that.setData({
      visible1: false,
    })
    // 数据加密
    var tr_jm = JSON.stringify({
      "data": [{
        "OrderNo": that.data.ddhnumber,
        "ConsignmentNumber": that.data.finshxlh,
        "ExpressCompanyId": that.data.express_company,
        "ExpressNO": that.data.tracking_number,
        "PayType": "",
        "Amount": that.data.tracking_price
      }],
    });

    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
    let md5_jm = md5(jm).toUpperCase();

    if (ExpressCompanyId == "") {
      wx.showModal({
        title: '提示',
        content: '快递公司不能为空',
      })
    } else if (Amount == "") {
      wx.showModal({
        title: '提示',
        content: '快递费用不能为空',
      })
    } else if (ExpressNO == "") {
      wx.showModal({
        title: '提示',
        content: '快递单号不能为空',
      })
    } else {
      //请求数据
      wx.request({
        method: "POST",
        url: url + '/pdaapi/ExpressInformations',
        data: {
          "sign": md5_jm,
          "version": 1,
          "data": tr_jm
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(res)
          if (res.statusCode == 200) {
            if (res.data.code == 200) {
              Orderdatial(that); //更新数据
              Operation(that);

              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 3000
              });
            } else if (res.data.code == 400) {

            }

          }
        },
      })
    }

  },
  checkboxChange: function (e) {
    var that = this;
    var xlh_val = e.detail.value; //选中的行李号
    var arr = [];

    that.setData({
      finshxlh: xlh_val,
    })


  },
  
  onClose(key) {
    this.setData({
      [key]: false,
    })
  },
  onClose1() {
    this.onClose('visible1')
  },

  //拨打分拣员电话
  Tel(e) {
    //电话号码
    var tel = e.currentTarget.dataset.tel;
    wx.showModal({
      title: '拨打客服电话',
      content: tel ,
      confirmText: "拨打",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: tel,
            success: function () {
            },
            fail: function () {
            }
          })
        } else {
        }
      }
    });

  },

  //选择快递公司
  bindPickerChange: function(e) {
    var that = this;
    that.setData({
      index: e.detail.value
    })
    //选择的快递公司
    var company = that.data.expressage[e.detail.value];
    that.setData({
      express_company: company
    })
  },
  //快递费用
  tracking_price(e) {
    var that = this;
    that.setData({
      tracking_price: e.detail.value
    });
  },
  //快递单号
  tracking_number(e) {
    var that = this;
    that.setData({
      tracking_number: e.detail.value
    });
  },
  // 扫一扫识别订单号
  getScancode: function() {
    var that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        that.setData({
          tracking_number: result,
        })
      }
    })
  },
  //点击变成分拣中的状态
  fenjianzhong(e) {
    var that = this;
    // 数据加密
    var tr_jm = JSON.stringify({
      "OrderNo": that.data.ddhnumber,
      "ConsignmentNumber": that.data.finshxlh,
      "status": "2",
      "Operator": zhanghao
    });

    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
    let md5_jm = md5(jm).toUpperCase();

    if (that.data.finshxlh == "undefined") {
      wx.showModal({
        title: '提示',
        content: '请先选择行李号！',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定要修改行李状态为【分拣中】？',
        // showCancel: false,
        confirmColor: "#3FA1E0",
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          //确定
          if (res.confirm) {
            //请求数据
            wx.request({
              method: "POST",
              url: url + '/pdaapi/UpdateOrderStatus',
              data: {
                "sign": md5_jm,
                "version": 1,
                "data": tr_jm
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                // console.log(res)
                if (res.statusCode == 200) {
                  if (res.data.code == 200) {
                    Orderdatial(that); //更新数据
                    Operation(that);
                    wx.showToast({
                      title: '修改成功',
                      icon: 'success',
                      duration: 3000
                    });
                  } else if (res.data.code == 400) {

                  }

                }
              },
            })
          }
        }
      });

    }
  },
  //点击变成行李分拣完成
  xiywc(e) {
    var that = this;
    // 数据加密
    var tr_jm = JSON.stringify({
      "OrderNo": that.data.ddhnumber,
      "ConsignmentNumber": that.data.finshxlh,
      "status": "3",
      "Operator": zhanghao
    });
    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
    let md5_jm = md5(jm).toUpperCase();

    if (that.data.finshxlh == "undefined") {
      wx.showModal({
        title: '提示',
        content: '请先选择行李号！',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定要修改行李状态为【分拣完成】？',
        confirmColor: "#3FA1E0",
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          //确定
          if (res.confirm) {
            //请求数据
            wx.request({
              method: "POST",
              url: url + '/pdaapi/UpdateOrderStatus',
              data: {
                "sign": md5_jm,
                "version": 1,
                "data": tr_jm
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                // console.log(res)
                if (res.statusCode == 200 && res.data.code == 200) {
                  Orderdatial(that); //更新数据
                  Operation(that);
                  wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 3000
                  });
                }
              },
            })
          }
        }
      });
    }
  },
  //点击变成运输中
  yunshuzhong(e) {
    var that = this;
    var ExpressCompanyId = that.data.express_company;//快递公司
    var Amount = that.data.tracking_price;//快递费用
    var ExpressNO = that.data.tracking_number;//快递单号

    // 数据加密
    var tr_jm = JSON.stringify({
      "OrderNo": that.data.ddhnumber,
      "ConsignmentNumber": that.data.finshxlh,
      "status": "4",
      "Operator": zhanghao,
    });


    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
    let md5_jm = md5(jm).toUpperCase();

    if (ExpressCompanyId == "") {
      wx.showModal({
        title: '提示',
        content: '快递公司不能为空',
      })
    } else if (Amount == "") {
      wx.showModal({
        title: '提示',
        content: '快递费用不能为空',
      })
    } else if (ExpressNO == "") {
      wx.showModal({
        title: '提示',
        content: '快递单号不能为空',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定要修改行李 状态为【运输中】？',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          //确定
          if (res.confirm) {
            //请求数据
            wx.request({
              method: "POST",
              url: url + '/pdaapi/UpdateOrderStatus',
              data: {
                "sign": md5_jm,
                "version": 1,
                "data": tr_jm
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                // console.log(res)
                if (res.statusCode == 200 && res.data.code == 200) {
                  Operation(that);
                  Orderdatial(that) //更新数据
                  wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 3000
                  });
                  that.setData({
                    detaillist: that.data.detaillist
                  })
                }
              }
            })
          }
        }
      });

    }
  },
  //点击变成异常订单
  yichang(e) {
    var that = this;
    // 数据加密
    var tr_jm = JSON.stringify({
      "OrderNo": that.data.ddhnumber,
      "ConsignmentNumber": that.data.finshxlh,
      "status": "41",
      "Operator": zhanghao
    });

    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + tr_jm;
    let md5_jm = md5(jm).toUpperCase();
    if (that.data.finshxlh == "undefined") {
      wx.showModal({
        title: '提示',
        content: '请先选择行李号！',
      })
    }  else {

    wx.showModal({
      title: '提示',
      content: '确定要修改行李状态为【异常】？',
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        //确定
        if (res.confirm) {
          //请求数据
          wx.request({
            method: "POST",
            url: url + '/pdaapi/UpdateOrderStatus',
            data: {
              "sign": md5_jm,
              "version": 1,
              "data": tr_jm
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              if (res.statusCode == 200 && res.data.code == 200) {
                Operation(that);
                Orderdatial(that) //更新数据
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 3000
                });

                that.setData({
                  detaillist: that.data.detaillist
                })

              }
            },

          })
        }
      }
    });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var xlh = options.luggagestr; //行李号
    var ddh = options.ddhnum; //订单号

    if (options.luggagestr) {

      //保存行李号
      that.setData({
        finshxlh: xlh,
        ddhnumber: ddh,
      })
    } else if (options.ddhnum) {

      //保存订单号
      that.setData({
        finshxlh: xlh,
        ddhnumber: ddh,
      })
    } 


    app.globalData.xlhnumber = xlh;
    app.globalData.ordernumber = ddh;

    Orderdatial(that);
    Operation(that);

    //获取所有快递公司信息
    var data_jm = JSON.stringify({});
    let jm = 'version=' + version + '&key=' + qm_key + '&data=' + data_jm;
    let miyao = md5(jm).toUpperCase();
    //请求数据
    wx.request({
      method: "GET",
      url: url + '/pdaapi/GetExpressCompany',
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
            var arr = ['请选择快递公司'];
            for (var i = 0; i < json_data.length; i++) {
              arr.push(json_data[i].F_ExpressCompanyName);
              that.setData({
                expressage: arr
              })
            }
          }
        }
      }
    })



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
    // Orderdatial(that);

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

  /*
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