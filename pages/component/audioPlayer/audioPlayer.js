// pages/component/audioPlayer/audioPlayer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type:String,
      value:"",
    },
    poster: {
      type: String,
      value: "",
    },
    name: {
      type: String,
      value: "",
    },
    author: {
      type: String,
      value: "",
    },
    isPlay:{
      type:Boolean,
      value:false,
    },
    index:{
      type:Number,
      value:0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    },
    progress: 0,
    action_play: {
      method: 'play',
    },
    action_pause: {
      method: 'pause',
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    MusicTimeUpdate: function (e) {
      var progress = parseInt((e.detail.currentTime / e.detail.duration) * 100)
      var that = this
      that.setData({
        progress: progress
      })
    },
    MusicPlay: function (e) {
      console.log(e);
      var index = e.currentTarget.dataset.index;
      this.triggerEvent("MusicPlay",{"index":index});
    },
  }
})
