// pages/Home/poster/poster.js
var that;
var scale;
var util = require('../../common/util.js')
var title = "";
var sub_title = "";
var author = "";
var course_id;
var path;
var isRefuseAuth = false;
var tmpY = 20;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowAuthBtn:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    title = JSON.parse(options.title);
    sub_title = JSON.parse(options.sub_title);
    author = JSON.parse(options.author)
    course_id = JSON.parse(options.course_id)
    path = options.path
    console.log(course_id);
    console.log(path);
    var scene = decodeURIComponent(options.scene)
    console.log(scene);
    that = this;
    that.loadCode();
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        console.log('屏幕宽度：' + ww);
        scale = ww / 375.0;
        console.log(scale);
      }
    })
    this.getUserInfos();
  },
  //请求二维码相关数据
  loadCode:function(){
    wx.showLoading({
      title: '正在生成海报',
    });
    util.qrcode_b(
      course_id,
      path,
      function (res) {
        console.log('二维码请求结果为：')
        console.log(res)
        if (res.data.success){
          that.getImageInfo(res);
        }else{
          that.loadCode();
        }
      }
    );
  },
  /**
  * 获取用户信息
  */
  getUserInfos: function () {
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          userName: res.userInfo.nickName
        });
        // that.getImageInfo(res.userInfo.avatarUrl);
      },
    })
  },
  getImageInfo: function (value) {
    //背景图
    if (typeof value.data.data.backgroud.file_url === 'string') {
      wx.getImageInfo({
        src: value.data.data.backgroud.file_url,
        success: function (res) {
          that.setData({
            "bgImg": res.path,
          });
          //海报中间图
          if (typeof value.data.data.poster_image.file_url === 'string') {
            wx.getImageInfo({
              src: value.data.data.poster_image.file_url,
              success: function (res) {
                that.setData({
                  "postimg": res.path,
                });
                //二维码
                if (typeof value.data.data.qrcode.file_url === 'string') {
                  wx.getImageInfo({
                    src: value.data.data.qrcode.file_url,
                    success: function (res) {
                      that.setData({
                        "codeImg": res.path,
                      });
                      console.log(that.data);
                      that.drawPoster();//画海报
                    },
                    fail: function (error) {
                      console.log(error);
                      that.drawPoster();//画海报
                    }
                  })
                }
              },
              fail: function (error) {
                console.log(error);
                //二维码
                if (typeof value.data.data.qrcode.file_url === 'string') {
                  wx.getImageInfo({
                    src: value.data.data.qrcode.file_url,
                    success: function (res) {
                      that.setData({
                        "codeImg": res.path,
                      });
                      console.log(that.data);
                      that.drawPoster();//画海报
                    },
                    fail: function (error) {
                      console.log(error);
                      that.drawPoster();//画海报
                    }
                  })
                }
              }
            })
          }else{
            //二维码
            if (typeof value.data.data.qrcode.file_url === 'string') {
              wx.getImageInfo({
                src: value.data.data.qrcode.file_url,
                success: function (res) {
                  that.setData({
                    "codeImg": res.path,
                  });
                  console.log(that.data);
                  that.drawPoster();//画海报
                },
                fail: function (error) {
                  console.log(error);
                  that.drawPoster();//画海报
                }
              })
            }
          }
        },
        fail: function (error) {
          console.log(error);
        }
      })
    }
  },
  /**
   * 画海报
   */
  drawPoster: function () {
    console.log('开始绘图')
    const ctx = wx.createCanvasContext();
    ctx.clearRect(0, 0, 0, 0);
    const WIDTH = 375 * scale;
    const HEIGHT = 666 * scale;
    //绘制背景
    ctx.drawImage(that.data.bgImg, 0, 0, WIDTH, HEIGHT);//'../../image/other/poster_bg.png'
    //绘制大标题
    const CONTENT_ROW_LENGTH = 19;  // 正文 单行显示字符长度
    let [contentLeng, contentArray, contentRows] = this.textByteLength(title, CONTENT_ROW_LENGTH);
    ctx.setTextAlign('center')
    ctx.setFontSize(25*scale);
    let contentHh = 25 * 1.3 *scale;
    for (let m = 0; m < contentArray.length; m++) {
      ctx.fillText(contentArray[m], 190*scale, (106 + contentHh * m)*scale);
    }

    //绘制副标题
    const CONTENT_ROW_LENGTH2 =26;  //  单行显示字符长度
    let [contentLeng2, contentArray2, contentRows2] = this.textByteLength(sub_title, CONTENT_ROW_LENGTH2);
    ctx.setTextAlign('center')
    ctx.setFontSize(18*scale);
    ctx.setFillStyle('#70C79F'); 
    let contentHh2 = 18 * 1.3 *scale;
    for (let m = 0; m < contentArray2.length; m++) {
      ctx.fillText(contentArray2[m], 190 * scale, (200 - tmpY + contentHh2 * m) * scale);
    }

    //绘制作者
    ctx.setFontSize(15 * scale);
    ctx.setTextAlign('center');
    ctx.setFillStyle('#000000');
    ctx.fillText(''+ author, 190 * scale, (280 - tmpY - 10) * scale);
    
    //绘制中间图
    console.log('绘制中间图')
    if (that.data.postimg){
      ctx.drawImage(that.data.postimg, 68 * scale, (305 - tmpY) * scale, 240 * scale, 135 * scale);//135
    }
    
    //绘制二维码
    console.log('绘制二维码')
    if (that.data.codeImg){
      ctx.drawImage(that.data.codeImg, 148 * scale, 510 * scale, 80 * scale, 80 * scale);
    }
    
    wx.drawCanvas({
      canvasId: 1,
      actions: ctx.getActions()
    });
    wx.hideLoading();
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
   * 预览
   */
  previewImage:function(e){
    wx.previewImage({
      urls: ['../../image/other/poster_bg.png'],
    })
  },
  /**
   * 生成并保存海报到相册触发事件
   */
  createPoster: function (e) {
    // wx.showActionSheet({
    //   itemList: ['发送给好友', '保存到本地'],
    // })
    // return
    console.log('开启授权')
    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log('未授权')
          //如果用户拒绝了授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (result) {
              console.log(result);
              that.savePoster();
            },
            fail() {
              console.log('用户拒绝授权')
              isRefuseAuth = true;
              that.setData({
                isShowAuthBtn: true,
              })
            }
          })
        } else {
          //用户已经授权
          that.savePoster();
        }
      }
    })
  },
  /**
   * 保存海报
   */
  savePoster: function () {
    wx.canvasToTempFilePath({
      canvasId: '1',
      fileType: 'jpg',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function () {
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
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (isRefuseAuth) {
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
        },
        fail() {
          console.log('用户拒绝授权')
          isRefuseAuth = true;
          that.setData({
            isShowAuthBtn: true,
          })
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
    wx.hideLoading();
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