// pages/Essay/index/index.js
var util = require('../../common/util.js');
var dataTool = require('../../common/dataTool.js')
var that;
var currentTag = {}
var offSet = 0;
var limit = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    tabList: ["全部", "711", "盒马生鲜", "无人超市", "711", "711", "盒马生鲜", "711", "盒马生鲜","盒马生鲜", "便利店", "更多"],
    dataSource:[],
    noMore_essay:false,
  },
  //话题选择
  tabItemClick: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.pos;
    console.log(e.currentTarget.dataset.item.title)
    currentTag = e.currentTarget.dataset.item
    offSet = 0;
    that.setData({
      noMore_essay: false,
    });
    this.setData({
      current: index,
    });
    if (e.currentTarget.dataset.item.title == '全部') {
      //请求全部列表
      that.getArticalList();
    } else {
      //请求干货列表
      that.getTagArticalList();
    }
  },
  _showEssayDetail: function (e) {
    console.log('查看干货详情');
    console.log(e);
    wx.navigateTo({
      url: '../../Home/essayDetail/essayDetail?article_id=' + JSON.stringify(e.detail.item.article_id),
    })
  },
  //收藏成功
  _collectSuccess:function(){
    // that.getArticalList();
    if (!(currentTag.title == "全部" || !currentTag.title)) {
      util.tag_article_list(
        "",
        "",
        limit+offSet, //* (offSet + 1),
        0,
        currentTag.tag_id,
        function (res) {
          console.log(res);
          if (res.data.success) {
            that.setData({
              dataSource: that.dealWithData(res.data.data),
            });
          }
        }
      );
    } else {
      // this.getArticalList();
      util.article_list(
        "",
        "",
        limit + offSet, //* (offSet + 1),
        0,
        "entry_date",
        "desc",
        function (res) {
          console.log('干货列表');
          console.log(res);
          if (res.data.success) {
            that.setData({
              dataSource: that.dealWithData(res.data.data),
            });
          }
        }
      );
    }
  },
  //点赞成功
  _likeSuccess:function(){
    if (!(currentTag.title == "全部" || !currentTag.title)) {
      // this.getTagArticalList();
      util.tag_article_list(
        "",
        "",
        limit + offSet, //* (offSet + 1),
        0,
        currentTag.tag_id,
        function (res) {
          console.log(res);
          if (res.data.success) {
            that.setData({
              dataSource: that.dealWithData(res.data.data),
            });
          }
        }
      );
    } else {
      // this.getArticalList();
      util.article_list(
        "",
        "",
        limit + offSet, //* (offSet + 1),
        0,
        "entry_date",
        "desc",
        function (res) {
          console.log('干货列表');
          console.log(res);
          if (res.data.success) {
            that.setData({
              dataSource: that.dealWithData(res.data.data),
            });
          }
        }
      );
    }
  },
  /**
   * 获取文章列表
   */
  getArticalList:function(e){
    util.article_list(
      "",
      "",
      limit,
      offSet,
      "entry_date",
      "desc",
      function (res) {
        console.log('干货列表');
        console.log(res);
        if(res.data.success){
          if(offSet){
            if (!res.data.data.length){
              // wx.showToast({
              //   title: '没有更多',
              // })
              that.setData({
                noMore_essay:true,
              });
            }else{
              //加载更多
              var tmpArr = res.data.data
              tmpArr = that.dealWithData(tmpArr)
              tmpArr = that.data.dataSource.concat(tmpArr)
              that.setData({
                dataSource: tmpArr,
              });
            }
          }else{
            that.setData({
              dataSource: that.dealWithData(res.data.data),
              noMore_essay: false,
            });
          }
        }
      }
    );
  },
  /**
   * 根据话题获取列表
   */
  getTagArticalList:function(e){
    util.tag_article_list(
      "",
      "",
      limit,
      offSet,
      currentTag.tag_id,
      function (res) {
        console.log(res);
        if (res.data.success) {
          if (offSet) {
            if (!res.data.data.length) {
              // wx.showToast({
              //   title: '没有更多',
              // })
              that.setData({
                noMore_essay: true,
              });
            } else {
              //加载更多
              var tmpArr = that.data.dataSource
              tmpArr = that.dealWithData(tmpArr)
              tmpArr = tmpArr.concat(res.data.data)
              that.setData({
                dataSource: tmpArr,
              });
            }
          } else {
            that.setData({
              dataSource: that.dealWithData(res.data.data),
            });
          }
        }
      }
    );
  },
  dealWithData:function(data){
    var tmpArr = [];
    for(var i in data){
      var item = data[i];
      item.pubTime = dataTool.dealWithTimeForEssay(item.time_published);
      tmpArr.push(item);
    }
    return tmpArr;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    offSet = 0;
    //获取关于文章的话题列表
    util.recommend_article_tags(
      "",
      10,
      0,
      "order",
      "desc",
      function (res) {
        console.log('关于文章的话题列表');
        console.log(res);
        if(res.data.success){
          var tmpArr = [{"title":"全部"}]
          that.setData({
            tabList: tmpArr.concat(res.data.data),
          });
        }
      }
    );
    this.getArticalList();
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
    //判断是否登录
    // if (!util.isLogin(
    //   function (res) {
    //     wx.navigateTo({
    //       url: '../../Mine/login/login',
    //     });
    //   })) {
    //   return;
    // }
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
    offSet = 0;
    that.setData({
      noMore_essay: false,
    });
    if (!(currentTag.title == "全部" ||!currentTag.title)){
      this.getTagArticalList();
    }else{
      this.getArticalList();
    }
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    offSet += limit;
    if (!(currentTag.title == "全部" || !currentTag.title)) {
      this.getTagArticalList();
    } else {
      this.getArticalList();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})