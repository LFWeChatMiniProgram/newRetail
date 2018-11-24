//app.js
App({
  onLaunch: function (e) {
    console.log('小程序启动')
    if(e.scene == 1006 || e.scene == 1007 || e.scene == 1008 ){
      this.globalData.isFromShare = true;
    }
    console.log(e);
    // 展示本地存储能力
    this.globalData.loginInfo = { "token":""};
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app.globalData.loginInfo')
    console.log(this.globalData.loginInfo.token)
    if (!this.globalData.loginInfo.token){
      console.log('未登录')
    }else{
      console.log('已登录')
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("登录成功");
        this.globalData.code = res.code;
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.encryptedData = res.encryptedData;
              this.globalData.iv = res.iv;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                // this.userInfoReadyCallback(res)
              }else{
                
              }
              var util = require('./pages/common/util.js');
              util.minapp_login(
                this.globalData.code,
                this.globalData.encryptedData,
                this.globalData.iv,
                function (res) {
                  console.log("登录结果为：")
                  console.log(res)
                  if (!getApp().globalData){
                    getApp().globalData = {
                      userInfo: null,
                      loginInfo: { "token": "" },
                      formId: ''
                    };
                  }
                  // this.globalData.loginInfo = res.data.data
                }
              );
            }
          })
        }
      }
    })
  },
  onShow(e){
    console.log('小程序显现')
    if (e.scene == 1006 || e.scene == 1007 || e.scene == 1008) {
      this.globalData.isFromShare = true;
    }
  },
  globalData: {
    userInfo: null,
    loginInfo:{ "token": "" },
    formId:''
  }
})