import { Config } from 'config.js';
class Access {
  constructor() {
    this.editMembersUrl = Config.restUrl + 'Members/addMembers';
    this.openid = "";
  }

  // 获取openid
  getOpenid(callBack) {
    var that = this;
    // wx.login({
    //   success: function (res) {
    //     wx.request({
    //       url: Config.restUrl + 'WechatApi/getOpenid',
    //       method: 'POST',
    //       data: {
    //         code: res.code
    //       },
    //       success: function (res) {
    //         var openid = res.data.data.openid;
    //         callBack && callBack(openid);
    //       },
    //       fail: function (res) {
    //         console.log(res);
    //       }
    //     })
    //   }
    // })
  }

  /* 更新用户信息到服务器 */
  updateUserInfo(res) {
    this.getOpenid((openid) => {
      res.openid = openid;
      wx.request({
        url: this.editMembersUrl,
        data: {
          headimgurl: res.avatarUrl,
          city: res.city,
          sex: res.gender,
          language: res.language,
          nickname: res.nickName,
          province: res.province,
          openid: res.openid
        },
        method: 'post',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // 判断以2（2xx)开头的状态码为正确
          // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
          var code = res.statusCode.toString();
          var startChar = code.charAt(0);
          if (startChar == '2') {
            wx.setStorage({
              key: 'members',
              data: res.data.data,
            });
          } else {

          }
        },
        fail: function (err) {
          //wx.hideNavigationBarLoading();
          that._processError(err);
          // params.eCallback && params.eCallback(err);
        }
      });
    });
  }
}
export { Access };