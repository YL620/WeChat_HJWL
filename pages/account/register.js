// pages/account/register.js
var time = 60;
var requestjs = require("requestjs/request.js");
var formdata = {
  pwd: "",
  pwd2: "",
  phone: "",
  verifycode: ""
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    textVerify: "获取验证码",
    showphonetips: false,
    showpwdtips: false,
    showpwdtips2: false,
    showverifytips: false,
    textpwdtips2: "请再次输入密码",
    registervalid: false,
    registerclass:"btn-gray"
  },
  InputPhone: function (e) {
    if (e.detail.value == "") {
      this.setData({ showphonetips: true });
    }
    else {
      formdata.phone = e.detail.value;
      if (formdata.phone != "" && formdata.pwd != "" && formdata.pwd2 != "" && formdata.verifycode != "") {
        this.setData({ showphonetips: false, registervalid: true, registerclass: "btn-blue" });
      }
      else {
        this.setData({ showphonetips: false, registervalid: false, registerclass: "btn-gray" });
      }
    }

  },
  InputPassWord: function (e) {
    var id = e.target.id;
    if (id == "pwd") {
      formdata.pwd = e.detail.value;
      if (formdata.pwd == "") {
        this.setData({ showpwdtips: true, registervalid: false, registerclass: "btn-gray" });
        return;
      }
    } else {
      formdata.pwd2 = e.detail.value;
      if (formdata.pwd2 == "") {
        this.setData({ showpwdtips2: true, registervalid: false, registerclass: "btn-gray" });
        return;
      }
    }
    if (formdata.pwd2 != "" && formdata.pwd != formdata.pwd2) {
      this.setData({ textpwdtips2: "两次输入密码不一致", showpwdtips2: true, registervalid: false, registerclass: "btn-gray" })
    } else if (formdata.phone != "" && formdata.pwd != "" && formdata.pwd2 != "" && formdata.verifycode != "") {
      this.setData({ showpwdtips: false, showpwdtips2: false, registervalid: true, registerclass: "btn-blue" })
    } else {
      this.setData({ showpwdtips: false, showpwdtips2: false, registerclass: "btn-gray" })
    }
  },
  InputVerify: function (e) {
    formdata.verifycode = e.detail.value;
    if (formdata.verifycode == "") {
      this.setData({ showverifytips: true });
    } else if (formdata.phone != "" && formdata.pwd != "" && formdata.pwd2 != "" && formdata.verifycode != "") {
      this.setData({ showverifytips: false, registervalid: true, registerclass: "btn-blue" });
    }
  },
  Register: function (e) {//注册
    var param = {
      data: {
        Phone: formdata.phone,
        PassWord: formdata.pwd,
        VerifyCode: formdata.verifycode
      },
      success: function (res) {
        console.log(res);
        var data = JSON.parse(res.d);
        if (data.code == "00") {
          wx.showToast({
            title: '注册成功',
            icon: "none"
          });
          wx.redirectTo({
            url: 'login',
          });
        } else {
          wx.showToast({
            title: '注册失败',
            icon: "none"
          });
        }
      },fail:function(error){
        console.log(error);
      }
    };
    requestjs.Register(param);
  },
  SendVerifyCode: function (e) {//发送验证码
    var obj = this;
    console.log(e);
    if (formdata.phone == "") {
      obj.setData({ showphonetips: true });
      return;
    }

    //定义参数
    var param = {
      phone: formdata.phone,
      success: function (res) {
        console.log(res);
        var data = JSON.parse(res.d);
        if (data.code != "00") {
          wx.showToast({
            title: "获取验证码失败",
            icon: "none"
          })
        }
        else {
          SendVerify(obj);
        }
      }, fail: function (error) {
        console.log(error);
        wx.showToast({
          title: "发送验证码失败",
          icon: "none"
        })
      }
    }
    //发送验证码
    requestjs.SendSMS(param);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

function SendVerify(obj) {
  if (time == 0) {
    time = 60;
    obj.setData({ textVerify: "获取验证码" });
    return;
  }
  time--;
  setTimeout(function () {
    obj.setData({ textVerify: "重新获取(" + time + "s)" });
    SendVerify(obj);
  }, 1000);
}