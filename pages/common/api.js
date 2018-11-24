
/**
 *  app.globalData.loginInfo:
 *  expire_in:1532852199
    openid:"o-lri5C-WiHrWAoMMjyhojZ-quWQ"
    token:""
    unique_id:"179e05740eab93911ed9aed2d69a63ae0dc68857"
    user_id:6
 */


let baseUrl = 'https://retailapi.pintu360.com/api/'// 正式
// 
// let baseUrl = 'http://172.16.19.206:9900/api/';//内网

/**
 * 发现
 */
  //1.系列课列表
exports.series_courses = baseUrl + 'series-courses';
  //2.系列课详情
exports.series_courses_sc_id = baseUrl + 'series-courses/{s1}'
  //3.系列课试听课列表
exports.series_courses_freeSections = baseUrl + 'series-courses/{s1}/free-sections'
  //4.系列课学习列表
exports.series_courses_sections = baseUrl + 'series-courses/{s1}/sections'
  //5.系列课课节详情
exports.series_sections = baseUrl + 'series-sections/{s1}'


  //1.分享课列表
exports.courses = baseUrl +'courses'
  //2.分享课详情
exports.courses_detail = baseUrl + 'courses/{s1}'
  //3.分享课详情（列表）
exports.courses_nodes_list = baseUrl + 'courses/{s1}/nodes'

  //1.干货列表
exports.article_list = baseUrl + 'article/list'
  //2.干货详情
exports.article_detail = baseUrl + 'article/{s1}/detail'

/**
 * 话题
 */
  //1.话题对应的系列课列表
exports.tags_series_courses = baseUrl + 'tags/{s1}/series-courses'
  //2.话题对应的分享课列表
exports.tags_courses = baseUrl + 'tags/{s1}/courses'
  //3.话题对应的干货列表
exports.tag_article_list = baseUrl + 'tag/{s1}/article/list'
  //4.话题列表
exports.tags = baseUrl + 'tags'
  //5.文章话题列表
exports.recommend_article_tags = baseUrl + 'recommend/article/tags'
  //6.课程话题列表
exports.recommend_course_tags = baseUrl + 'recommend/course/tags'
  //7.话题详情中的行业专家
exports.tags_users = baseUrl + 'tags/{s1}/users'
  //8.话题详情
exports.tags_detail = baseUrl + 'tags/{s1}'

/**
 * 用户
 */
  //1.用户公开资料
exports.user_info = baseUrl + 'user/{s1}/info'
  //2.用户下的分享课列表
exports.user_courses = baseUrl + 'user/{s1}/courses'
  //3.用户下的系列课列表
exports.user_series_courses = baseUrl + 'user/{s1}/series-courses'
  //4.用户下的干货列表
exports.user_article_list = baseUrl + 'user/{s1}/article/list'
  //5.获取用户的私有信息
exports.user_profile = baseUrl + 'user/profile'
/**
 * 我的
 */
//1.我学习的分享课列表
exports.courses_mylearned = baseUrl + 'courses/mylearned'
//2.我学习的系列课列表
exports.series_courses_mylearned = baseUrl + 'series-courses/mylearned'
//3.我的收藏列表
exports.courses_bookmark = baseUrl + 'courses/bookmark'
//4.我关注的用户列表
exports.users_myfollowed = baseUrl + 'users/myfollowed'
//5.我关注的话题列表
exports.tags_followed = baseUrl + 'tags/followed'
//6.我的粉丝
exports.users_myfollower = baseUrl + 'users/myfollower'
//7.我的购买记录
exports.payment_purchased_list = baseUrl + 'payment/purchased/list'
/**
 * 登录
 */
exports.minapp_login = baseUrl + 'minapp/login'

/**
 * 操作
 */
//1.分享课程
exports.courses_share =baseUrl + 'courses/{s1}/share'
//2.获取二维码
exports.qrcode_b = baseUrl + 'poster/{s1}'
//3.收藏
exports.bookmark = baseUrl + 'bookmark/{s1}'
//4.关注用户
exports.users_follow = baseUrl + 'users/{s1}/follow'
//5.关注话题
exports.tags_follow = baseUrl + 'tags/{s1}/follow'
//6.取消关注话题
exports.tags_follow_cancel = baseUrl + 'tags/{s1}/follow'
//7.取消关注人物
exports.users_follow_cancel = baseUrl + 'users/{s1}/follow'
//8.取消收藏
exports.bookmark_cancel = baseUrl + 'bookmark/{s1}'
//9.点赞
exports.like = baseUrl + 'like/{s1}'
//10.取消点赞
exports.like_cancel = baseUrl + 'like/{s1}'
/**
 * 支付
 */
exports.payment_order_create = baseUrl + 'payment/order/create'

/**
 * 关于我们
 */
exports.about_us = baseUrl + 'about/us'