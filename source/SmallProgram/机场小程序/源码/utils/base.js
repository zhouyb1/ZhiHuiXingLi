import { Access } from 'access.js';
import { Config } from 'config.js';
class Base {

  constructor() {
    this.baseRestUrl = Config.restUrl;
  }

  request(params) {
    var that = this;
    var url = this.baseRestUrl + params.url;
    var loading = params.loading == "hide" ? "hide" : "show";
    if (!params.type) {
      params.type = 'get';
    }
    /*不需要再次组装地址*/
    if (params.setUpUrl == false) {
      url = params.url;
    }
    // 如果传有loading==show,则显示加载效果，如果传hide，则隐藏加载效果,默认是显示
    if (loading == "show") {
      wx.showLoading({
        title: "加载中...",
        mask: true,
      });
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          that._processError(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      complete: function (res) {
        loading == "show" ? wx.hideLoading() : false;
      },
      fail: function (err) {
        that._processError(err);
      }
    });
  }
 
  // 打印错误信息
  _processError(err) {
    console.log(err);
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

  // 获取全局配置
  getBase(data, callback) {
    var data = data ? { "field": data } : false;
    var param = {
      url: 'Common/getConfig',
      type: "post",
      data: data,
      sCallback: function (data) {
        callback && callback(data.data);
      }
    };
    this.request(param);
  }

  
};

export { Base };
