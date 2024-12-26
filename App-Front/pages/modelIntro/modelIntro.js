Page({
  data: {
    models: [
      {
        id: 1,
        name: '烟雾识别',
        description: '基于深度学习的工业场景烟雾检测系统，实时监控并预警潜在危险。',
        icon: '/figures/烟雾识别.png',
        animationClass: ''
      },
      {
        id: 2,
        name: '火焰识别',
        description: '智能火焰检测系统，快速识别各类场景中的火情，提供及时预警。',
        icon: '/figures/火焰.png',
        animationClass: ''
      },
      {
        id: 3,
        name: '人员落水识别',
        description: '水域安全智能监控系统，及时发现和预警落水事件。',
        icon: '/figures/人员落水.png',
        animationClass: ''
      },
      {
        id: 4,
        name: '光伏巡检识别',
        description: '太阳能电站智能巡检系统，自动识别设备异常和性能问题。',
        icon: '/figures/光伏板识别.png',
        animationClass: ''
      },
      {
        id: 5,
        name: '河道漂浮物识别',
        description: '河道智能监测系统，实时检测水面漂浮物，助力环境保护。',
        icon: '/figures/河道漂浮物识别.png',
        animationClass: ''
      },
      {
        id: 6,
        name: '农田作物生长识别',
        description: '农作物生长状况智能监测系统，实时掌握作物生长情况。',
        icon: '/figures/农作物生长.png',
        animationClass: ''
      },
      {
        id: 7,
        name: '行人闯红灯识别',
        description: '智能交通监控系统，自动识别行人闯红灯行为。',
        icon: '/figures/行人闯红灯.png',
        animationClass: ''
      },
      {
        id: 8,
        name: '车辆闯红灯识别',
        description: '道路交通违章智能检测系统，准确识别车辆闯红灯行为。',
        icon: '/figures/车辆闯红灯.png',
        animationClass: ''
      },
      {
        id: 9,
        name: '人员摔倒识别',
        description: '智能摔倒检测系统，及时发现意外摔倒事件并预警。',
        icon: '/figures/人员摔倒.png',
        animationClass: ''
      },
      {
        id: 10,
        name: '景区客流量识别',
        description: '景区智能客流监测系统，实时分析游客流量分布。',
        icon: '/figures/客流量.png',
        animationClass: ''
      }
    ]
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: 'Project Introduction'
    });

    setTimeout(() => {
      this.animateCards();
    }, 100);
  },

  animateCards: function() {
    const models = this.data.models;
    models.forEach((model, index) => {
      setTimeout(() => {
        model.animationClass = 'animate';
        this.setData({
          models: models
        });
      }, index * 150);
    });
  },

  onModelTap: function(e) {
    const modelId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/model-detail/index?id=${modelId}`
    });
  }
});
