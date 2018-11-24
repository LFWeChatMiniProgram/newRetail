// pages/Mine/care/care.js
var util = require('../../common/util.js')
var that;
var offSet_topic = 0;
var offSet_person = 0;
var limit = 5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutTopic:true,
    aboutPerson:false,
    arr_person:[],
    arr_topic:[],
    noMore_topic:false,
    noMore_person:false,

    total_topic: 0,
    total_person: 0,
  },
  _segmentClick:function(e){
    console.log(e);//e.detail.tapIndex
    switch (e.detail.tapIndex){
      case 0:
        this.setData({
          aboutTopic: true,
          aboutPerson: false,
        });
        break;
      case 1:
        this.setData({
          aboutTopic: false,
          aboutPerson: true,
        });
        break;
    }
  },
  /**
   * 加载列表
   */
  loadPersonList:function(){
    util.users_myfollowed(
      limit,
      offSet_person,
      "entry_date",
      "desc",
      function (res) {
        console.log('关注的用户列表')
        console.log(res);
        if (res.data.success) {
          if(offSet_person){
            //加载更多
            if (!res.data.data.length){
              //没有更多
              that.setData({
                noMore_person:true,
              });
            }else{
              var tmpArr = that.data.arr_person.concat(res.data.data)
              that.setData({
                arr_person: tmpArr,
              });
            }
          }else{
            //刷新
            that.setData({
              arr_person: res.data.data
            });
          }
          if (that.data.arr_person.length == res.data.paging.total) {
            that.setData({
              noMore_person: true,
            });
          }
          that.setData({
            total_person: res.data.paging.total,
          });
        }
      }
    );
  },
  loadTopicList:function(){
    util.tags_followed(
      limit,
      offSet_topic,
      "entry_date",
      "desc",
      function (res) {
        console.log('关注的话题列表')
        console.log(res);
        if (res.data.success) {
          if (offSet_topic) {
            //加载更多
            if (!res.data.data.length) {
              //没有更多
              that.setData({
                noMore_topic: true,
              });
            } else {
              var tmpArr = that.data.arr_topic.concat(res.data.data)
              that.setData({
                arr_topic: tmpArr,
              });
            }
          } else {
            //刷新
            that.setData({
              arr_topic: res.data.data
            });
          }
          if (that.data.arr_topic.length == res.data.paging.total) {
            that.setData({
              noMore_topic: true,
            });
          }
          that.setData({
            total_topic: res.data.paging.total,
          });
        }
      }
    );
  },
  loadPersonListAfterCancel:function(){
    util.users_myfollowed(
      limit + offSet_person,
      0,
      "entry_date",
      "desc",
      function (res) {
        console.log('关注的用户列表')
        console.log(res);
        if (res.data.success) {
          that.setData({
            arr_person: res.data.data
          });
          if (that.data.arr_person.length == res.data.paging.total) {
            that.setData({
              noMore_person: true,
            });
          }
          that.setData({
            total_person: res.data.paging.total,
          });
        }
      }
    );
  },
  loadTopicListAfterCancel:function(){
    util.tags_followed(
      limit + offSet_topic,
      0,
      "entry_date",
      "desc",
      function (res) {
        console.log('关注的话题列表')
        console.log(res);
        if (res.data.success) {
          that.setData({
            arr_topic: res.data.data
          });
          if (that.data.arr_topic.length == res.data.paging.total) {
            that.setData({
              noMore_topic: true,
            });
          }
          that.setData({
            total_topic: res.data.paging.total,
          });
        }
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    offSet_topic = 0;
    offSet_person = 0;
    that.loadPersonList();
    that.loadTopicList();
  },
  //展示详情
  showTopicDetail: function (e) {
    console.log(e);
    require('../../Home/lessonTeacherDetail/lessonTeacherDetail.js')
    wx.navigateTo({
      url: '../../Topic/detail/detail?topic=' + JSON.stringify(e.currentTarget.dataset.topic),
    })
  },
  showTeacherDetail: function (e) {
    console.log(e.currentTarget.dataset.user)
    wx.navigateTo({
      url: '../../Home/lessonTeacherDetail/lessonTeacherDetail?user=' + JSON.stringify(e.currentTarget.dataset.user),
    })
  },
//取消关注话题
  cancelCareTopic:function(e){
    console.log(e);//e.currentTarget.dataset.topic.tag_id
    wx.showModal({
      title: '是否取消关注话题:',
      content: e.currentTarget.dataset.topic.title,
      success:function(res){
        console.log(res);
        if (res.cancel) {
          return;
        }
        util.tags_follow_cancel(
          e.currentTarget.dataset.topic.tag_id,
          function(res){
            if(res.data.success){
              that.loadTopicListAfterCancel();
            }
          }
        );
      }
    })
  },
//取消关注用户
  cancelCarePerson:function(e){
    console.log(e);//e.currentTarget.dataset.user.user_id
    wx.showModal({
      title: '是否取消关注用户:',
      content: e.currentTarget.dataset.user.screen_name,
      success: function (res) {
        console.log(res);
        if(res.cancel){
          return;
        }
        util.users_follow_cancel(
          e.currentTarget.dataset.user.user_id,
          function (res) {
            if (res.data.success) {
              that.loadPersonListAfterCancel();
            }
          }
        );
      }
    })
  },
  /**
   * 加载更多
   */
  loadMoreTopic:function(){
    offSet_topic += limit;
    that.loadTopicList();
  },
  loadMorePerson:function(){
    offSet_person += limit;
    that.loadPersonList();
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