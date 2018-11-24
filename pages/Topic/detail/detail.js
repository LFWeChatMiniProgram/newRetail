// pages/Topic/detail/detail.js
var util = require('../../common/util.js')
var dataTool = require('../../common/dataTool.js');
var that;
var topic={};
var limit_teachers = 4;
var offSet_teachers = 0;

var limit_lesson = 5;
var offSet_share = 0;
var offSet_series = 0;
var offSet_essay = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic:{},
    isShare: true,
    isSeries: false,
    isEssay: false,
    data_teachers:[],
    data_series:[],
    data_essay:[],
    leftH: 0,
    rightH: 0,
    leftArr: [],
    rightArr: [],
    noMore_Teachers:false,
    noMore_share:false,
    noMore_series:false,
    noMore_essay:false,

    total_share:0,
    total_series:0,
    total_essay:0,
  },
  _segmentClick: function (e) {
    console.log('segment')
    console.log(e);
    switch (e.detail.tapIndex) {
      case 0:
        console.log('分享课');
        this.setData({
          isShare: true,
          isSeries: false,
          isEssay: false,
        });
        break;
      case 1:
        console.log('系列课');
        this.setData({
          isShare: false,
          isSeries: true,
          isEssay: false,
        });
        break;
      case 2:
        console.log('干货');
        this.setData({
          isShare: false,
          isSeries: false,
          isEssay: true,
        });
        break;
    }
  },
  showTeacherDetail:function(e){
    console.log('行业专家')  
    console.log(e);
    wx.navigateTo({
      url: '../../Home/lessonTeacherDetail/lessonTeacherDetail?user=' + JSON.stringify(e.currentTarget.dataset.user),
    })
  },
  _showShareLessonDetail: function (e) {
    wx.navigateTo({
      url: '../../Home/shareDetail/shareDetail?item=' + JSON.stringify(e.detail.item),
    })
  },
  _showSeriesIntroduce: function (e) {
    wx.navigateTo({
      url: '../../Home/seriesLesson/introduce/introduce?item=' + JSON.stringify(e.detail.item),
    })
  },
  _showEssayDetail: function (e) {
    wx.navigateTo({
      url: '../../Home/essayDetail/essayDetail?article_id=' + JSON.stringify(e.detail.item.article_id),
    })
  },
  _collectSuccess: function () {
    //请求干货列表
    util.tag_article_list(
      "",
      "",
      100,
      0,
      topic.tag_id,
      function (res) {
        that.setData({
          data_essay: that.dealWithData(res.data.data),
        });
      }
    );
  },
  _likeSuccess: function () {
    //请求干货列表
    util.tag_article_list(
      "",
      "",
      100,
      0,
      topic.tag_id,
      function (res) {
        that.setData({
          data_essay: that.dealWithData(res.data.data),
        });
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    topic = JSON.parse(options.topic);
    console.log(topic);
    that.setData({
      topic:topic,
    });
    wx.setNavigationBarTitle({
      title: topic.title,
    })
    offSet_teachers = 0;
    offSet_share = 0;
    offSet_series = 0;
    offSet_essay = 0;

    //请求详情
    that.loadDetail();
    //请求干货列表
    that.loadEssayList();
    //请求分享课
    that.loadShareList();
    //行业专家
    that.loadTeachers();
  },
  //请求行业专家
  loadTeachers:function(){
    util.tags_users(
      limit_teachers,
      offSet_teachers,
      "entry_date",
      "desc",
      topic.tag_id,
      function (res) {
        console.log('行业专家');
        console.log(res);
        if (res.data.success){
          if(offSet_teachers){
            //加载更多
            var tmpArr = that.data.data_teachers.concat(res.data.data)
            that.setData({
              data_teachers: tmpArr,
            });
            if (!res.data.data.length){
              //没有更多
              that.setData({
                noMore_Teachers: true
              })
            }
          }else{
            //刷新
            that.setData({
              data_teachers: res.data.data,
            });
          }
          if (that.data.data_teachers.length == res.data.paging.total) {
            that.setData({
              noMore_Teachers: true,
            });
          }
        }
      }
    );
  },
  //请求分享课列表
  loadShareList:function(){
    util.tags_courses(
      "",
      "",
      limit_lesson,
      offSet_share,
      "entry_date",
      "desc",
      topic.tag_id,
      function (res) {
        if (res.data.success) {
          if (offSet_share == 0) {
            that.setData({
              leftH: 0,
              rightH: 0,
              leftArr: [],
              rightArr: [],
            });
          } else {
            if (!res.data.data.length) {
              that.setData({
                noMore_share: true,
              });
            }
          }
          var arr = dataTool.dealWithData_shareLessonList(res.data.data, that.data.leftH, that.data.rightH, that.data.leftArr, that.data.rightArr);
          console.log(res);
          console.log(arr);
          that.setData({
            leftH: arr[0],
            rightH: arr[1],
            leftArr: arr[2],
            rightArr: arr[3],
          });
          if ((that.data.leftArr.length + that.data.rightArr.length) == res.data.paging.total) {
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
  //请求系列课列表
  loadSeriesList:function(){
    //请求系列课
    util.tags_series_courses(
      "",
      "",
      "",
      "",
      limit_lesson,
      offSet_series,
      topic.tag_id,
      function (res) {
        console.log('话题下的系列课表')
        console.log(res);
        if(res.data.success){
          if(offSet_series == 0){
            //刷新
            that.setData({
              data_series: res.data.data,
            });
          }else{
            //加载更多
            var tmpArr = that.data.data_series.concat(res.data.data);
            if (!res.data.data.length){
              //没有更多
              that.setData({
                noMore_series:true,
              });
            }
            that.setData({
              data_series:tmpArr,
            })
          }
          if (that.data.data_series.length == res.data.paging.total) {
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
  //请求干货列表
  loadEssayList:function(){
    util.tag_article_list(
      "",
      "",
      limit_lesson,
      offSet_essay,
      topic.tag_id,
      function (res) {
        console.log('话题下的干货列表')
        console.log(res)
        if(res.data.success){
          if(offSet_essay == 0){
            //刷新
            that.setData({
              data_essay: that.dealWithData(res.data.data),
            });
          }else{
            //加载更多
            var tmpArr = that.data.data_essay.concat(res.data.data);
            tmpArr = that.dealWithData(tmpArr);
            if (!res.data.data.length) {
              //没有更多
              that.setData({
                noMore_essay: true,
              });
            }
            that.setData({
              data_essay: tmpArr,
            })
          }
          if (that.data.data_essay.length == res.data.paging.total) {
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
  dealWithData: function (data) {
    var tmpArr = [];
    for (var i in data) {
      var item = data[i];
      item.pubTime = dataTool.dealWithTimeForEssay(item.time_published);
      tmpArr.push(item);
    }
    return tmpArr;
  },
  /**
 * 加载更多
 */
  loadMoreTeachers: function () {
    offSet_teachers += limit_teachers;
    that.loadTeachers();
  },
  loadMoreShare:function(){
    offSet_share += limit_lesson;
    that.loadShareList();
  },
  loadMoreSeriesList:function(){
    offSet_series += limit_lesson;
    that.loadSeriesList();
  },
  loadMoreEssayList:function(){
    offSet_essay += limit_lesson;
    that.loadEssayList();
  },
  //请求详情
  loadDetail:function(){
    util.tags_detail(
      topic.tag_id,
      function (res) {
        console.log('话题详情')
        console.log(res)
        if (res.data.success) {
          that.setData({
            topic: res.data.data,
          });
        }
      }
    );
  },
  formSubmit: function (e) {
    console.log('表单提交')
    getApp().globalData.formId = e.detail.formId;
    console.log(e)
  },
  //关注话题
  careTopic: function () {
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../../Mine/login/login',
        });
      })) {
      return;
    }
    if (that.data.topic.is_followed){
      util.tags_follow_cancel(
        topic.tag_id,
        function (res) {
          if (res.data.success) {
            that.loadDetail();
          }
        }
      );
      return;
    }
    util.tags_follow(
      topic.tag_id,
      function(res){
        console.log('话题关注结果为');
        if(res.data.success){
          that.loadDetail();
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
    that.loadDetail();
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
  // onShareAppMessage: function () {
  
  // }
})