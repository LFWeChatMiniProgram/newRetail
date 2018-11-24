// pages/Mine/collect/collect.js‘
var util = require('../../common/util.js');
var that;
var offSet_share = 0;
var offSet_series = 0;
var offSet_essay = 0;
var limit = 5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr_share:[],
    arr_series:[],
    arr_essay:[],
    noMore_share:false,
    noMore_series:false,
    noMore_essay:false,

    total_share: 0,
    total_series: 0,
    total_essay: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    offSet_share = 0;
    offSet_series = 0;
    offSet_essay = 0;
    that.loadList_shareLesson();
    that.loadList_seriesLesson();
    that.loadList_essay();
  },
  //收藏的分享课列表
  loadList_shareLesson:function(){
    util.courses_bookmark(
      limit,
      offSet_share,
      "entry_date",
      "desc",
      "course",
      function(res){
        console.log('收藏的分享课列表')
        console.log(res);
        if (res.data.success){
          if(offSet_share){
            //加载更多
            if (!res.data.data.length){
              //没有更多
              that.setData({
                noMore_share:true,
              })
            }else{
              var tmpArr = that.data.arr_share.concat(res.data.data);
              that.setData({
                arr_share:tmpArr,
              });
            }
          }else{
            //刷新
            that.setData({
              arr_share: res.data.data,
            });
          }
          if (that.data.arr_share.length == res.data.paging.total) {
            that.setData({
              noMore_share: true,
            });
          }
          that.setData({
            total_share: res.data.paging.total,
          });
        }
      }
    );
  },
  //收藏的系列课列表
  loadList_seriesLesson: function () {
    util.courses_bookmark(
      limit,
      offSet_series,
      "entry_date",
      "desc",
      "series_section",
      function (res) {
        console.log('收藏的系列课课节列表')
        console.log(res);
        if (res.data.success) {
          if (offSet_series) {
            //加载更多
            if (!res.data.data.length) {
              //没有更多
              that.setData({
                noMore_series: true,
              })
            } else {
              var tmpArr = that.data.arr_series.concat(res.data.data);
              that.setData({
                arr_series: tmpArr,
              });
            }
          } else {
            //刷新
            that.setData({
              arr_series: res.data.data,
            });
          }
          if (that.data.arr_series.length == res.data.paging.total) {
            that.setData({
              noMore_series: true,
            });
          }
          that.setData({
            total_series: res.data.paging.total,
          });
        }
      }
    );
  },
  //收藏的干货列表
  loadList_essay: function () {
    util.courses_bookmark(
      limit,
      offSet_essay,
      "entry_date",
      "desc",
      "article",
      function (res) {
        console.log('收藏的干货列表')
        console.log(res);
        if (res.data.success) {
          if (offSet_essay) {
            //加载更多
            if (!res.data.data.length) {
              //没有更多
              that.setData({
                noMore_essay: true,
              })
            } else {
              var tmpArr = that.data.arr_essay.concat(res.data.data);
              that.setData({
                arr_essay: tmpArr,
              });
            }
          } else {
            //刷新
            that.setData({
              arr_essay: res.data.data,
            });
          }
          if (that.data.arr_essay.length == res.data.paging.total) {
            that.setData({
              noMore_essay: true,
            });
          }
          that.setData({
            total_essay: res.data.paging.total,
          });
        }
      }
    );
  },
  //取消收藏分享课之后
  loadList_shareLessonAfterCancel:function(){
    util.courses_bookmark(
      limit + offSet_share,
      0,
      "entry_date",
      "desc",
      "course",
      function (res) {
        console.log('收藏的分享课列表')
        console.log(res);
        if (res.data.success) {
          that.setData({
            arr_share: res.data.data,
          });
          if (that.data.arr_share.length == res.data.paging.total) {
            that.setData({
              noMore_share: true,
            });
          }
          that.setData({
            total_share: res.data.paging.total,
          });
        }
      }
    );
  },
  //取消收藏系列课之后
  loadList_essayAfterCancel:function(){
    util.courses_bookmark(
      limit + offSet_series,
      0,
      "entry_date",
      "desc",
      "series_section",
      function (res) {
        console.log('收藏的系列课课节列表')
        console.log(res);
        if (res.data.success) {
          that.setData({
            arr_series: res.data.data,
          });
          if (that.data.arr_series.length == res.data.paging.total) {
            that.setData({
              noMore_series: true,
            });
          }
          that.setData({
            total_series: res.data.paging.total,
          });
        }
      }
    );
  },
  //取消收藏干货之后
  loadList_essayAfterCancel:function(){
    util.courses_bookmark(
      limit,
      offSet_essay,
      "entry_date",
      "desc",
      "article",
      function (res) {
        console.log('收藏的干货列表')
        console.log(res);
        if (res.data.success) {
          that.setData({
            arr_essay: res.data.data,
          });
          if (that.data.arr_essay.length == res.data.paging.total) {
            that.setData({
              noMore_essay: true,
            });
          }
          that.setData({
            total_essay: res.data.paging.total,
          });
        }
      }
    );
  },
  //取消收藏分享课
  cancelCollect_share:function(e){
    console.log(e);/*e.currentTarget.dataset.lesson.course_id
    e.currentTarget.dataset.lesson.title
    */
    wx.showModal({
      title: '是否取消收藏分享课:',
      content: e.currentTarget.dataset.lesson.title,
      success: function (res) {
        console.log(res);
        if (res.cancel) {
          return;
        }
        util.bookmark_cancel(
          e.currentTarget.dataset.lesson.course_id,
          "course",
          function (res) {
            if (res.data.success) {
              that.loadList_shareLessonAfterCancel();
            }
          }
        );
      }
    })
  },
  //取消收藏系列课
  cancelCollect_series: function (e) {
    console.log(e);
    wx.showModal({
      title: '是否取消收藏系列课节课:',
      content: e.currentTarget.dataset.lesson.title,
      success: function (res) {
        console.log(res);
        if (res.cancel) {
          return;
        }
        util.bookmark_cancel(
          e.currentTarget.dataset.lesson.series_section_id,
          "series_section",
          function (res) {
            if (res.data.success) {
              that.loadList_essayAfterCancel();
            }
          }
        );
      }
    })
  },
  //取消收藏干货
  cancelCollect_essay: function (e) {
    console.log(e);/*e.currentTarget.dataset.lesson.article_id
    e.currentTarget.dataset.lesson.title
    */
    wx.showModal({
      title: '是否取消收藏干货:',
      content: e.currentTarget.dataset.lesson.title,
      success: function (res) {
        console.log(res);
        if (res.cancel) {
          return;
        }
        util.bookmark_cancel(
          e.currentTarget.dataset.lesson.article_id,
          "article",
          function (res) {
            if (res.data.success) {
              that.loadList_essayAfterCancel();
            }
          }
        );
      }
    })
  },
  //展示详情
  showShareDetail:function(e){
    console.log(e);
    require('../../Home/shareDetail/shareDetail.js')
    wx.navigateTo({
      url: '../../Home/shareDetail/shareDetail?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  showSeriesDetail: function (e) {
    console.log(e);//e.currentTarget.dataset.item.node_ids[0].media_type
    if (e.currentTarget.dataset.item.node_ids[0].media_type == "audio"){
      //音频
      require('../../Home/seriesLesson/lessonDetail/lessonDetail.js')
      wx.navigateTo({
        url: '../../Home/seriesLesson/lessonDetail/lessonDetail?sc_id=' + JSON.stringify(e.currentTarget.dataset.item.series_section_id)
        + '&series_course_id=' + JSON.stringify(e.currentTarget.dataset.item.series_course.series_course_id),
      })

    }else{
    }
  },

  //干货详情
  showEssayDetail: function (e) {
    console.log('查看干货详情');
    console.log(e);
    require('../../Home/essayDetail/essayDetail.js')
    wx.navigateTo({
      url: '../../Home/essayDetail/essayDetail?article_id=' + JSON.stringify(e.currentTarget.dataset.item.article_id),
    })

  },
  /**
   * 加载更多
   */
  loadMore_share:function(){
    offSet_share += limit;
    that.loadList_shareLesson();
  },
  loadMore_series: function () {
    offSet_series += limit;
    that.loadList_seriesLesson();
  },
  loadMore_essay: function () {
    offSet_essay += limit;
    that.loadList_essay();
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