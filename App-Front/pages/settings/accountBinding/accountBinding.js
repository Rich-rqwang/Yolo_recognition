Page({
  data: {
    accounts: [
      { name: 'Facebook', icon: 'facebook', bound: false },
      { name: 'Twitter', icon: 'twitter', bound: true },
      { name: 'GitHub', icon: 'github', bound: false },
      { name: 'LinkedIn', icon: 'linkedin', bound: false }
    ]
  },

  handleBinding: function(e) {
    const { index } = e.currentTarget.dataset;
    const accounts = this.data.accounts;
    accounts[index].bound = !accounts[index].bound;
    this.setData({ accounts });

    wx.showToast({
      title: accounts[index].bound ? '绑定成功' : '解绑成功',
      icon: 'success',
      duration: 2000
    });
  },

  handleSave: function() {
    // 这里可以添加保存更改的逻辑
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    });
  }
});