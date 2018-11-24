// pages/Mine/index/index.js
const app = getApp()
var that;
var util = require('../../common/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    list: [{
      imageUrl: '../../image/other/mine_buy.png',
      title: '购买记录'
    },{
      imageUrl:'../../image/other/mine_aboutUS.jpg',
      title:'关于我们'
    }]
  },
  updateInfo:function(e){
    wx.navigateTo({
      url: '../updateInfo/index/index',
    })
  },
  showCollectList:function(e){
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../login/login',
        });
      })) {
      return;
    }
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  showCareList:function(e){
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../login/login',
        });
      })) {
      return;
    }
    wx.navigateTo({
      url: '../care/care',
    })
  },
  showFansList:function(e){
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../login/login',
        });
      })) {
      return;
    }
    wx.navigateTo({
      url: '../fans/fans',
    })
  },
  listItemClick:function(e){
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    switch(index){
      case 0://购买
        //判断是否登录
        if (!util.isLogin(
          function (res) {
            wx.navigateTo({
              url: '../login/login',
            });
          })) {
          return;
        }
        wx.navigateTo({
          url: '../buy/buy',
        })
        break;
      case 1://消息
        wx.navigateTo({
          url: '../aboutUs/aboutUs',
        })
        break;
      case 2://学习课程
        wx.navigateTo({
          url: '../lesson_learn/lesson_learn',
        })
        break;
      case 3://制作的课程
        wx.navigateTo({
          url: '../lesson_make/lesson_make',
        })
        break;
      case 4://干货
        wx.navigateTo({
          url: '../essay/essay',
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    //用户的公开信息
    util.user_profile(
      // app.globalData.loginInfo.user_id,
      function (res) {
        that.setData({
          info: res.data.data,
        });
      });
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
    //用户的公开信息
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../login/login',
        });
      })) {
      return;
    }
    util.user_profile(
      // app.globalData.loginInfo.user_id,
      function (res) {
        console.log('用户的私密信息');
        console.log(res);
        that.setData({
          info: res.data.data,
        });
      });
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