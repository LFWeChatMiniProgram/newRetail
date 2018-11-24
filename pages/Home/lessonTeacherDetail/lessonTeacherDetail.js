// pages/Home/lessonTeacherDetail/lessonTeacherDetail.js
let util = require('../../common/util.js')
let dataTool = require('../../common/dataTool.js')
var that;
var user={};
var limit = 5;
var offSet_share = 0;
var offSet_series = 0;
var offSet_essay = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShare:true,
    isSeries:false,
    isEssay:false,
    info:{},
    data_share:[],
    data_series: [],
    data_essay: [],
    leftH: 0,
    rightH: 0,
    leftArr: [],
    rightArr: [],
    noMore_share: false,
    noMore_series: false,
    noMore_essay: false,

    total_share: 0,
    total_series:0,
    total_essay: 0,
  },
// 
  _showShareLessonDetail:function(e){
    wx.navigateTo({
      url: '../shareDetail/shareDetail?item=' + JSON.stringify(e.detail.item),
    })
  },
  _showSeriesIntroduce:function(e){
    wx.navigateTo({
      url: '../seriesLesson/introduce/introduce?item=' + JSON.stringify(e.detail.item),
    })
  },
  _showEssayDetail: function (e) {
    wx.navigateTo({
      url: '../essayDetail/essayDetail?article_id=' + JSON.stringify(e.detail.item.article_id),
    })
  },
  _collectSuccess: function () {
    //用户下的干货列表
    util.user_article_list(
      "",
      limit*(offSet_essay + 1),
      0,
      "entry_date",
      "desc",
      user.user_id,
      function (res) {
        that.setData({
          data_essay: that.dealWithData(res.data.data),
        });
      }
    );
  },
  _likeSuccess: function () {
    //用户下的干货列表
    util.user_article_list(
      "",
      limit * (offSet_essay + 1),
      0,
      "entry_date",
      "desc",
      user.user_id,
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
    console.log(JSON.parse(options.user));
    user = JSON.parse(options.user)
    offSet_share = 0;
    offSet_series = 0;
    offSet_essay = 0;
//用户的公开信息
    util.user_info(
      user.user_id,
      function(res){
        console.log('用户的公开信息');
        console.log(res);
        that.setData({
          info:res.data.data,
        });
        wx.setNavigationBarTitle({
          title: that.data.info.screen_name,
        })
    });
//用户下的分享课列表
    that.loadShareList();
//用户下的系列课列表
    that.loadSeriesList();
//用户下的干货列表
    that.loadEssayList();
  },
  formSubmit: function (e) {
    console.log('表单提交')
    getApp().globalData.formId = e.detail.formId;
    console.log(e)
  },
  //关注用户
  careClick: function (e) {
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../../Mine/login/login',
        });
      })) {
      return;
    }
    if (that.data.info.is_followed) {
      util.users_follow_cancel(
        user.user_id,
        function (res) {
          if (res.data.success) {
            var info = that.data.info;
            info.is_followed = false;
            that.setData({
              info: info,
            });
            util.user_info(
              user.user_id,
              function (res) {
                console.log('用户的公开信息');
                console.log(res);
                that.setData({
                  info: res.data.data,
                });
              });
          }
        }
      );
      return;
    }
    util.users_follow(
      user.user_id,
      function (res) {
        console.log('关注结果')
        console.log(res);
        if (res.data.success) {
          var info = that.data.info;
          info.is_followed = true;
          that.setData({
            info: info,
          });
          util.user_info(
            user.user_id,
            function (res) {
              console.log('用户的公开信息');
              console.log(res);
              that.setData({
                info: res.data.data,
              });
            });
        }
      }
    );
  },
  loadShareList:function(){
    //用户下的分享课列表
    util.user_courses(
      "",
      "",
      limit,
      offSet_share,
      "entry_date",
      "desc",
      user.user_id,
      function (res) {
        console.log('分享课请求结果');
        console.log(res)
        if(res.data.success){
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
          var tmpArr = arr[2].concat(arr[3])
          that.setData({
            leftH: arr[0],
            rightH: arr[1],
            leftArr: arr[2],
            rightArr: arr[3],
            data_share: tmpArr,
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
  loadSeriesList:function(){
    //用户下的系列课列表
    util.user_series_courses(
      "",
      "",
      limit,
      offSet_series,
      "entry_date",
      "desc",
      user.user_id,
      function (res) {
        if (res.data.success) {
          if (offSet_series == 0) {
            //刷新
            that.setData({
              data_series: res.data.data,
            });
          } else {
            //加载更多
            var tmpArr = that.data.data_series.concat(res.data.data);
            if (!res.data.data.length) {
              //没有更多
              that.setData({
                noMore_series: true,
              });
            }
            that.setData({
              data_series: tmpArr,
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
  loadEssayList:function(){
    //用户下的干货列表
    util.user_article_list(
      "",
      limit,
      offSet_essay,
      "entry_date",
      "desc",
      user.user_id,
      function (res) {
        if (res.data.success) {
          if (offSet_essay == 0) {
            //刷新
            that.setData({
              data_essay: that.dealWithData(res.data.data),
            });
          } else {
            //加载更多
            var tmpArr = that.data.data_essay.concat(res.data.data);
            tmpArr = that.dealWithData(tmpArr)
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
  /**
   * 加载更多
  */
  loadMore_share: function () {
    offSet_share += limit;
    that.loadShareList();
  },
  loadMore_series: function () {
    offSet_series += limit;
    that.loadSeriesList();
   },
  loadMore_essay: function () {
    offSet_essay += limit;
    that.loadEssayList();
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //用户的公开信息
    util.user_info(
      user.user_id,
      function (res) {
        console.log('用户的公开信息');
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
  // onShareAppMessage: function () {
  
  // }
})