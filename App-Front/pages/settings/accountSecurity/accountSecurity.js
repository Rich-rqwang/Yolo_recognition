Page({
  data: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  },

  handleInputChange: function(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  handleTwoFactorSwitch: function(e) {
    this.setData({
      twoFactorEnabled: e.detail.value
    });
  },

  handleUpdatePassword: function() {
    // 这里可以添加更新密码的逻辑
    wx.showToast({
      title: '密码已更新',
      icon: 'success',
      duration: 2000
    });
  },

  handleViewLoginHistory: function() {
    // 这里可以添加查看登录历史的逻辑
    wx.navigateTo({
      url: '/pages/loginHistory/loginHistory'
    });
  }
});