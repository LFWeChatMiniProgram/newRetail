// pages/Mine/login/login.js
let util = require('../../common/util.js')
const app = getApp()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log('canIUse')
    console.log(wx.canIUse('button.open-type.getUserInfo'))
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
  
  },
  /**
   * 登录
   */
  cancel:function(){
    wx.switchTab({
      url: '../../Home/index/index',
    })
  },
  login:function(e){
    console.log('开始登录')
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("微信登录成功");
        app.globalData.code = res.code;
        console.log(res);
        wx.getUserInfo({
          withCredentials: true,
          lang: '',
          success: function (res2) {
            console.log(res2);
            app.globalData.encryptedData = res2.encryptedData;
            app.globalData.iv = res2.iv;
            util.minapp_login(
              app.globalData.code,
              app.globalData.encryptedData,
              app.globalData.iv,
              function (res3) {
                console.log("登录结果为：")
                console.log(res3)
                app.globalData.loginInfo = res3.data.data
              }
            );
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },
  getUserInfo:function(e){
    console.log(e)
    if (!(e.detail.errMsg == 'getUserInfo:ok')){
      //拒绝授权
      return;
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    app.globalData.encryptedData = e.detail.encryptedData;
    app.globalData.iv = e.detail.iv;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("微信登录成功");
        app.globalData.code = res.code;
        console.log(res);
        if(!res.code.length){
          wx.showToast({
            title: '微信登录失败，请重试',
          })
          console.log('微信登录失败，请重试');
          return;
        }
        util.minapp_login(
          res.code,//app.globalData.code,
          e.detail.encryptedData,//app.globalData.encryptedData,
          e.detail.iv,//app.globalData.iv,
          function (res) {
            console.log("登录结果为：")
            console.log(res)
            if (res.data.success){
              //登录成功
              wx.showToast({
                title: '登录成功',
              });
              app.globalData.loginInfo = res.data.data
              console.log('app.globalData.loginInfo')
              console.log(getApp().globalData.loginInfo)
              setTimeout(function(){
                wx.navigateBack({
                })
              },2000)
            }else{
              wx.showToast({
                title: '登录失败请重试',
              })
            }
          }
        );
      }
    })
  }
})