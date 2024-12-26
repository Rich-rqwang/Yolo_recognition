Page({
  data: {
    username: '',
    gender: 'female',
    birthday: '',
    idNumber: ''
  },

  handleInputChange: function(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  handleGenderChange: function(e) {
    this.setData({
      gender: e.detail.value
    });
  },

  handleDateChange: function(e) {
    this.setData({
      birthday: e.detail.value
    });
  },

  handleSubmit: function() {
    // 这里可以添加提交表单到服务器的逻辑
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    });
  }
});