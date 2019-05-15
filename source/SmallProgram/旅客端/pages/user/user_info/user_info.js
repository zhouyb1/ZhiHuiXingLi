// pages/user/user_info/user_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    card: ''
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
  names(event) {
    this.setData({
      name: event.detail.detail.value
    })
  },
  phones(event) {
    this.setData({
      phone: event.detail.detail.value
    })
  },
  cards(event) {
    this.setData({
      card: event.detail.detail.value
    })
  },
  svaes() {
    var d = this.data;
    var p = /^1[345789]\d{9}$/;
    var n = /^[\u4e00-\u9fa5]{2,4}$/;
    var c = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!n.test(d.name)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的姓名'
      });
      return false;
    }
    if (!p.test(d.phone)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的手机号码'
      });
      return false;
    };
    if (d.card && !c.test(d.card)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的身份证号码'
      });
      return false;
    };
  }
})