Page({
  data: {},

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: 'YOLO Recognition'
    });

    // 设置导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',  // 文字颜色
      backgroundColor: '#000000',  // 背景颜色
    });
  },

  navigateToRecognition: function() {
    wx.switchTab({
      url: '/pages/recognition/recognition'
    });
  }
});
