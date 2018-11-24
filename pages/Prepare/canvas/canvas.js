// pages/Prepare/canvas/canvas.js
var that;
var scale;
var isRefuseAuth = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isShowAuthBtn:false,
   canIUse: wx.canIUse('button.open-type.openSetting'),
   isShowAuthBtn:false,
   arr2 : ['../images/haibaoBG.png'],
   nodeData:'ListView对应的数据ListModel包含分组唯一标识符listID，首屏需要展现的Item数据items和列表所有Item的ID,itemIDs',
   come:'hello world',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        console.log('屏幕宽度：'+ ww);
        scale = ww/375.0;
        console.log(scale);
      }
    })
    this.getUserInfos();
  },
  /**
   * 获取用户信息
   */
  getUserInfos:function(){
    wx.getUserInfo({
      success:function(res){
        console.log(res);
        that.setData({
          userName:res.userInfo.nickName
        });
        that.getImageInfo(res.userInfo.avatarUrl);
      },
    })
  },
  getImageInfo:function(url){
    if(typeof url === 'string'){
      wx.getImageInfo({
        src: url,
        success:function(res){
          that.setData({
            head_img:res.path
          });
          that.drawPoster();//画海报
        },
        fail:function(error){
          console.log(error);
        }
      })
    }
  },
  /**
   * 画海报
   */
  drawPoster:function(){
    const ctx = wx.createCanvasContext();
    ctx.clearRect(0, 0, 0, 0);
    const WIDTH = 375 * scale;
    const HEIGHT = 666 * scale;
    //绘制背景
    ctx.drawImage('../images/haibaoBG.png', 0, 0, WIDTH, HEIGHT);
    //绘制banner
    ctx.drawImage('../images/haibaoBaner.png', 20*scale, 20*scale, 335*scale, 290*scale);
    //绘制头像
    ctx.save()
    let r = 16 * scale;
    let d = r * 2;
    let cx = 51 * scale;
    let cy = 584 * scale;
    ctx.beginPath()
    ctx.arc(cx+r, cy+r, r, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(that.data.head_img, cx, cy,d,d)
    ctx.restore()

    //绘制文字(时间)
    ctx.setFontSize(20*scale);
    ctx.fillText('2018. 06. 08', 30*scale, 340*scale);

    //绘制正文
    const CONTENT_ROW_LENGTH = 43; //正文 单行显示字符长度
    let [contentLength, contentArray, contentRows] = this.textByteLength(this.data.nodeData, CONTENT_ROW_LENGTH);
    ctx.setTextAlign('left');
    ctx.setFontSize(16*scale);
    let contentHh = 22 * 1.3;
    for (let m = 0; m < contentArray.length; m++) {
      ctx.fillText(contentArray[m], 20*scale, (366 + contentHh * m)*scale);
    }

    //绘制出处
    ctx.setTextAlign('right');
    ctx.setFontSize(16*scale);
    ctx.fillText('——— ' + this.data.come, 365*scale, 498*scale, 365*scale);

    //绘制二维码边上的说明
    ctx.setTextAlign('left');
    ctx.setFontSize(14*scale);
    // ctx.setFillStyle('rgb(34,34,34,.64)');
    ctx.fillText('长按小程序码', 125*scale, 587*scale);
    ctx.fillText(this.data.userName + '邀请你进入掌阅读好书', 125*scale, 615*scale);

    wx.drawCanvas({
      canvasId: 1,
      actions: ctx.getActions()
    });
  },
  /**
   * 将文字折行处理
   */
  textByteLength(text, num) {
    let strLength = 0;
    let rows = 1;
    let str = 0;
    let arr = [];
    for (let j = 0; j < text.length; j++) {
      if (text.charCodeAt(j) > 255) {
        strLength += 2;
        if (strLength > rows * num) {
          strLength++;
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      } else {
        strLength++;
        if (strLength > rows * num) {
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      }
    }
    arr.push(text.slice(str, text.length));
    return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
  },
  /**
   * 生成并保存海报到相册触发事件
   */
  createPoster:function(e){
    console.log('开启授权')
    wx.getSetting({
      success(res){
        console.log(res);
        if(!res.authSetting['scope.writePhotosAlbum']){
          console.log('未授权')
          //如果用户拒绝了授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success:function(result){
              console.log(result);
              that.savePoster();
            },
            fail(){
              console.log('用户拒绝授权')
              isRefuseAuth = true;
              that.setData({
                isShowAuthBtn: true,
              })
            }
          })
        }else{
          //用户已经授权
          that.savePoster();
        }
      }
    })
  },
  /**
   * 保存海报
   */
  savePoster:function(){
    wx.canvasToTempFilePath({
      canvasId: '1',
      fileType:'jpg',
      success:function(res){
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success:function(res){
            wx.showToast({
              title: '保存成功',
            })
          },
          fail:function(){
            wx.showToast({
              title: '保存失败',
            })
          }
        })
      },
    }, that)
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
    if(isRefuseAuth){
      wx.getSetting({
        success(res) {
          console.log(res);
          if (!res.authSetting['scope.writePhotosAlbum']) {
            //如果用户拒绝了授权
            that.setData({
              isShowAuthBtn: true,
            })
          } else {
            //用户已经授权
            that.setData({
              isShowAuthBtn: false,
            })
          }
        }
      })
    }
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