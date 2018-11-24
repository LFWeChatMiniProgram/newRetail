// pages/component/segment/segment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataSource:{
      type:Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabCurrent:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _tabItemClick:function(e){
      this.setData({
        tabCurrent: e.currentTarget.dataset.pos,
      });
      this.triggerEvent("segmentClick", { "tapIndex": e.currentTarget.dataset.pos});
    }
  }
})
