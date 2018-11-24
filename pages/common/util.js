
let api = require('./api.js');
var header = {
  "Content-Type": "application/x-www-form-urlencoded",
  "X-APP-Version":"1.0.1",
  "X-Platform-Type":"iOS",
  "X-Network-Type":"wifi",
  "Authorization": "Bearer " + getApp().globalData.loginInfo.token.length ? getApp().globalData.loginInfo.token:"",
  "X-UDID":"123456789012121212121212111212121212",
};
/**
 * GET
 */
function getData(url, data, callBack){
  wx.request({
    url: url,
    data:data,
    method:'GET',
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-APP-Version": "1.0.1",
      "X-Platform-Type": "iOS",
      "X-Network-Type": "wifi",
      "Authorization": getApp().globalData.loginInfo? "Bearer " + getApp().globalData.loginInfo.token:"",
      "X-UDID": "123456789012121212121212111212121212",
    },
    success:function(res){
      callBack(res);
      if (!res.data.success){
        wx.showToast({
          title: res.data.msg,
        })
      }
    }
  })
}
/**
 * POST
 */
function postData(url,data,callBack){
  console.log('登录请求参数')
  console.log(data);
  wx.request({
    url: url,
    data:data,
    method:'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-APP-Version": "1.0.1",
      "X-Platform-Type": "iOS",
      "X-Network-Type": "wifi",
      "Authorization": getApp().globalData.loginInfo ? "Bearer " + getApp().globalData.loginInfo.token : "",
      "X-UDID": "123456789012121212121212111212121212",
    },// 
    success:function(res){
      callBack(res);
      if (!res.data.success) {
        wx.showToast({
          title: res.data.msg,
        })
      }
    }
  })
}
/**
 * DELETE
 */
function deleteData(url, data, callBack) {
  console.log('取消请求参数')
  console.log(data);
  wx.request({
    url: url,
    data: data,
    method: 'DELETE',
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-APP-Version": "1.0.1",
      "X-Platform-Type": "iOS",
      "X-Network-Type": "wifi",
      "Authorization": getApp().globalData.loginInfo ? "Bearer " + getApp().globalData.loginInfo.token : "",
      "X-UDID": "123456789012121212121212111212121212",
    },// 
    success: function (res) {
      callBack(res);
      if (!res.data.success) {
        wx.showToast({
          title: res.data.msg,
        })
      }
    }
  })
}

/**
 * 发现
 */
  //  1.系列课列表
function series_courses(cover_image,limit, offset, orderby, sort,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.series_courses,
    {
      'cover_image_sizes': ["200_200"],
      'limit': limit,
      'offset': offset,
      'orderby': orderby,
      'sort': sort,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  )
}
  //  2.系列课详情
function series_courses_sc_id(cover_image_sizes, tag_cover_image_sizes, body_image_sizes,course_cover_image_sizes,sc_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.series_courses_sc_id.replace('{s1}', sc_id),
    {
      'cover_image_sizes': ["750_421"],
      'tag_cover_image_sizes': tag_cover_image_sizes,
      'body_image_sizes': ["750_421"],
      'course_cover_image_sizes': course_cover_image_sizes
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  )
}
  //  3.系列课试听课列表
function series_courses_freeSections(sc_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.series_courses_freeSections.replace("{s1}",sc_id),
    "",
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  )
}
  //4.系列课学习列表
function series_courses_sections(sc_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.series_courses_sections.replace("{s1}",sc_id),
    "",
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
  //5.系列课课节详情
function series_sections(series_course_id,sc_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.series_sections.replace("{s1}",sc_id),
    {
      "series_course_id": series_course_id,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}

  //  1.分享课列表
function courses(cover_image, limit, offset, orderby, sort,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.courses,
    {
      'cover_image_sizes': ["345","original"],
      'limit': limit,
      'offset': offset,
      'orderby': orderby,
      'sort': sort,
    },
    function(res){
      // wx.hideLoading()
      callBack(res);
      wx.hideLoading()
    }
  );
}
// 2.分享课详情
function courses_detail(cover_image_sizes, course_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.courses_detail.replace('{s1}',course_id),
    {
      'cover_image_sizes': ["750_421"],
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
// 3.分享课详情（列表）
function courses_nodes_list(cover_image_sizes, course_id, limit, offset, orderby, sort, callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.courses_nodes_list.replace('{s1}', course_id),
    {
      'cover_image_sizes': cover_image_sizes,
      'limit': limit,
      'offset': offset,
      'orderby': orderby,
      'sort': sort,
    },
    function (res) {
      wx.hideLoading()
      callBack(res);
    }
  );
}

// 1.干货列表
function article_list(cover_image_sizes, tag_cover_image_sizes, limit, offset, orderby, sort, callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.article_list,
    {
      'cover_image_sizes': ["690_370"],
      'tag_cover_image_sizes': tag_cover_image_sizes,
      'limit': limit,
      'offset': offset,
      'orderby': orderby,
      'sort': sort,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );

}
//2.干货详情
function article_detail(cover_image_sizes, tag_cover_image_sizes, article_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.article_detail.replace('{s1}', article_id),
    {
      'cover_image_sizes': cover_image_sizes,
      'tag_cover_image_sizes': tag_cover_image_sizes,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}

/**
 * 话题
 */
  //1.获取话题对应的系列课列表
function tags_series_courses(cover_image_sizes, tag_cover_image_sizes, body_image_sizes, course_cover_image_sizes, limit, offset, tag_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.tags_series_courses.replace("{s1}",tag_id),
    {
      "cover_image_sizes": ["200_200"],
      "tag_cover_image_sizes": tag_cover_image_sizes,
      "body_image_sizes": body_image_sizes,
      "course_cover_image_sizes": course_cover_image_sizes,
      "limit": limit,
      "offset": offset,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
  //2.话题对应的分享课列表
function tags_courses(tag_cover_image_sizes, cover_image_sizes, limit, offset, orderby, sort, tag_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.tags_courses.replace("{s1}",tag_id),
    {
      "tag_cover_image_sizes": tag_cover_image_sizes,
      "cover_image_sizes": ["345", "original"],
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );

}
  //3.话题对应的干货列表
function tag_article_list(cover_image_sizes, tag_cover_image_sizes, limit,offset,tag_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.tag_article_list.replace("{s1}",tag_id),
    {
      "cover_image_sizes": ["690_370"],
      "tag_cover_image_sizes": tag_cover_image_sizes,
      "limit": limit,
      "offset": offset,
    },
    function(res) {
      wx.hideLoading()
      callBack(res);
    }
  );
}
  //4.话题列表
function tags(limit, offset, orderby, sort,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.tags,
    {
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );

}
  //5.文章话题列表
function recommend_article_tags(cover_image_sizes, limit, offset, orderby, sort,callBack){
  getData(
    api.recommend_article_tags,
    {
      "cover_image_sizes": cover_image_sizes,
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      callBack(res);
    }
  );

}
  //6.课程话题列表
function recommend_course_tags(cover_image_sizes, limit, offset, orderby, sort, callBack){
  getData(
    api.recommend_course_tags,
    {
      "cover_image_sizes": cover_image_sizes,
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function (res) {
      callBack(res);
    }
  );
}
  //7.话题详情中的行业专家
function tags_users(limit, offset, orderby, sort, tag_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.tags_users.replace("{s1}",tag_id),
    {
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
//8.话题详情
function tags_detail(tag_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.tags_detail.replace("{s1}",tag_id),
    "",
    function(res){
      callBack(res)
      wx.hideLoading()
    }
  );
}
/**
 * 用户
 */
  //1.用户公开资料
function user_info(user_id,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.user_info.replace("{s1}",user_id),
    "",
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
//2.用户下的分享课列表
function user_courses(cover_image_sizes, tag_cover_image_sizes, limit, offset, orderby, sort, user_id, callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.user_courses.replace('{s1}',user_id),
    {
      "cover_image_sizes": ["345", "original"],
      "tag_cover_image_sizes": tag_cover_image_sizes,
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      callBack(res);
      setTimeout(function(){
        wx.hideLoading()
      },1000);
    }
  );
}
  //3.用户下的系列课列表
function user_series_courses(cover_image_sizes, tag_cover_image_sizes, limit, offset, orderby, sort, user_id, callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.user_series_courses.replace('{s1}',user_id),
    {
      "cover_image_sizes": ["200_200"],
      "tag_cover_image_sizes": tag_cover_image_sizes,
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
//4.用户下的干货列表
function user_article_list(cover_image_sizes, limit, offset, orderby, sort, user_id, callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.user_article_list.replace('{s1}',user_id),
    {
      "cover_image_sizes": ["690_370"],
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
  //5.获取用户的私有信息
function user_profile(callBack){
  getData(
    api.user_profile,
    "",
    function(res){
      callBack(res);
    }
  );
}
/**
 * 登录
 */
function minapp_login(js_code, encryptedData, iv,callBack){
  wx.showLoading({
    title: '正在登录',
  })
  postData(
    api.minapp_login,
    {
      "js_code": js_code,
      "encryptedData": encryptedData,
      "iv": iv
    },
    function(res){
      wx.hideLoading();
      getApp().globalData.loginInfo = res.data.data
      callBack(res);
    }
  );
}

/**
 * 我的
 */
//1.我学习的分享课列表
function courses_mylearned(cover_image_sizes, tag_cover_image_sizes, limit, offset, orderby, sort, callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.courses_mylearned,
    {
      "cover_image_sizes": ["345", "original"],
      "tag_cover_image_sizes": tag_cover_image_sizes,
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
      setTimeout(function () {
        wx.hideLoading()
      },0);
    }
  );
}
//2.我学习的系列课列表
function series_courses_mylearned(cover_image_sizes, tag_cover_image_sizes, limit, offset, orderby, sort, callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.series_courses_mylearned,
    {
      "cover_image_sizes": ["200_200"],
      "tag_cover_image_sizes": tag_cover_image_sizes,
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function (res) {
      wx.hideLoading()
      callBack(res);
      setTimeout(function () {
        wx.hideLoading()
      }, 1000);
    }
  );
}
//3.我的收藏列表
function courses_bookmark(limit, offset, orderby,sort,channel,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.courses_bookmark,
    {
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
      "channel": channel,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
//4.我关注的用户列表
function users_myfollowed(limit, offset, orderby,sort,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.users_myfollowed,
    {
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      callBack(res);
      wx.hideLoading();
    }
  );
}
//5.我关注的话题列表
function tags_followed(limit, offset, orderby,sort,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.tags_followed,
    {
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function (res) {
      callBack(res);
      wx.hideLoading();
    }
  );
}
//6.我的粉丝列表
function users_myfollower(limit, offset, orderby,sort,callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.users_myfollower,
    {
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function(res){
      callBack(res)
      wx.hideLoading();
    }
  );
}
//我的购买记录
function payment_purchased_list(limit, offset, orderby, sort,callBack){
  wx.showLoading({
    title: '数据正在加载中',
  })
  getData(
    api.payment_purchased_list,
    {
      "limit": limit,
      "offset": offset,
      "orderby": orderby,
      "sort": sort,
    },
    function (res) {
      callBack(res)
      wx.hideLoading();
    }
  );
}

/**
 * 操作
 */
//1.分享课程
function courses_share(channel, course_id,callBack){
  wx.showLoading({
    title: '数据提交中',
  })
  postData(
    api.courses_share.replace("{s1}",course_id),
    {
      "form_ids": getApp().globalData.formId,
      "channel": channel,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
//2.获取二维码
function qrcode_b(course_id,page,callBack){
  getData(
    api.qrcode_b.replace("{s1}",course_id),
    {
      "page": page,
    },
    function(res){
      callBack(res);
    }
  );
}
//3.收藏
/**
 *
干货 article
分享课 course
系列课节 series_section
系列课 series_course
 */
function bookmark(entry_id, channel,callBack){
  // wx.showLoading({
  //   title: '数据提交中',
  // })
  postData(
    api.bookmark.replace("{s1}",entry_id),
    {
      "channel": channel,
    },
    function(res){
      wx.hideLoading()
      callBack(res);
    }
  );
}
//4.关注用户
function users_follow(user_id,callBack){
  // wx.showLoading({
  //   title: '正在提交数据',
  // })
  postData(
    api.users_follow.replace("{s1}",user_id),
    {
      "form_ids": getApp().globalData.formId,
    },
    function(res){
      wx.hideLoading();
      if (res.data.success) {
        // wx.showToast({
        //   title: '关注成功',
        // })
      } else {
        wx.showToast({
          title: '关注失败',
        })
      }
      callBack(res);
    }
  );
}
//5.关注话题
function tags_follow(tag_id,callBack){
  wx.showLoading({
    title: '正在提交数据',
  })
  console.log('关注话题相关参数');
  console.log(tag_id);
  console.log(api.tags_follow.replace("{s1}", tag_id))
  postData(
    api.tags_follow.replace("{s1}",tag_id),
    {
      "form_ids": getApp().globalData.formId,
    },
    function(res){
      wx.hideLoading();
      callBack(res);
      if (res.data.success) {
        // wx.showToast({
        //   title: '关注成功',
        // })
      }else{
        wx.showToast({
          title: '关注失败',
        })
      }
    }
  );
}
//6.取消关注话题
function tags_follow_cancel(tag_id,callBack){
  // wx.showLoading({
  //   title: '数据正在提交',
  // })
  deleteData(
    api.tags_follow_cancel.replace("{s1}",tag_id),
    "",
    function(res){
    wx.hideLoading();
      callBack(res);
      if (res.data.success){
        // wx.showToast({
        //   title: '取消关注成功',
        // })
      }else{
        wx.showToast({
          title: '取消关注失败',
        })
      }
    }
  );
}
//7.取消关注人物
function users_follow_cancel(user_id, callBack) {
  wx.showLoading({
    title: '数据正在提交',
  })
  deleteData(
    api.users_follow_cancel.replace("{s1}", user_id),
    "",
    function (res) {
      wx.hideLoading();
      callBack(res);
      if (res.data.success) {
        // wx.showToast({
        //   title: '取消关注成功',
        // })
      } else {
        wx.showToast({
          title: '取消关注失败',
        })
      }
    }
  );
}
//8.取消收藏
/**
 *
干货 article
分享课 course
系列课节 series_section
系列课 series_course
 */
function bookmark_cancel(entry_id, channel,callBack){
  // wx.showLoading({
  //   title: '数据正在提交',
  // })
  deleteData(
    api.bookmark_cancel.replace("{s1}",entry_id),
    {
      "channel": channel,
    },
    function(res){
      callBack(res);
      console.log('取消关注结果');
      console.log(res);
      if (res.data.success) {
        // wx.showToast({
        //   title: '取消收藏成功',
        // })
      } else {
        wx.showToast({
          title: '取消收藏失败',
        })
      }
    }
  );
}
//9.点赞
function like(entry_id,callBack){
  // wx.showLoading({
  //   title: '正在提交数据',
  // })
  postData(
    api.like.replace("{s1}",entry_id),
    "",
    function(res){
      callBack(res);
      console.log('点赞结果');
      console.log(res);
      if (res.data.success) {
        // wx.showToast({
        //   title: '点赞成功',
        // })
      } else {
        wx.showToast({
          title: '点赞失败',
        })
      }
    }
  );
}
//10.取消点赞
function like_cancel(entry_id, callBack){
  // wx.showLoading({
  //   title: '正在提交数据',
  // })
  deleteData(
    api.like.replace("{s1}", entry_id),
    "",
    function (res) {
      callBack(res);
      console.log('取消点赞结果');
      console.log(res);
      if (res.data.success) {
        // wx.showToast({
        //   title: '取消点赞成功',
        // })
      } else {
        wx.showToast({
          title: '取消点赞失败',
        })
      }
    }
  );
}
//支付
function payment_order_create(goods_id, openid,callBack){
  wx.showLoading({
    title: '订单提交中',
  })
  postData(
    api.payment_order_create,
    {
      wx_appid: 'wxcce531d4178ecaae',
      goods_id: goods_id,
      payment_method: 'wechat_jsapi',
      openid: openid
    },function(res){
      wx.hideLoading()
      console.log('订单生成结果')
      console.log(res);
      if (res.data.success){
        var payargs = res.data.data.proof;
        console.log(payargs);
        var req = {
          timeStamp: payargs.timeStamp,
          nonceStr: payargs.nonceStr,
          package: payargs.package,
          signType: payargs.signType,
          paySign: payargs.paySign
        }
        console.log(req);
        wx.requestPayment({
          timeStamp: payargs.timeStamp,
          nonceStr: payargs.nonceStr,
          package: payargs.package,
          signType: payargs.signType,
          paySign: payargs.paySign,
          'success': function (rs) {
            console.log(rs)
            callBack(rs);
          },
          'fail': function (rs) {
            console.log(rs)
            callBack(rs);
          }
        })
      }else{
        wx.showToast({
          title: '订单提交失败，请再次提交',
        })
      }
    }
  );
}

/**
 * 关于我们
 */
function about_us(callBack){
  wx.showLoading({
    title: '数据加载中',
  })
  getData(
    api.about_us,
    "",
    function(res){
      callBack(res);
      wx.hideLoading()
      if(!res.data.success){
        wx.showToast({
          title: '加载失败',
        })
      }
    }
  );
}

/**
 * 是否登录
 */
function isLogin(toLogin){
  if (!getApp().globalData.loginInfo){
    getApp().globalData.loginInfo = { "token": "" }
  }
  //是否登录
  if (!getApp().globalData.loginInfo.token) {
    console.log('未登录')
    // wx.showModal({
    //   title: '当前尚未登录,点击确定登录',
    //   content: '',
    //   success: function (res) {
    //     console.log(res);
    //     if (res.cancel) {
    //       return false;
    //     }
    //     toLogin();
    //   }
    // })
    toLogin();
    return false;
  }
  return true;
}
module.exports = {
  series_courses: series_courses,
  series_courses_sc_id: series_courses_sc_id,
  series_courses_freeSections: series_courses_freeSections,
  series_courses_sections: series_courses_sections,
  series_sections: series_sections,

  courses: courses,
  courses_detail: courses_detail,
  courses_nodes_list: courses_nodes_list,

  article_list: article_list,
  article_detail: article_detail,

  tags_series_courses:tags_series_courses,
  tags_courses: tags_courses,
  tag_article_list: tag_article_list,
  tags: tags,
  tags_users: tags_users,
  tags_detail: tags_detail,
  tags_follow: tags_follow,
  tags_followed: tags_followed,
  tags_follow_cancel:tags_follow_cancel,

  recommend_article_tags: recommend_article_tags,
  recommend_course_tags: recommend_course_tags,
  
  user_info: user_info,
  user_courses: user_courses,
  user_series_courses: user_series_courses,
  user_article_list: user_article_list,
  users_follow: users_follow,
  users_myfollowed: users_myfollowed,
  users_myfollower: users_myfollower,
  users_follow_cancel: users_follow_cancel,
  user_profile: user_profile,
  like:like,
  like_cancel: like_cancel,
  payment_purchased_list: payment_purchased_list,

  minapp_login: minapp_login,
  courses_mylearned: courses_mylearned,
  series_courses_mylearned: series_courses_mylearned,

  courses_share: courses_share,
  qrcode_b: qrcode_b,
  payment_order_create,
  bookmark: bookmark,
  bookmark_cancel: bookmark_cancel,
  courses_bookmark: courses_bookmark,

  about_us: about_us,
  isLogin: isLogin,
}
