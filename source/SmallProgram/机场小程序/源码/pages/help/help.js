// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    if (options.type === '1') {
      this.setData({
        type: "xxx协议"
      })
    };
    if (options.type === '2') {
      this.setData({
        type: "派送时间规则"
      })
    };
    if (options.type === '3') {
      this.setData({
        type: "下单规则"
      })
    };
  },
  onShareAppMessage: function() {
    /**
     * 用户点击右上角分享
     */
    return {
      title: '智慧行李',
      path: 'pages/help/help?openid=' + app.open('open').openId + '&type=' + this.data.type,
      imageUrl: "../../image/2.jpg",
      success: function(res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    };
  }
})