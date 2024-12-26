Page({
  data: {
    notifications: [
      { type: 'push', label: '推送通知', enabled: true },
      { type: 'email', label: '邮件通知', enabled: false },
      { type: 'mention', label: '提及通知', enabled: true },
      { type: 'like', label: '点赞通知', enabled: false }
    ],
    frequency: 'everything'
  },

  toggleNotification: function(e) {
    const { index } = e.currentTarget.dataset;
    const notifications = this.data.notifications;
    notifications[index].enabled = !notifications[index].enabled;
    this.setData({ notifications });
  },

  handleFrequencyChange: function(e) {
    this.setData({
      frequency: e.detail.value
    });
  },

  handleSave: function() {
    // 这里可以添加保存设置的逻辑
    wx.showToast({
      title: '设置已保存',
      icon: 'success',
      duration: 2000
    });
  }
});