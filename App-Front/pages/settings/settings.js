Page({
  data: {
    userName: '',
    avatarUrl: '',
    menuItems: [
      { title: '个人信息管理', page: 'personalInfo' },
      { title: '账号与安全', page: 'accountSecurity' },
      { title: '账号与绑定', page: 'accountBinding' },
      { title: '通知管理设置', page: 'notificationSettings' },
      { title: '用户反馈提交', page: 'userFeedback' },
      { title: '版本更新', page: 'versionUpdate' },
      { title: '联系我们', page: 'contactUs' }
    ]
  },

  onLoad: function() {
    this.getUserInfo();
  },

  getUserInfo: function() {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          userName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        });
      },
      fail: function() {
        that.setData({
          userName: '未登录'
        });
      }
    });
  },

  navigateToPage: function(e) {
    const page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: `/pages/settings/${page}/${page}`
    });
  },

  chooseImage: function() {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function() {
              that.selectAndUploadImage();
            },
            fail: function() {
              wx.showModal({
                title: '提示',
                content: '需要您授权才能上传头像',
                showCancel: false,
                success: function(res) {
                  if (res.confirm) {
                    wx.openSetting();
                  }
                }
              });
            }
          });
        } else {
          that.selectAndUploadImage();
        }
      }
    });
  },

  selectAndUploadImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          avatarUrl: tempFilePaths[0]
        });
        // 可添加图片上传逻辑
      }
    });
  }
});
