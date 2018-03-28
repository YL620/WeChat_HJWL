// pages/home/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gotop: false,
    height: 0,
    top: 0,
    left: 0,
    scrollview: "logo",
    scrolltop: 0
  },
  showup: function (option) {
    console.log(option);
    this.setData({ gotop: true });
  },
  hideup: function (option) {
    console.log(option);
    this.setData({ gotop: false });
  },
  gotop: function (event) {
    console.log(event);
    this.setData({ gotop: false, scrolltop: 0 });
  },
  showmenu: function (event) {
    wx.showActionSheet({
      itemList: ["国际快递", "国际小包", "国际专线", "全球仓储", "跨境电商服务", "FBA专区"],
      success: function (res) {
        console.log(res);
      },
      fail: function (error) {

        console.log(error);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("logininfo", app.globalData.loginInfo);
    //当前登录用户
    if (app.globalData.loginInfo == null || app.globalData.loginInfo == ""){
      wx.redirectTo({
        url: '../account/login',
      })
    }
    
    var e = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        
        var calleft = res.windowWidth - (res.windowWidth * 0.05 + 36);
        var caltop = res.windowHeight - (res.windowHeight * 0.05 + 36);
        e.setData({ height: res.windowHeight, top: caltop, left: calleft });
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})