// pages/Mine/aboutUs/aboutUs.js
let wxparse = require("../../../wxParse/wxParse.js")
var util = require('../../common/util.js')
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    util.about_us(
      function(res){
        console.log('关于我们')
        console.log(res)
        if(res.data.success){
          wxparse.wxParse('content', 'html', res.data.data.text, that, 5);
          that.setData({
            info:res.data.data
          });
        }
      }
    );
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