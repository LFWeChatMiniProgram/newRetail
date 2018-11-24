// pages/component/shareLesson/shareLesson.js
let col1H = 0;
let col2H = 215;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isHaveTopic:{
      type:Boolean,
      value:false,
    },
    leftArr:{
      type:Array,
      value:[],
    },
    rightArr: {
      type: Array,
      value: [],
    },
    topicList:{
      type:Array,
      value:[],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLesson:true,
    isShare:true,
    images: [],
    col1: [],
    col2: []
  },
  attached:function(){//第一个生命周期方法
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * (345.0/750.0);
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        // this.loadImages();
      }
    })
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadImages: function () {
      let images = [
        { pic: "../images/share_tmp1.png", height: 0 },
        { pic: "../images/share_tmp2.png", height: 0 },
        { pic: "../images/share_tmp3.png", height: 0 },
        { pic: "../images/share_tmp4.png", height: 0 },
        { pic: "../images/share_tmp5.png", height: 0 },
      ];

      let baseId = "img-";// + (+new Date());

      for (let i = 0; i < images.length; i++) {
        images[i].id = baseId + "-" + i;
      }

      this.setData({
        loadingCount: images.length,
        images: images
      });
    },
    onImageLoad: function (e) {
      let imageId = e.currentTarget.id;
      let oImgW = e.detail.width;         //图片原始宽度
      let oImgH = e.detail.height;        //图片原始高度
      let imgWidth = this.data.imgWidth;  //图片设置的宽度
      let scale = imgWidth / oImgW;        //比例计算
      let imgHeight = oImgH * scale;      //自适应高度

      let images = this.data.images;
      let imageObj = null;

      for (let i = 0; i < images.length; i++) {
        let img = images[i];
        if (img.id === imageId) {
          imageObj = img;
          break;
        }
      }

      imageObj.height = imgHeight;

      let loadingCount = this.data.loadingCount - 1;
      let col1 = this.data.col1;
      let col2 = this.data.col2;

      if (col1H <= col2H) {
        col1H += imgHeight;
        col1.push(imageObj);
      } else {
        col2H += imgHeight;
        col2.push(imageObj);
      }

      let data = {
        loadingCount: loadingCount,
        col1: col1,
        col2: col2
      };

      if (!loadingCount) {
        data.images = [];
      }

      this.setData(data);
    },
    _showShareLessonDetail: function (e) {//course_id
      console.log(e);
      var item = {
        "course_id": e.currentTarget.dataset.item.course_id,
      }
      this.triggerEvent("showShareLessonDetail", { 'item': item});
    },
    _showTopicDetail:function(e){
      console.log(e);
      this.triggerEvent("showTopicDetail", { "topic":e.currentTarget.dataset.topic});
    },
    _showMoreTopic:function(e){
      this.triggerEvent("showMoreTopic");
    }
  }
})
