Page({
  data: {
    detectionItems: [
      { 
        id: 'smoke', 
        title: '烟雾识别', 
        image: '../../figures/烟雾识别.jpg',
        weightFile: '烟雾.pt'
      },
      { 
        id: 'fire', 
        title: '火焰识别', 
        image: '../../figures/火焰识别.jpeg',
        weightFile: '火焰.pt'
      },
      { 
        id: 'drowning', 
        title: '人员落水识别', 
        image: '../../figures/人员落水识别.jpeg',
        weightFile: '人员落水.pt'
      },
      { 
        id: 'solar', 
        title: '光伏巡检识别', 
        image: '../../figures/无人机光伏巡检识别.jpeg',
        weightFile: '光伏板.pt'
      },
      { 
        id: 'river', 
        title: '河道漂浮物识别', 
        image: '../../figures/河道漂浮物.jpg',
        weightFile: '河道漂浮物.pt'
      },
      { 
        id: 'crops', 
        title: '农田作物生长情况识别', 
        image: '../../figures/农田作物生长情况识别.jpg',
        weightFile: '植物生长.pt'
      },
      { 
        id: 'pedestrian', 
        title: '行人闯红灯识别', 
        image: '../../figures/行人闯红灯.jpg',
        weightFile: '人闯红灯.pt'
      },
      { 
        id: 'vehicle', 
        title: '车辆闯红灯识别', 
        image: '../../figures/车辆闯红灯.jpg',
        weightFile: '车闯红灯.pt'
      },
      { 
        id: 'fall', 
        title: '人员摔倒识别', 
        image: '../../figures/人员摔倒识别.jpeg',
        weightFile: '人员摔倒.pt'
      },
      { 
        id: 'crowd', 
        title: '景区客流量识别', 
        image: '../../figures/景区客流量识别.jpeg',
        weightFile: '景区人流量识别.pt'
      }
    ]
  },

  navigateToFeature: function(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.detectionItems.find(item => item.id === id);
    
    if (!item) {
      wx.showToast({
        title: '功能未找到',
        icon: 'none'
      });
      return;
    }

    wx.navigateTo({
      url: `/pages/detection/detection?model=${encodeURIComponent(item.title)}&weightFile=${encodeURIComponent(item.weightFile)}`
    });
  }
});

