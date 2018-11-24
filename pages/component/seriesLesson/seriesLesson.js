// pages/component/seriesLesson/seriesLesson.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataSource:{
      type:Array,
      value:[],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollH:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load: function (e) {
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
    _showSeriesIntroduce:function(e){
      var item = {
        "series_course_id": e.currentTarget.dataset.item.series_course_id,
      }
      this.triggerEvent("showSeriesIntroduce", { 'item': item });
    },
  }
})
