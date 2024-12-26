<template>
  <div class="container" style="background-color: white;">
    <h1 style="margin-top: 40px;">{{ displayTitle }}识别</h1>
    <div class="button-group">
      <button @click="clearSelectedMedia">{{ currentMode === 'image'? '清除图片' : '清除视频' }}</button>
      <input type="file" @change="onFileChange" :accept="currentMode === 'image'? 'image/*' : 'video/*'" style="display: none;" ref="fileInput">
      <button @click="triggerFileInput">{{ currentMode === 'image'? '选择文件' : '选择视频文件' }}</button>
      <button @click="submitMedia">{{ currentMode === 'image'? '提交图片' : '提交视频' }}</button>
      <button @click="showHistoryMessage">历史记录</button>
      <button @click="showModeSwitchMessage">切换模式</button>
      <button @click="showProcessDemoMessage">流程演示</button>
      <button @click="saveProcessedMedia">{{ currentMode === 'image'? '保存图片' : '保存视频' }}</button>
    </div>
    <!-- 添加一个div用于设置按钮与媒体框之间的间距 -->
    <div style="margin-top: 20px;"></div>
    <div v-if="currentMode === 'image'" class="image-media-container">
      <div class="original-image" :style="{ width: '80vw', height: '70vh', marginLeft: '5vw', backgroundColor: '#eee', border: '5px solid black', borderRadius: '10px' }">
        <img v-if="previewImageUrl" :src="previewImageUrl" alt="Original Image" :style="originalImageStyle">
      </div>
      <div class="processed-image" :style="{ width: '80vw', height: '70vh', marginRight: '5vw', backgroundColor: '#ddd', border: '5px solid black', borderRadius: '10px' }">
        <img v-if="processedImageUrl" :src="processedImageUrl" alt="Processed Image" :style="processedImageStyle">
      </div>
    </div>
    <!-- 添加一个div用于设置两个媒体框之间的间距 -->
    <div v-if="currentMode === 'video'" style="margin-top: 20px;"></div>
    <div v-if="currentMode === 'video'" class="video-media-container">
      <div class="original-video" :style="{ width: '40vw', height: '35vh', marginLeft: '5vw', backgroundColor: '#eee', border: '5px solid black', borderRadius: '10px' }">
        <video v-if="previewVideoUrl" :src="previewVideoUrl" controls></video>
      </div>
      <div class="processed-video" :style="{ width: '40vw', height: '35vh', marginRight: '5vw', backgroundColor: '#ddd', border: '5px solid black', borderRadius: '10px' }">
        <video v-if="processedVideoUrl" :src="processedVideoUrl" controls></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      selectedFile: null,
      previewImageUrl: null,
      processedImageUrl: null,
      weightFile: null,
      currentMode: 'image',
      previewVideoUrl: null,
      processedVideoUrl: null
    };
  },
  computed: {
    displayTitle() {
      // 如果 weightFile 存在，则去掉扩展名并返回友好名称
      return this.weightFile? this.weightFile.replace('.pt', '') : '未选择检测模型';
    },
    originalImageStyle() {
      if (this.previewImageUrl) {
        const img = new Image();
        img.src = this.previewImageUrl;
        const imgWidth = img.width;
        const imgHeight = img.height;
        const containerWidth = 80 * window.innerWidth / 100;
        const containerHeight = 80 * window.innerHeight / 100;
        let scale = 1;
        if (imgWidth > containerWidth || imgHeight > containerHeight) {
          scale = imgWidth / containerWidth > imgHeight / containerHeight? containerWidth / imgWidth : containerHeight / imgHeight;
        }
        return {
          transform: `scale(${scale})`,
          maxWidth: '100%',
          maxHeight: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        };
      }
      return {};
    },
    processedImageStyle() {
      if (this.processedImageUrl) {
        const img = new Image();
        img.src = this.processedImageUrl;
        const imgWidth = img.width;
        const imgHeight = img.height;
        const containerWidth = 80 * window.innerWidth / 100;
        const containerHeight = 80 * window.innerHeight / 100;
        let scale = 1;
        if (imgWidth > containerWidth || imgHeight > containerHeight) {
          scale = imgWidth / containerWidth > imgHeight / containerHeight? containerWidth / imgWidth : containerHeight / imgHeight;
        }
        return {
          transform: `scale(${scale})`,
          maxWidth: '100%',
          maxHeight: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        };
      }
      return {};
    },
  },
  created() {
    // 从路由参数中获取权重文件名称
    this.weightFile = this.$route.query.weight_file;
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImageUrl = e.target.result;
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
          this.previewVideoUrl = URL.createObjectURL(file);
        }
      } else {
        alert("请选择一个文件！");
      }
    },
    async submitMedia() {
      if (!this.previewImageUrl &&!this.previewVideoUrl) {
        alert('请先选择一张图片或视频进行提交。');
        return;
      }
      if (!this.weightFile) {
        alert('未选择检测模型。');
        return;
      }

      const formData = new FormData();
      formData.append("weight_file", this.weightFile);
      if (this.currentMode === 'image') {
        formData.append("source", this.selectedFile);
      } else if (this.currentMode === 'video') {
        formData.append("source", this.selectedFile);
      }

      try {
        const response = await fetch("http://localhost:5000/detect", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.result) {
          if (this.currentMode === 'image') {
            this.processedImageUrl = `data:image/png;base64,${data.result}`;
          } else if (this.currentMode === 'video') {
            this.processedVideoUrl = `data:video/mp4;base64,${data.result}`;
          }
        } else {
          alert("检测失败：" + data.error);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("请检查后端连接。");
      }
    },
    clearSelectedMedia() {
      this.selectedFile = null;
      this.previewImageUrl = null;
      this.previewVideoUrl = null;
      this.processedImageUrl = null;
      this.processedVideoUrl = null;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    showHistoryMessage() {
      alert('历史记录暂未开发');
    },
    // 增加了模式切换功能
    showModeSwitchMessage() {
      this.currentMode = this.currentMode === 'image'? 'video' : 'image';
    },
    showProcessDemoMessage() {
      alert('流程演示暂未开发');
    },
    // 修改了保存的逻辑
    saveProcessedMedia() {
      if (!this.processedImageUrl &&!this.processedVideoUrl) {
        alert('没有处理后的图片或视频可保存。');
        return;
      }
      const link = document.createElement('a');
      if (this.currentMode === 'image') {
        link.href = this.processedImageUrl;
        link.download = 'processed_image.png';
      } else if (this.currentMode === 'video') {
        link.href = this.processedVideoUrl;
        link.download = 'processed_video.mp4';
      }
      link.click();
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  font-size: 18px;
  border: 3px solid gray;
  border-radius: 10px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}
.image-media-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.video-media-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.original-image,
.processed-image {
  position: relative;
  marginRight: 3vw;
}
.original-video,
.processed-video {
  position: relative;
  marginRight: 3vw;
}
/* 视频容器样式修改 */
.original-video video,
.processed-video video {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保视频按比例缩放且不超出容器 */
}
</style>