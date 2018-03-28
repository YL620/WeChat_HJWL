const SendSMS = param => {
  wx.request({
    url: 'http://www.pfcexpress.com/webservice/COM_WebService.asmx/SendSMS',
    data: { Phone: param.phone },
    method: "post",
    success: function (result) {
      param.success(result.data);
    }, fail: function (error) {
      param.fail(result);
    }
  })
}

const Register = param => {
  wx.request({
    url: 'http://www.pfcexpress.com/webservice/COM_WebService.asmx/Register',
    data: param.data,
    method: "post",
    success: function (result) {
      param.success(result.data);
    }, fail(error) {
      param.fail(error);
    }
  })
}

module.exports = {
  SendSMS: SendSMS,
  Register: Register
}