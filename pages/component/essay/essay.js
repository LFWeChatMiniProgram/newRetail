// pages/component/essay/essay.js
var that;
var util = require('../../common/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataSource:{
      type:Array,
      value:[],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    attached: function () {
      that = this;
      wx.getSystemInfo({
        success: (res) => {
          let ww = res.windowWidth;
          let wh = res.windowHeight;
          let imgWidth = ww * 0.48;
          let scrollH = wh;

          this.setData({
            scrollH: scrollH,
          });

        }
      })
    },
    _showEssayDetail:function(e){
      console.log('查看干货详情');
      console.log(e);
      that = this;
      this.triggerEvent("showEssayDetail", { "item": e.currentTarget.dataset.item});
    },
    //收藏
    collectCourse:function(e){
      console.log(e)/**
      e.currentTarget.dataset.index
      e.currentTarget.dataset.essay.article_id
      e.currentTarget.dataset.essay.like_number
       */
      that = this;
      if (e.currentTarget.dataset.essay.is_bookmark) {
        util.bookmark_cancel(
          e.currentTarget.dataset.essay.article_id,
          "article",
          function (res) {
            if (res.data.success) {
              that._collectSuccess();
            }
          }
        );

        return;
      }
      util.bookmark(
        e.currentTarget.dataset.essay.article_id,
        "article",
        function (res) {
          console.log(res);
          if (res.data.success) {
            that._collectSuccess();
          }
        }
      );
    },
    //点赞
    lilkeCourse:function(e){
      that = this;
      console.log(e)
      if (e.currentTarget.dataset.essay.is_like) {
        util.like_cancel(
          e.currentTarget.dataset.essay.article_id,
          function (res) {
            console.log(res);
            if (res.data.success) {
              that._likeSuccess();
            }
          }
        );

        return;
      }
      util.like(
        e.currentTarget.dataset.essay.article_id,
        function (res) {
          console.log(res);
          if (res.data.success) {
            that._likeSuccess();
          }
        }
      );
    },
    _collectSuccess:function(e){
      console.log('收藏成功');
      this.triggerEvent("collectSuccess");
    },
    _likeSuccess:function(e){
      console.log('点赞成功');
      this.triggerEvent("likeSuccess");
    }
  }
})
