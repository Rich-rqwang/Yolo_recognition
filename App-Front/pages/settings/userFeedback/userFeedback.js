Page({
  data: {
    feedbackType: 'suggestion',
    title: '',
    description: '',
    email: ''
  },

  handleFeedbackTypeChange: function(e) {
    this.setData({
      feedbackType: e.detail.value
    });
  },

  handleInputChange: function(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  handleSubmit: function() {
    // 这里可以添加提交反馈的逻辑
    console.log(this.data);
    wx.showToast({
      title: '反馈已提交',
      icon: 'success',
      duration: 2000
    });
  }
});