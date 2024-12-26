Page({
  data: {
    model: '',
    weightFile: '',
    isProcessing: false,
    fileUrl: '',
    isVideo: false,
    result: '',
  },

  onLoad: function(options) {
    if (options.model && options.weightFile) {
      this.setData({
        model: decodeURIComponent(options.model),
        weightFile: decodeURIComponent(options.weightFile)
      });
    } else {
      wx.showToast({
        title: 'Missing model information',
        icon: 'none'
      });
    }
  },

  uploadImage: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.uploadToBackend(tempFilePaths[0], 'image');
      }
    });
  },

  uploadVideo: function() {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFilePath;
        this.uploadToBackend(tempFilePath, 'video');  // 正确传递 'video'
      }
    });
  },

  uploadToBackend: function(filePath, fileType) {
    this.setData({
      isProcessing: true,
      fileUrl: '',
      result: '',
    });

    wx.uploadFile({
      url: 'http://penetration.free.idcfengye.com/detect',
      filePath: filePath,
      name: 'source',
      formData: {
        weight_file: this.data.weightFile,
        fileType: fileType,  // 传递文件类型
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data);
          this.setData({
            fileUrl: data.result,
            isVideo: fileType === 'video',  // 判断是否是视频
            result: 'Analysis complete',
            isProcessing: false
          });
        } else {
          this.handleError('Server returned an error.');
        }
      },
      fail: (err) => {
        this.handleError('Upload failed: ' + err.errMsg);
      }
    });
  },

  handleError: function(errorMsg) {
    console.error(errorMsg);
    this.setData({
      result: 'Processing failed. Please try again.',
      isProcessing: false
    });
    wx.showToast({
      title: errorMsg,
      icon: 'none'
    });
  }
});
