// pages/Home/essay/essay.js
var util = require('../../common/util.js')
let wxparse = require('../../../wxParse/wxParse.js')
var that;
var article_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    isFromShare:false,
  },
  loadDetail:function(){
    util.article_detail(
      "",
      "",
      article_id,
      function (res) {
        console.log(res);
        wxparse.wxParse('main', 'html', res.data.data.main, that, 5);
        wxparse.wxParse('summary', 'html', res.data.data.summary, that, 5);
        that.setData({
          info: res.data.data,
        });
      }
    );
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
    if (that.data.info.authors[0].is_followed) {
      util.users_follow_cancel(
        that.data.info.authors[0].user_id,
        function (res) {
          if (res.data.success) {
            var info = that.data.info;
            info.authors[0].is_followed = false;
            that.setData({
              info: info,
            });
            that.loadDetail();
          }
        }
      );
      return;
    }
    util.users_follow(
      that.data.info.authors[0].user_id,
      function (res) {
        console.log('关注结果')
        console.log(res);
        if (res.data.success) {
          var info = that.data.info;
          info.authors[0].is_followed = true;
          that.setData({
            info: info,
          });
          that.loadDetail();
        }
      }
    );
  },
  /**
     * 回到首页
     */
  backToHome: function (e) {
    require('../../Home/index/index.js')
    wx.switchTab({
      url: '../../Home/index/index',
    })
  },
  //查看话题详情
  showTopicDetail: function (e) {
    console.log(e);
    require('../../Topic/detail/detail.js')
    wx.navigateTo({
      url: '../../Topic/detail/detail?topic=' + JSON.stringify(e.currentTarget.dataset.topic),
    })
  },
  //收藏
  collectCourse: function () {
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../../Mine/login/login',
        });
      })) {
      return;
    }
    if (that.data.info.is_bookmark) {
      util.bookmark_cancel(
        that.data.info.article_id,
        "article",
        function (res) {
          if (res.data.success) {
            that.loadDetail();
          }
        }
      );
      return;
    }
    util.bookmark(
      that.data.info.article_id,
      "article",
      function (res) {
        console.log(res);
        if (res.data.success) {
          wx.showToast({
            title: '收藏成功',
          });
          
        }
        that.loadDetail();
      }
    );
  },
  //点赞
  likeCourse: function () {
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../../Mine/login/login',
        });
      })) {
      return;
    }
    if (that.data.info.is_like) {
      util.like_cancel(
        that.data.info.article_id,
        function (res) {
          console.log(res);
          if (res.data.success) {
            // that.loadDetail();
          }
          that.loadDetail();
        }
      );
      return;
    }
    util.like(
      that.data.info.article_id,
      function (res) {
        console.log(res);
        if (res.data.success) {
          that.loadDetail();
        }
      }
    );
  },

  // 生成海报
  turnToPoster: function (e) {
    console.log(e);
    var lesson = e.currentTarget.dataset.lesson;
    wx.navigateTo({
      url: '../poster/poster?title=' + JSON.stringify(lesson.title)
      + '&sub_title=' + JSON.stringify(lesson.sub_title ? lesson.sub_title:"")
      + '&author=' + JSON.stringify('作者：'+lesson.authors[0].screen_name)
      + '&course_id=' + JSON.stringify(lesson.article_id)
      + '&path=pages/Home/essayDetail/essayDetail',
    })
  },
  // 讲师详情
  showTeacherDetail: function (e) {
    console.log(e.currentTarget.dataset.user)
    wx.navigateTo({
      url: '../lessonTeacherDetail/lessonTeacherDetail?user=' + JSON.stringify(e.currentTarget.dataset.user),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log('干货详情')
    // 获得高度
    wx.getSystemInfo({
      success: function (res) {
        let winHeight = res.windowHeight;
        console.log(winHeight);
        that.setData({
          dkheight: winHeight - winHeight * 0.05 - 80
        })
      }
    })
    if (options.scene) {
      var scene = decodeURIComponent(options.scene)
      article_id = scene;
      that.setData({
        isFromShare: true,
      })
    } else {
      article_id = JSON.parse(options.article_id)
      console.log(JSON.parse(options.article_id));//JSON.parse(options.item)
      if (getApp().globalData.isFromShare) {
        that.setData({
          isFromShare: true,
        })
      }
      getApp().globalData.isFromShare = false;
      
    }
    that.loadDetail();
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
  onShareAppMessage: function () {
    return {
      title: that.data.info.title,
      path: 'pages/Home/essayDetail/essayDetail?article_id=' + JSON.stringify(article_id),
      success: function (res) {
        // 转发成功
        console.log("转发成功");
        console.log(res);
        if (res.shareTickets) {
          //已经转发到了群里
        }
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
        console.log(res);
      }
    }
  }
})