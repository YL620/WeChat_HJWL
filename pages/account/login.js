// pages/index/login.js
//获取应用实例
const app = getApp()
var userinfo = {
  loginname: "",
  loginpwd: ""
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkloginname: false,
    checkloginpwd: false,
    showtip: false,
    tip: ""
  },
  //登录
  bindLogin: function (event) {
    var e = this;
    var flag = true;
    if (userinfo.loginname == "") {
      this.setData({ checkloginname: true });
      flag = true;
    }
    if (userinfo.loginpwd == "") {
      this.setData({ checkloginpwd: true });
      flag = true;
    }
    if (flag) {
      wx.request({
        url: 'http://www.pfcexpress.com/webservice/COM_WebService.asmx/LoginCheckInfo',
        method: "post",
        data: {
          "custname": userinfo.loginname,
          "pwd": userinfo.loginpwd,
          "url": ""
        },
        dataType: "json",
        success: function (res) {
          var util = require("../../utils/util.js");
          var result = res.data.d;
          var data = JSON.parse(result)
          
          //写入缓存
          var userinfo = { logindate: util.formatTime(new Date), loginname: data.customer, signature: app.globalData.usersignature };
          
          wx.setStorageSync("loginuser", userinfo);
          app.globalData.loginInfo = userinfo;

          if (data.errorcode == "00") {
            wx.showToast({
              title: '登录成功',
              icon: "sucess",
              mask: true,
              success: function () {
              }
            })
            wx.switchTab({
              url: '/pages/home/index',
              success: function () {
                wx.showTabBar();
              }
            })
          }
          else{
            wx.showToast({
              title: '登录失败',
              icon: "sucess",
              mask: true,
              success: function () {
              }
            })
          }
        },
        fail: function (error) {
          console.log(error);
          wx.showToast({
            title: '登录失败',
            icon: "sucess",
            mask: true,
            success: function () {
            }
          })
        }
      })
    }
  },
  setValue: function (event) {//输入事件
    if (event.currentTarget.id == "loginname") {
      userinfo.loginname = event.detail.value;
    }
    else if (event.currentTarget.id == "loginpwd") {
      userinfo.loginpwd = event.detail.value;
    }
    this.setData({ userinfo: userinfo });
    console.log(event);
  },
  //事件处理函数
  bindViewTap: function (res) {
    wx.navigateTo({
      url: 'register',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.loginInfo != null && app.globalData.loginInfo != "") {
      wx.switchTab({
        url: 'pages/home/index',
        success: function () {
          wx.showTabBar();
        }
      })
    }

    if (app.globalData.usersignature == "") {
      wx.getUserInfo({
        success: res => {
          app.globalData.usersignature = res.signature;
        }
      })
    }

    wx.hideTabBar();
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