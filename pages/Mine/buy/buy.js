// pages/Mine/buy/buy.js
var util = require('../../common/util.js')
var dataTool = require('../../common/dataTool.js')
var that;
var offSet = 0;
var limit = 5;
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
    that.loadList();
  },
  loadList:function(){
    util.payment_purchased_list(
      limit,
      offSet,
      "entry_date",
      "",
      function (res) {
        console.log('我的购买记录')
        console.log(res)
        if (res.data.success) {
          that.dealWithData(res.data.data,res.data.paging.total)
        }
      }
    );
  },
  dealWithData:function(data,total){
    var tmp_arr = [];
    for(var i in data){
      var item = data[i];
      item.orderTime = dataTool.dateToString(parseInt(item.created_at));
      tmp_arr.push(item);
    }
    if(offSet){
      //加载更多
      if(!tmp_arr.length){
        //没有更多
        that.setData({
          noMore:true,
        })
      }
      tmp_arr = that.data.dataSource.concat(tmp_arr);
    }
    that.setData({
      dataSource: tmp_arr,
    });
    if (that.data.dataSource.length == total){
      //没有更多
      that.setData({
        noMore: true,
      })
    }
  },
  showLessonDetail:function(e){
    console.log(e);
    var item = {
      "goods_type": e.currentTarget.dataset.item.goods_type,
      "course_id": e.currentTarget.dataset.item.goods_id,
      "sc_id": e.currentTarget.dataset.item.goods_id,
    }
    if (item.goods_type == "course"){
      //分享课
      require('../../Home/seriesLesson/learnList/learnList.js')
      wx.navigateTo({
        url: '../../Home/shareDetail/shareDetail?item=' + JSON.stringify(item),
      })
    }else{
      //系列课../../Home/seriesLesson/learnList/learnList
      wx.navigateTo({
        url: '../../Home/seriesLesson/learnList/learnList?sc_id=' + JSON.stringify(item.sc_id),
      })
    }
  },
  /**
   * 加载更多
   */
  loadMore:function(e){
    offSet += limit;
    that.loadList();
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