// pages/Mine/fans/fans.js
var that;
var util = require('../../common/util.js')
var limit = 5;
var offSet = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSource:[],
    noMore:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    offSet = 0;
    that.loadMyFollerList();
  },
  loadMyFollerList:function(){
    util.users_myfollower(
      limit,
      offSet,
      "entry_date",
      "desc",
      function (res) {
        console.log('我的粉丝列表')
        console.log(res);
        if (res.data.success) {
          if (offSet == 0) {
            //刷新
            that.setData({
              dataSource: res.data.data
            });
          } else {
            //加载更多
            var tmpArr = that.data.dataSource.concat(res.data.data);
            that.setData({
              dataSource: tmpArr,
            });
          }
          if (that.data.dataSource.length == res.data.paging.total) {
            that.setData({
              noMore: true,
            });
          }
        }
      }
    );
  },
  showTeacherDetail: function (e) {
    console.log(e.currentTarget.dataset.user)
    wx.navigateTo({
      url: '../../Home/lessonTeacherDetail/lessonTeacherDetail?user=' + JSON.stringify(e.currentTarget.dataset.user),
    })
  },
  loadMore:function(){
    offSet += limit;
    that.loadMyFollerList();
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