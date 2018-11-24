// pages/Home/shareDetail_PPT/shareDetail_PPT.js
var that;
var innerAudioContext;
var item = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:true,
    currentProgress:0,
    currentPage:0,
    currentLeftTime:'',
    audioList:[],
    currentPPTItem:{},
  },
  secondToDate: function (result) {
    var m = Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60));
    if (s < 10) {
      s = '0' + s;
    }
    return m + ':' + s;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log(JSON.parse(options.audioList));
    console.log(JSON.parse(options.index));
    item = JSON.parse(options.item)
    wx.setNavigationBarTitle({
      title: item.title,
    })
    console.log('item'+item)
    item.imageUrl = decodeURIComponent(item.imageUrl);
    that.setData({
      audioList: JSON.parse(options.audioList),
      currentPage: JSON.parse(options.index),
    });
    that.setData({
      currentLeftTime: that.data.audioList[that.data.currentPage].audioTime,
    });
    innerAudioContext = wx.getBackgroundAudioManager()//wx.createInnerAudioContext()//
    innerAudioContext.title = that.data.audioList[that.data.currentPage].title;
    innerAudioContext.epname = item.title;
    innerAudioContext.singer = item.author;
    innerAudioContext.coverImgUrl = that.data.audioList[that.data.currentPage].cover_image.original[0].file_url;
    innerAudioContext.src = that.data.audioList[that.data.currentPage].node_audio_link
    innerAudioContext.autoPlay = true;
    innerAudioContext.onPlay(() => {
      wx.hideLoading()
      console.log('开始播放');
      that.setData({
        isPlay:true,
      });
    });
    innerAudioContext.onPause(() => {
      console.log('播放暂停');
      that.setData({
        isPlay: false,
      });
    });
    innerAudioContext.onStop(() => {
      console.log('播放停止');
    });
    innerAudioContext.onEnded(()=>{
      console.log('播放结束')
      that.setData({
        isPlay: false,
      });
      var currentPage1 = that.data.currentPage + 1;
      if (currentPage1 <= that.data.audioList.length - 1) {
        that.setData({
          currentPage: currentPage1,
        });
        innerAudioContext.title = that.data.audioList[that.data.currentPage].title;
        innerAudioContext.epname = item.title;
        innerAudioContext.singer = item.author;
        innerAudioContext.coverImgUrl = that.data.audioList[that.data.currentPage].cover_image.original[0].file_url;
        innerAudioContext.src = that.data.audioList[that.data.currentPage].node_audio_link
      }
    })
    innerAudioContext.onTimeUpdate(() => {
      that.setData({
        currentLeftTime: that.secondToDate(innerAudioContext.duration - innerAudioContext.currentTime),
        currentProgress: innerAudioContext.currentTime / innerAudioContext.duration * 100
      });
    });
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    if (that.data.audioList[that.data.currentPage].have_audio){
      wx.showLoading({
        title: '数据缓冲中',
      })
    }
    that.setData({
      currentPPTItem: that.data.audioList[that.data.currentPage],
    });
    innerAudioContext.play();
    console.log(innerAudioContext.src);
  },
  //ppt滑动事件
  swiperClick:function(e){
    console.log('切换PPT');
    that.setData({
      currentPage: e.detail.current,
      currentLeftTime: that.data.audioList[e.detail.current].audioTime,
    });
    innerAudioContext.pause();
    innerAudioContext.title = that.data.audioList[that.data.currentPage].title;
    innerAudioContext.epname = item.title;
    innerAudioContext.singer = item.author;
    innerAudioContext.coverImgUrl = that.data.audioList[that.data.currentPage].cover_image.original[0].file_url;
    innerAudioContext.src = that.data.audioList[that.data.currentPage].node_audio_link
    if (that.data.audioList[that.data.currentPage].have_audio) {
      wx.showLoading({
        title: '数据缓冲中',
      })
    }
    that.setData({
      currentPPTItem: that.data.audioList[that.data.currentPage],
    });
    innerAudioContext.play();
    
  },
  //音频播放
  playOrPause: function (e) {
    console.log('播放/暂停')
    if(that.data.isPlay){
      innerAudioContext.pause();
    }else{
      wx.showLoading({
        title: '数据缓冲中',
      })
      innerAudioContext.src = that.data.audioList[that.data.currentPage].node_audio_link
      innerAudioContext.play();
    }
    that.setData({
      isPlay: !that.data.isPlay,
      currentLeftTime: that.data.audioList[that.data.currentPage].audioTime,
    });
  },
  previewImg:function(e){
    console.log(e);
    wx.previewImage({
      urls: [e.currentTarget.dataset.imgurl],
    })
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
    // innerAudioContext.play();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // innerAudioContext.pause();
    // innerAudioContext.play();
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
  onShareAppMessage: function () {
    return {
      title: item.title,
      path: 'pages/Home/shareDetail/shareDetail?item=' + JSON.stringify(item),
      imageUrl: item.imageUrl,
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