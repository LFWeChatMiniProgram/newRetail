// pages/Prepare/diyAudioPlayer.js
var innerAudioContext;
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:1000000000000000000000000000,
    currentLeftTime:'',
    currentProgress:0,
    dataSource:[
    {
      isPlay:false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },
    {
      isPlay: false,
    },],
  },
  playOrPause:function(e){
    innerAudioContext.stop();
    var index = e.currentTarget.dataset.index
    if (index == this.data.currentIndex) {
      var item = this.data.dataSource[index];
      item.isPlay = !(item.isPlay);
      var tmpArr = this.data.dataSource;
      tmpArr.splice(index,1,item);
      this.setData({
        dataSource: tmpArr,
      });
      if (item.isPlay){
        innerAudioContext.play();
      }
      return;
    }
    var tmpArr = [];
    for(var i in this.data.dataSource){
      var item = this.data.dataSource[i];
      item.isPlay = false;
      if(index == i){
        item.isPlay = true;
      }
      tmpArr.push(item);
    }
    this.setData({
      dataSource:tmpArr,
      currentIndex:index,
    });
    innerAudioContext.play();
  },
  secondToDate:function(result){
    var m = Math.floor((result/ 60 %60));
    var s = Math.floor((result % 60));
    if(s<10){
      s = '0'+s;
    }
    return  m +':' + s;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"
    innerAudioContext.autoPlay = true;
    innerAudioContext.onPlay(()=>{
      console.log('开始播放');
    });
    innerAudioContext.onPause(()=>{
      console.log('播放暂停');
    });
    innerAudioContext.onStop(()=>{
      console.log('播放停止');
    });
    innerAudioContext.onTimeUpdate(()=>{
      console.log(that.secondToDate(innerAudioContext.duration - innerAudioContext.currentTime))
      that.setData({
        currentLeftTime: that.secondToDate(innerAudioContext.duration - innerAudioContext.currentTime),
        currentProgress: innerAudioContext.currentTime / innerAudioContext.duration *100
      });
      console.log(that.data.currentProgress);
    });
    innerAudioContext.onError((res)=>{
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    innerAudioContext.play();
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