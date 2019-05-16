// pages/pays/pays.js
const {
  $Toast
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: false,
    ems: false,
    multiArray: [
      ['今天', '明天', '后天', '5-11'],
      ['10', '11', '12', '13', '14'],
      ['30', '00']
    ],
    multiIndex: [0, 0, 0],
    animal: '熊猫',
    checked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var times = new Date().getTime();
    var t = new Date(times + 86400000);
    var d = '';
    var arr = [];
    var arrs = []
    for (var i = 1; i < 8; i++) {
      d = new Date(times + 86400000 * i).getMonth() + 1 + '-' + new Date(times + 86400000 * i).getDate();
      arr.push(d);
      if (i === 1) {
        arr[0] = "今天"
      };
      if (i === 2) {
        arr[1] = "明天"
      };
      if (i === 3) {
        arr[2] = "后天"
      };
    };
    arrs[0] = arr;
    arrs[1] = this.data.multiArray[1];
    arrs[2] = this.data.multiArray[2]
    this.setData({
      multiArray: arrs
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
  onChange(event) {
    this.setData({
      times: event.detail.value
    })
  },
  onChange1(event) {
    this.setData({
      ems: event.detail.value
    })
  },
  bindMultiPickerChange: function(e) {
    var s = this.data.multiArray[1];
    var t = new Date().getHours();
    if (t > s[e.detail.value[1]] && this.data.multiArray[0][e.detail.value[0]] === "今天") {
      wx.showModal({
        title: '提示',
        content: '呀！这个点已经过去了，请选择其他时间'
      })
      e.detail.value[0] += 1;
    };
    this.setData({
      multiIndex: e.detail.value
    })
  },
  handleText() {
    $Toast({
      content: '这是说明是港内件说明'
    });
  },
  checkboxChange: function (e) {
    var c = !this.data.checked;
    this.setData({
      checked:c
    });
    console.log(c)
  },
  go_help(event){
    wx.navigateTo({
      url: '/pages/help/help?type=' + event.target.dataset.type,
    });
  },
  pays(){
    var d = this.data.checked;
    if(!d){
      wx.showModal({
        title: '温馨提示',
        content: '请同意xxx'
      });
      return false;
    }else{
      console.log(2)
    };
  }
})