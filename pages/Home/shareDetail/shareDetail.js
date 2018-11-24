// pages/Home/qkDetail/qkDetail.js
var item = {};
let util = require('../../common/util.js');
var dataTool = require('../../common/dataTool.js')
let wxparse = require('../../../wxParse/wxParse.js')
var that;
var innerAudioContext;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    key_img:"750_421",
    lessonDetail:{},
    lessonList:[],
    shareNumber:0,
    //音频相关
    currentIndex: 1000000000000000000000000000,
    currentLeftTime: '',
    currentProgress: 0,
    currentPage:0,
    isShowShare:false,
    isFromShare:false,
  },
  showTeacherDetail:function(e){
    console.log(e.currentTarget.dataset.user)
    wx.navigateTo({
      url: '../lessonTeacherDetail/lessonTeacherDetail?user=' + JSON.stringify(e.currentTarget.dataset.user),
    })
  },
  //音频播放
  playOrPause: function (e) {

    innerAudioContext.title = that.data.lessonList[e.currentTarget.dataset.index].title;
    innerAudioContext.epname = that.data.lessonDetail.title
    innerAudioContext.singer = that.data.lessonDetail.authors[0].screen_name
    innerAudioContext.coverImgUrl = that.data.lessonList[e.currentTarget.dataset.index].cover_image.original[0].file_url
    that.setData({
      currentProgress: 0,
    })
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../../Mine/login/login',
        });
      })){
      return;
    }
    if (that.data.shareNumber < that.data.lessonDetail.goods_info.course_share_time_to_free) {
      that.showShare();
      return;
    }else{
      var index = e.currentTarget.dataset.index//
      var item = this.data.lessonList[index];
      this.setData({
        currentLeftTime: item.audioTime
      })
      if (index == this.data.currentIndex) {
        var item = this.data.lessonList[index];
        item.isPlay = !(item.isPlay);
        var tmpArr = this.data.lessonList;
        tmpArr.splice(index, 1, item);
        innerAudioContext.pause();
        innerAudioContext.src = '123'
        this.setData({
          lessonList: tmpArr,
        });
        if (item.isPlay) {
          innerAudioContext.src = this.data.lessonList[index].node_audio_link
          innerAudioContext.play();
        }
        return;
      }
      var tmpArr = [];
      for (var i in this.data.lessonList) {
        var item = this.data.lessonList[i];
        item.isPlay = false;
        if (index == i) {
          item.isPlay = true;
        }
        tmpArr.push(item);
      }
      this.setData({
        lessonList: tmpArr,
        currentIndex: index,
        currentProgress: 0,
      });
      innerAudioContext.src = this.data.lessonList[index].node_audio_link
      innerAudioContext.play();
      wx.showLoading({
        title: '数据加载中',
      })
    }
    console.log(e);
    
  },
  secondToDate: function (result) {
    var m = Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60));
    if (s < 10) {
      s = '0' + s;
    }
    return m + ':' + s;
  },
  //展示分享次数详情
  showShare:function(){
    that.setData({
      isShowShare:true,
    });
  },
  //关闭分享次数详情
  hideShare:function(){
    that.setData({
      isShowShare: false,
    });
  },
  shareLesson:function(){
    //调用接口告诉后台分享结果
    util.courses_share(
      "course",
      item.course_id,
      function(res){
        console.log('分享结果为：');
        console.log(res);
        if (res.data.success){
          that.loadLessonList();
        }
      }
    );
  },
  //加载详情
  loadDetail:function(){
    wx.showLoading({
      title: '数据加载中',
    })
    util.courses_detail(
      "",
      item.course_id,//678
      function (res) {
        console.log('分享课详情')
        console.log(res);
        wx.hideLoading()
        if (res.data.success){
          that.setData({
            lessonDetail: res.data.data,
          });
          // item.imageUrl = res.data.data.cover_image["750_421"][0].file_url;
          var itemTmp = {
            'course_id': item.course_id,
            'imageUrl': encodeURIComponent(res.data.data.cover_image["750_421"][0].file_url),
            'title': res.data.data.title,
            'author': res.data.data.authors[0].screen_name
          };
          item = itemTmp;
        }
      });
  },
  //加载列表
  loadLessonList:function(){
    wx.showLoading({
      title: '数据加载中',
    })
    util.courses_nodes_list(
      "",
      item.course_id,//678
      10,
      0,
      'entry_date',
      'desc',
      function (res) {
        console.log('分享课详情资源列表');
        console.log(res);
        wx.hideLoading()
        if (res.data.success){
          var tmpArr = [];
          for (var i in res.data.data.course_node_list) {
            var item = res.data.data.course_node_list[i];
            item.isPlay = false
            item.audioTime = dataTool.secondToDate(item.audio_duration)
            tmpArr.push(item);
          }
          console.log(tmpArr)
          that.setData({
            lessonList: tmpArr,
            shareNumber: res.data.data.number_of_shared,
          });
          if (that.data.lessonDetail.goods_info && that.data.shareNumber == that.data.lessonDetail.goods_info.course_share_time_to_free) {
            that.hideShare();
          }
        }
      }
    );
  },
  //关注用户
  careClick:function(e){
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../../Mine/login/login',
        });
      })) {
      return;
    }
    if (that.data.lessonDetail.authors[0].is_followed){
      util.users_follow_cancel(
        that.data.lessonDetail.authors[0].user_id,
        function (res) {
          if (res.data.success) {
            that.loadDetail();
          }
        }
      );
      return;
    }
    util.users_follow(
      that.data.lessonDetail.authors[0].user_id,
      function(res){
        console.log('关注结果')
        console.log(res);
        if (res.data.success){
          that.loadDetail();
        }
      }
    );
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
  collectCourse:function(){
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../../Mine/login/login',
        });
      })) {
      return;
    }
    if (that.data.lessonDetail.is_bookmark) {
      util.bookmark_cancel(
        that.data.lessonDetail.course_id,
        "course",
        function (res) {
          if (res.data.success) {
            
          }
          that.loadDetail();
        }
      );

      return;
    }
    util.bookmark(
      that.data.lessonDetail.course_id,
      "course",
      function(res){
        console.log(res);
        if (res.data.success){
          wx.showToast({
            title: '收藏成功',
          });
          that.loadDetail();
        }
      }
    );
  },
  //点赞
  likeCourse:function(){
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../../Mine/login/login',
        });
      })) {
      return;
    }
    if (that.data.lessonDetail.is_like) {
      util.like_cancel(
        that.data.lessonDetail.course_id,
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
      that.data.lessonDetail.course_id,
      function(res){
        console.log(res);
        if (res.data.success) {
          that.loadDetail();
        }
      }
    );
  },
  // 生成海报
  turnToPoster:function(e){
    console.log(e);
    var lesson = e.currentTarget.dataset.lesson;
    wx.navigateTo({
      url: '../poster/poster?title=' + JSON.stringify(lesson.title) 
      + '&sub_title=' + JSON.stringify(lesson.sub_title)
      + '&author=' + JSON.stringify('嘉宾：'+lesson.authors[0].screen_name)
      + '&course_id=' + JSON.stringify(lesson.course_id)
      + '&path=pages/Home/shareDetail/shareDetail',
    })
  },
  //跳转到音频详情
  showAudioDetail:function(e){
    console.log(e);
    //判断是否登录
    if (!util.isLogin(
      function (res) {
        wx.navigateTo({
          url: '../../Mine/login/login',
        });
      })) {
      return;
    }
    if (that.data.shareNumber < that.data.lessonDetail.goods_info.course_share_time_to_free) {
      that.showShare();
      return;
    }

    innerAudioContext.pause();
    var tmpArr = [];
    for (var i in this.data.lessonList) {
      var item1 = this.data.lessonList[i];
      item1.isPlay = false;
      tmpArr.push(item1);
    }
    this.setData({
      lessonList: tmpArr,
    });

    wx.navigateTo({
      url: '../shareDetail_PPT/shareDetail_PPT?audioList=' + JSON.stringify(e.currentTarget.dataset.audiolist)
      + '&&index=' + JSON.stringify(e.currentTarget.dataset.index)
      +'&&item=' + JSON.stringify(item),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 回到首页
   */
  backToHome:function(e){
    require('../../Home/index/index.js')
    wx.switchTab({
      url: '../../Home/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    }); 
    wx.showShareMenu({
      withShareTicket: true
    })
    that = this;
    console.log('分享课详情');
    console.log('options'+options);
    if (options.scene){
      var scene = decodeURIComponent(options.scene)
      item.course_id = scene;
      that.setData({
        isFromShare:true,
      })
    }else{
      console.log(JSON.parse(options.item));
      item = JSON.parse(options.item);
      if (getApp().globalData.isFromShare) {
        that.setData({
          isFromShare: true,
        })
      }else{
        that.setData({
          isFromShare: false,
        })
      }
      getApp().globalData.isFromShare = false;
    }
    this.loadDetail();
    this.loadLessonList();
  },
  _MusicPlay: function (e) {
    /*
    console.log(e);
    
    var index = e.detail.index;
    var tmpArr = [];
    for (var i in that.data.lessonList) {
      var item = that.data.lessonList[i];
      item.isPlay = false
      if (index == i) {
        item.isPlay = true;
      }
      tmpArr.push(item);
    }
    that.setData({
      lessonList: tmpArr,
      currentPage:index,
    });
    */
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    innerAudioContext = wx.getBackgroundAudioManager()//wx.createInnerAudioContext()//
    // innerAudioContext.src = ""
    // innerAudioContext.title = 'hello'
    // innerAudioContext.epname = 'world'
    // innerAudioContext.singer = '拿破仑'

    // wx.getBackgroundAudioManager().title = '此时此刻'
    // wx.getBackgroundAudioManager().epname = '此时此刻'
    // wx.getBackgroundAudioManager().singer = '许巍'
    // wx.getBackgroundAudioManager().coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'

    // wx.getBackgroundAudioManager().src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    
  },
  formSubmit:function(e){
    console.log('表单提交')
    getApp().globalData.formId = e.detail.formId;
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that.loadDetail();
    // that.loadLessonList();
    innerAudioContext = wx.getBackgroundAudioManager()
    innerAudioContext.autoPlay = false;
    innerAudioContext.onPlay(() => {
      wx.hideLoading()
      console.log('开始播放');
      that.setData({
        currentProgress:0,
      })
    });
    innerAudioContext.onPause(() => {
      console.log('播放暂停');
      that.setData({
        currentProgress: 0,
      })
    });
    innerAudioContext.onStop(() => {
      console.log('播放停止');
      that.setData({
        currentProgress: 0,
      });
    });
    innerAudioContext.onTimeUpdate(() => {
      // console.log(that.secondToDate(innerAudioContext.duration - innerAudioContext.currentTime))
      that.setData({
        currentLeftTime: that.secondToDate(innerAudioContext.duration - innerAudioContext.currentTime),
        currentProgress: innerAudioContext.currentTime / innerAudioContext.duration * 100
      });
      // console.log(that.data.currentProgress);
    });
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    innerAudioContext.onEnded(() => {
      console.log('播放结束')
      that.setData({
        currentProgress: 0,
      });
      var currentPage1 = that.data.currentIndex + 1;
      if (currentPage1 <= that.data.lessonList.length - 1) {
        that.setData({
          currentIndex: currentPage1,
        });
        var tmpArr = [];
        for (var i in this.data.lessonList) {
          var item = this.data.lessonList[i];
          item.isPlay = false;
          if (currentPage1 == i) {
            item.isPlay = true;
          }
          tmpArr.push(item);
        }
        this.setData({
          lessonList: tmpArr,
          currentProgress: 0,
        });
        innerAudioContext.title = that.data.lessonDetail.title;
        innerAudioContext.epname = '此时此刻'
        innerAudioContext.singer = that.data.lessonDetail.authors[0].screen_name
        innerAudioContext.coverImgUrl = that.data.lessonList[that.data.currentIndex].cover_image.original[0].file_url
        innerAudioContext.src = that.data.lessonList[that.data.currentIndex].node_audio_link
        innerAudioContext.play();
        wx.pageScrollTo({
          scrollTop: 630 + 300 * that.data.currentIndex,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // innerAudioContext.pause();
    // var tmpArr = [];
    // for (var i in this.data.lessonList) {
    //   var item = this.data.lessonList[i];
    //   item.isPlay = false;
    //   tmpArr.push(item);
    // }
    // this.setData({
    //   lessonList: tmpArr,
    // });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    innerAudioContext.pause();
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
  onShareAppMessage: function (options) {
    console.log('已分享');
    console.log(options);

    return {
      title: that.data.lessonDetail.title,
      path: 'pages/Home/shareDetail/shareDetail?item=' + JSON.stringify(item),
      imageUrl: that.data.lessonDetail.cover_image["750_421"][0].file_url,
      success: function (res) {
        // 转发成功
        console.log("转发成功");
        console.log(res);
        if(res.shareTickets){
          //已经转发到了群里
          that.shareLesson();
        }
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
        console.log(res);
      }
    }

  },
  preventTap:function(){

  }
})