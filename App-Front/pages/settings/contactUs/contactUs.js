Page({
  data: {
    name: '',
    email: '',
    message: ''
  },

  handleInputChange: function(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  handleSubmit: function() {
    // 这里可以添加提交表单的逻辑
    console.log(this.data);
    wx.showToast({
      title: '消息已发送',
      icon: 'success',
      duration: 2000
    });
  }
});