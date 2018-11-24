// pages/Prepare/bgAudio/bgAudio.js
var backgroundAudioManager;
var that ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    currentLeftTime:'0:00',
  },
  playOrPause:function(e){
    wx.getBackgroundAudioManager().title = '此时此刻'
    wx.getBackgroundAudioManager().epname = '此时此刻'
    wx.getBackgroundAudioManager().singer = '许巍'
    wx.getBackgroundAudioManager().coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    wx.getBackgroundAudioManager().src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    var isPlay = this.data.isPlay;
    
    if(isPlay){
      //正在播放
      wx.getBackgroundAudioManager().pause();
      wx.getBackgroundAudioManager().src = '123'
    }else{
      //
      
      wx.getBackgroundAudioManager().play();
    }
    this.setData({
      isPlay: !isPlay,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    that = this;
    
     // 设置了 src 之后会自动播放
    // wx.getBackgroundAudioManager().autoPlay = false;
    // wx.getBackgroundAudioManager().pause();
    wx.getBackgroundAudioManager().onTimeUpdate(()=>{
      that.setData({
        currentLeftTime: that.secondToDate(wx.getBackgroundAudioManager().duration - wx.getBackgroundAudioManager().currentTime),
        currentProgress: wx.getBackgroundAudioManager().currentTime / wx.getBackgroundAudioManager().duration * 100
      });
    })
    wx.previewImage({
      urls: ['http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'],
    })
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
    // backgroundAudioManager = wx.getBackgroundAudioManager();
    // backgroundAudioManager.title = 'hello';
    // backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  wx.getBackgroundAudioManager().stop();
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