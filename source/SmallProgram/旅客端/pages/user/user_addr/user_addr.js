// pages/user/user_addr/user_addr.js
// const {
//   $Message
// } = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr: [{
        id: 0,
        name: "韩梅梅",
        phone: "18000000000",
        addr: "广州天河区"
      },
      {
        id: 1,
        name: "韩梅梅1",
        phone: "18000000000",
        addr: "广州天河区"
      },
      {
        id: 2,
        name: "韩梅梅2",
        phone: "18000000000",
        addr: "广州天河区"
      }
    ],
    actions: [{
      name: '删除',
      color: '#fff',
      fontsize: '20',
      width: 100,
      background: '#ed3f14'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  del(index) {
    var i = index.currentTarget.dataset.id;
    var d = this.data.addr;
    var _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除吗？',
      success(res) {
        if (res.confirm) {
          d.splice(i, 1);
          _this.setData({
            addr: d
          });
        };
      }
    });
  }
})