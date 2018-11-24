// pages/Topic/index/index.js
var util = require('../../common/util.js')
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marks:["711","盒马生鲜","亚马逊","阿里巴巴","京东生鲜","大润发","曲飞宇","马云","刘强东","MicroSoft"],
  },
  showTopicDetail:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../detail/detail?topic=' + JSON.stringify(e.currentTarget.dataset.topic),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    util.tags(
      10,
      0,
      "entry_date",
      "desc",
      function(res){
        console.log(res);
        that.setData({
          dataSource:res.data.data,
        });
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
    util.tags(
      10,
      0,
      "entry_date",
      "desc",
      function (res) {
        console.log(res);
        that.setData({
          dataSource: res.data.data,
        });
      }
    );
    wx.stopPullDownRefresh();
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