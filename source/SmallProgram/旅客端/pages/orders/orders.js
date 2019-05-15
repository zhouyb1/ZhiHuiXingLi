// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '0',
    list: [{
        id: 0,
        order: 8888888,
        type: 0,
        han: 'GZ2222',
        num: 2,
        timer: '2019-05-15 00:00:00'
      },
      {
        id: 1,
        order: 8888888,
        type: 1,
        han: 'GZ2222',
        num: 2,
        timer: '2019-05-15 00:00:00'
      },
      {
        id: 2,
        order: 8888888,
        type: 2,
        han: 'GZ2222',
        num: 2,
        timer: '2019-05-15 00:00:00'
      },
      {
        id: 3,
        order: 8888888,
        type: 3,
        han: 'GZ2222',
        num: 2,
        timer: '2019-05-15 00:00:00'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      index: options.id || 0
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
  handleChange({ detail}) {
    this.setData({
      index: detail.key
    });
  },
  get_info(event){
    wx.navigateTo({
      url: '/pages/orders/orders_info/orders_info?order=' + event.currentTarget.dataset.order
    })
  }
})