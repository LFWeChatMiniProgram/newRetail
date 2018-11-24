/**
 * 1.处理分享课列表数据
 */
function dealWithData_shareLessonList(data,leftH,rightH,leftArr,rightArr){
  for(var i in data){
    let item = data[i];
    let imageH = 345.0;
    let imageW = 345.0; 
    let scale;
    if (item.cover_image["345"]["0"]){
      
      // imageH = parseFloat(item.cover_image["345"]["0"].height);
      imageW = parseFloat(item.cover_image["345"]["0"].width);
      scale = imageW / 335.0;
      item.imageH = parseFloat(item.cover_image["345"]["0"].height) / scale;
      imageH = item.imageH
      item.imageW = 335.0;
    }else{
      item.imageH = 335.0;
      item.imageW = 335.0;
    }
    if (item.title.length > 10) {
      imageH += 20;
    }
    if(leftH <=rightH){
      leftArr.push(item);
      leftH += imageH;
    }else{
      rightArr.push(item);
      rightH += imageH;
    }
  }
  return [leftH,rightH,leftArr,rightArr];  
}



/**
 * 2.将时间戳转化为字符串
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 * 
 * date('Y-m-d','1350052653');//很方便的将时间戳转换成了2012-10-11
 * date('Y-m-d H:i:s','1350052653');//得到的结果是2012-10-12 22:37:33
 */
function dateToString(time) {
  var now = new Date(time*1000)
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return year + "-" + month + "-" + day;// + " " + hour + ":" + minute + ":" + second;
}
//3.将音视频的时长转化为分钟和秒的形式
function secondToDate(result) {
  var m = Math.floor((result / 60 % 60));
  var s = Math.floor((result % 60));
  if (s < 10) {
    s = '0' + s;
  }
  return m + ':' + s;
}
/**
 * 4.处理文章的时间戳
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 * 
 * date('Y-m-d','1350052653');//很方便的将时间戳转换成了2012-10-11
 * date('Y-m-d H:i:s','1350052653');//得到的结果是2012-10-12 22:37:33
 */
function dealWithTimeForEssay(time){
  var now = new Date(time * 1000)
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  if(parseInt(minute)<10){
    minute = '0'+minute;
  }
  var second = now.getSeconds();
  return year + "." + month + "." + day + " " + hour + ":" + minute;// + ":" + second;
}

module.exports = {
  dealWithData_shareLessonList: dealWithData_shareLessonList,
  dateToString: dateToString,
  secondToDate: secondToDate,
  dealWithTimeForEssay: dealWithTimeForEssay,
}