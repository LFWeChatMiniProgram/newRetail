// pages/Home/index/index.js
var util = require('../../common/util.js');
var that;
var dataTool = require('../../common/dataTool.js');
var offSet_share = 0;
var offSet_series = 0;
var offSet_share_my = 0;
var offSet_series_my = 0;
var limit_my = 5;
/**
 * 登录相关
 */
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    isShare:true,
    isSeries:false,
    isMine:false,
    shareDataSource:[],//分享课数据源
    topicList:[],
    seriesDataSource:[],//系列课数据源
    myDataSource:[],//我的课数据源
    leftH:0,
    rightH:100,
    leftArr:[],
    rightArr:[],
    noMore_share:false,
    noMore_series:false,
    //
    data_series_my: [],//系列课数据源
    myDataSource_my: [],//我的课数据源
    noMore_share:false,
    noMore_series:false,
    leftH_my: 0,
    rightH_my: 0,
    leftArr_my: [],
    rightArr_my: [],
    total_myShare:0,
    total_MySeries:0,
    //登录相关
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
    /////////
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.beginLogin();
    // if (!this.data.hasUserInfo && this.data.canIUse){
    //   wx.navigateTo({
    //     url: '../../Mine/login/login',
    //   })
    // }
    that = this;
    that.loadShareList();
    
    // that.loadSeriesList();
  },
  loadShareList:function(){
    // wx.showLoading({
    //   title: '数据加载中',
    // })
    //分享课列表
    util.courses(
      '',
      10,
      offSet_share,
      'entry_date',
      'desc',
      function (res) {
        console.log('分享课列表');
        wx.stopPullDownRefresh();
        console.log(res);
        if (res.data.success){
          that.setData({
            shareDataSource: res.data.data,
          });//['leftH', 'rightH', 'leftArr', 'rightArr']
          if(offSet_share == 0){
            that.setData({
              leftH: 0,
              rightH: 100,
              leftArr: [],
              rightArr: [],
            });
          }else{
            if (!res.data.data.length){
              // wx.showToast({
              //   title: '没有更多',
              // })
              that.setData({
                noMore_share: true,
              });
            }
          }
          var arr = dataTool.dealWithData_shareLessonList(res.data.data, that.data.leftH, that.data.rightH, that.data.leftArr, that.data.rightArr);
          console.log(arr);
          that.setData({
            leftH: arr[0],
            rightH: arr[1],
            leftArr: arr[2],
            rightArr: arr[3],
          });
        }else{
          that.loadShareList();
        }
      }
    );
    util.recommend_course_tags(
      '',
      8,
      0,
      'entry_date',
      'desc',
      function (res) {
        if(res.data.success){
          console.log('首页关键词列表')
          console.log(res.data.data);
          that.setData({
            topicList: res.data.data,
          });
        }
      }
    );
  },
  loadSeriesList: function(){
    // wx.showLoading({
    //   title: '数据加载中',
    // })
    //系列课列表
    util.series_courses(
      '',
      10,
      offSet_series,
      'entry_date',
      'desc',
      function (res) {
        wx.stopPullDownRefresh();
        console.log('系列课列表');
        console.log(res);
        if (res.data.success){
          var tmpArr = res.data.data;
          if (!offSet_series) {//刷新
            that.setData({
              seriesDataSource: res.data.data,
            });
          }else{//加载更多
            if(tmpArr.length){
              that.data.seriesDataSource.join(tmpArr)
              that.setData({
                seriesDataSource: that.data.seriesDataSource,
              });
            }else{
              // wx.showToast({
              //   title: '没有更多',
              // })
              that.setData({
                noMore_series: true,
              });
            }
          }
        }else{
          // that.loadSeriesList();
        }
      }
    );
  },
  ///获取我的课程列表
  getMyLessonList: function () {
    that.getMyShareList();
    that.getMySeriesList();
  },
  getMyShareList:function(){
    //用户下的分享课列表
    util.courses_mylearned(
      "",
      "",
      limit_my,
      offSet_share_my,
      "entry_date",
      "desc",
      function (res) {
        console.log('我的分享课列表')
        console.log(res);
        if (res.data.success) {
          if (offSet_share_my == 0) {
            that.setData({
              leftH_my: 0,
              rightH_my: 0,
              leftArr_my: [],
              rightArr_my: [],
            });
          } else {
            if (!res.data.data.length) {
              that.setData({
                noMore_share:true,
              });
            }
          }
          var arr = dataTool.dealWithData_shareLessonList(res.data.data, 0, 0, that.data.leftArr_my, that.data.rightArr_my);
          that.setData({
            leftH_my: arr[0],
            rightH_my: arr[1],
            leftArr_my: arr[2],
            rightArr_my: arr[3],
          });
          if ((that.data.leftArr_my.length + that.data.rightArr_my.length) == res.data.paging.total) {
            that.setData({
              noMore_share: true,
            });
          }
          that.setData({
            total_myShare: res.data.paging.total,
          });
        }
      }
    );
  },
  getMySeriesList:function(){
    //用户下的系列课列表
    util.series_courses_mylearned(
      "",
      "",
      limit_my,
      offSet_share_my,
      "entry_date",
      "desc",
      function (res) {
        wx.hideLoading();
        if (res.data.success) {
          console.log('我的系列课列表')
          console.log(res);
          var tmpArr = res.data.data;
          if (!offSet_series_my) {//刷新
            that.setData({
              data_series_my: res.data.data,
            });
          } else {//加载更多
            if (tmpArr.length) {
              that.data.data_series_my.join(tmpArr)
              that.setData({
                data_series_my: that.data.data_series_my,
              });
            } else {
              wx.showToast({
                title: '没有更多',
              })
              that.setData({
                noMore_series:true,
              });
            }
          }
          if (that.data.data_series_my.length == res.data.paging.total){
            that.setData({
              noMore_series: true,
            });
          }
          that.setData({
            total_MySeries: res.data.paging.total,
          });
        }
      }
    );
  },
  /**
   * 加载更多
   */
  loadMore_share:function(e){
    offSet_share_my += limit_my;
    that.getMyShareList();
  },
  loadMore_series:function(e){
    offSet_series_my += limit_my;
    that.getMySeriesList();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(function () {
      if (!util.isLogin(
        function (res) {
          wx.navigateTo({
            url: '../../Mine/login/login',
          });
        })) {
        return;
      }
    }, 2000);
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
    /**
     * isShare:true,
    isSeries:false,
    isMine:false,
     */
    
    if (that.data.isShare){
      offSet_share = 0;
      that.setData({
        noMore_share:false,
      });
      that.loadShareList();
    }
    if (that.data.isSeries) {
      offSet_series = 0
      that.setData({
        noMore_series: false
      });
      that.loadSeriesList();
    }
    if (that.data.isMine) {
      // that.getMyLessonList();
      wx.stopPullDownRefresh();
    }
  },
  refresh_share:function(e){
    console.log(e);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (that.data.isShare) {
      console.log('分享课上拉加载更多');
      offSet_share +=10;
      that.loadShareList();
    }
    if (that.data.isSeries) {
      offSet_series +=10;
      console.log('系列课上拉加载更多');
      that.loadSeriesList();
    }
    if (that.data.isMine) {
      console.log('上拉加载更多');
      // that.getMyLessonList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 点击顶部item事件
   */
  //课程选择
  lessonSegmentClick: function (e) {
    that.setData({
      noMore_share: false,
      noMore_series: false,
    });
    if (e.currentTarget.dataset.tag == 0) {
      //分享课
      if (!that.data.isShare){
        offSet_share = 0;
        that.loadShareList();
      }
      this.setData({
        isShare: true,
        isSeries: false,
        isMine: false,
      });
    }
    if (e.currentTarget.dataset.tag == 1) {
      //系列课
      if (!that.data.isSeries) {
        offSet_series = 0;
        that.loadSeriesList();
      }
      this.setData({
        isShare: false,
        isSeries: true,
        isMine: false,
      });
    }
    if (e.currentTarget.dataset.tag == 2) {
      offSet_share_my = 0;
      offSet_series_my = 0;
      that.setData({
        noMore_series: false,
        noMore_share:false,
      });
      //我的课
      if (!that.data.isMine) {
        if (!util.isLogin(
          function (res) {
            wx.navigateTo({
              url: '../../Mine/login/login',
            });
          })) {
          return;
        }
        that.getMyLessonList();
      }
      this.setData({
        isShare: false,
        isSeries: false,
        isMine: true,
      });
    }
  },
  /**
   * 展示详情
   */
  //分享课详情
  _showShareLessonDetail: function (e) {
    console.log('-------------');
    console.log(e);
    wx.navigateTo({
      url: '../shareDetail/shareDetail?item=' + JSON.stringify(e.detail.item),
    })
  },
  // 系列课详情
  _showSeriesIntroduce: function (e) {
    wx.navigateTo({
      url: '../seriesLesson/introduce/introduce?item=' + JSON.stringify(e.detail.item)
    })
  },
  _showEssayDetail: function (e) {
    wx.navigateTo({
      url: '../essayDetail/essayDetail',
    })
  },
  _showMoreTopic: function (e) {
    require('../../Topic/detail/detail.js')
    wx.switchTab({
      url: '../../Topic/index/index',
    })
  },
  _showTopicDetail: function (e) {
    wx.navigateTo({
      url: '../../Topic/detail/detail?topic=' + JSON.stringify(e.detail.topic),
    })
  },
/**
 * 登录相关
 */
  // beginLogin: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //     that.login();//调用服务器登录接口
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       app.globalData.encryptedData = res.encryptedData;
  //       app.globalData.iv = res.iv;
  //       app.globalData.userInfo = res.userInfo,
  //       console.log('canIUse时获取到的用户信息')
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       });
  //       that.login();//调用服务器登录接口
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.encryptedData = res.encryptedData;
  //         app.globalData.iv = res.iv;
  //         console.log('非canIUse时获取到的用户信息')
  //         console.log(res)
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //         that.login();//调用服务器登录接口
  //       }
  //     })
  //   }
  // },
  // //调用服务器登录接口
  // login:function(){
  //   util.minapp_login(
  //     app.globalData.code,
  //     app.globalData.encryptedData,
  //     app.globalData.iv,
  //     function (res) {
  //       console.log("登录结果为：")
  //       console.log(res)
  //       if (res.data.success){
  //         app.globalData.loginInfo = res.data.data
  //         that.getMyLessonList();
  //       }else
  //       {
  //         // that.login();
  //       }
  //     }
  //   );
  // },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   if (!(e.detail.errMsg == 'getUserInfo:ok')) {
  //     //拒绝授权
  //     this.setData({
  //       hasUserInfo: true
  //     })
  //     return;
  //   }
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  //   app.globalData.encryptedData = e.detail.encryptedData;
  //   app.globalData.iv = e.detail.iv;
  //   util.minapp_login(
  //     app.globalData.code,
  //     app.globalData.encryptedData,
  //     app.globalData.iv,
  //     function (res) {
  //       console.log("登录结果为：")
  //       console.log(res)
  //       app.globalData.loginInfo = res.data.data
  //       that.getMyLessonList();
  //     }
  //   );
  // },
  preventTouchMove:function(){
    
  },
/////////////////////////////////

})
