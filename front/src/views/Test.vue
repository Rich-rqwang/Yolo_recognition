<template>
  <div class="page-wrapper">
    <div class="container">
      <h1 style="margin-top: 40px;">{{ displayTitle }}识别</h1>
      <div class="button-group">
        <button @click="clearSelectedMedia">{{ currentMode === 'image' ? '清除图片' : '清除视频' }}</button>
        <input type="file" @change="onFileChange" :accept="currentMode === 'image' ? 'image/*' : 'video/*'" style="display: none;" ref="fileInput">
        <button @click="triggerFileInput">{{ currentMode === 'image' ? '选择文件' : '选择视频文件' }}</button>
        <button @click="submitMedia">{{ currentMode === 'image' ? '提交图片' : '提交视频' }}</button>
        <button @click="showHistoryMessage">历史记录</button>
        <button @click="showModeSwitchMessage">切换模式</button>
        <button @click="showProcessDemoMessage">流程演示</button>
        <button @click="saveProcessedMedia">{{ currentMode === 'image' ? '保存图片' : '保存视频' }}</button>
        <button @click="navigateToAiAnalysis">AI大模型分析与帮助</button>
      </div>
      <div style="margin-top: 20px;"></div>
      <div v-if="currentMode === 'image'" class="image-media-container">
        <div class="original-image" :style="{ width: '80vw', height: '70vh', marginLeft: '5vw', backgroundColor: '#eee', border: '5px solid black', borderRadius: '10px' }">
          <img v-if="previewImageUrl" :src="previewImageUrl" alt="Original Image" :style="originalImageStyle">
        </div>
        <div class="processed-image" :style="{ width: '80vw', height: '70vh', marginRight: '5vw', backgroundColor: '#ddd', border: '5px solid black', borderRadius: '10px' }">
          <img
            v-if="processedImageUrl"
            :src="processedImageUrl"
            alt="Processed Image"
            :style="processedImageStyle"
            @error="handleImageError"
          >
          <div v-if="ossError" class="error-overlay">
            <p>{{ ossError }}</p>
            <button @click="retryLoadImage" class="retry-button">重试加载</button>
          </div>
        </div>
      </div>
      <div v-if="currentMode === 'video'" style="margin-top: 20px;"></div>
      <div v-if="currentMode === 'video'" class="video-media-container">
        <div class="original-video" :style="{ width: '40vw', height: '35vh', marginLeft: '5vw', backgroundColor: '#eee', border: '5px solid black', borderRadius: '10px' }">
          <video v-if="previewVideoUrl" :src="previewVideoUrl" controls></video>
        </div>
        <div class="processed-video" :style="{ width: '40vw', height: '35vh', marginRight: '5vw', backgroundColor: '#ddd', border: '5px solid black', borderRadius: '10px' }">
          <video v-if="processedVideoUrl" :src="processedVideoUrl" controls></video>
          <div v-if="videoProcessing" class="loading-overlay">
            <p>视频处理中，请稍候...</p>
          </div>
        </div>
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
        <button class="retry-button" @click="retryConnection">重试</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OssMediaViewer',
  data() {
    return {
      selectedFile: null,
      previewImageUrl: null,
      processedImageUrl: null,
      weightFile: null,
      currentMode: 'image',
      previewVideoUrl: null,
      processedVideoUrl: null,
      videoProcessing: false,
      errorMessage: '',
      isRetrying: false,
      ossError: null,
      retryCount: 0,
      maxRetries: 3
    };
  },
  computed: {
    displayTitle() {
      return this.weightFile ? this.weightFile.replace('.pt', '') : '未选择检测模型';
    },
    originalImageStyle() {
      if (this.previewImageUrl) {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        };
      }
      return {};
    },
    processedImageStyle() {
      if (this.processedImageUrl) {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        };
      }
      return {};
    },
  },
  created() {
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
      if (!this.previewImageUrl && !this.previewVideoUrl) {
        this.showError('请先选择一张图片或视频进行提交。');
        return;
      }
      if (!this.weightFile) {
        this.showError('未选择检测模型。');
        return;
      }

      const formData = new FormData();
      formData.append("weight_file", this.weightFile);
      formData.append("source", this.selectedFile);
      formData.append("fileType", this.currentMode);

      try {
        this.videoProcessing = this.currentMode === 'video';
        this.errorMessage = '';
        this.ossError = null;
        this.retryCount = 0;

        const response = await fetch("http://penetration.free.idcfengye.com/detect", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.result) {
          console.log('Received OSS URL:', data.result);
          if (this.currentMode === 'image') {
            this.processedImageUrl = data.result;
          } else if (this.currentMode === 'video') {
            this.processedVideoUrl = data.result;
          }
        } else {
          throw new Error(data.error || "处理失败，未收到结果");
        }
      } catch (error) {
        console.error("Error:", error);
        this.showError(`处理失败: ${error.message}`);
      } finally {
        this.videoProcessing = false;
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
    showModeSwitchMessage() {
      this.currentMode = this.currentMode === 'image' ? 'video' : 'image';
    },
    showProcessDemoMessage() {
      alert('流程演示暂未开发');
    },
    saveProcessedMedia() {
      if (!this.processedImageUrl && !this.processedVideoUrl) {
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
    },
    showError(message) {
      this.errorMessage = message;
      console.error(message);
      setTimeout(() => {
        if (this.errorMessage === message) {
          this.errorMessage = '';
        }
      }, 5000);
    },
    retryConnection() {
      if (!this.isRetrying) {
        this.isRetrying = true;
        this.errorMessage = '';
        this.submitMedia().finally(() => {
          this.isRetrying = false;
        });
      }
    },
    handleImageError(event) {
      console.error('Image loading error:', event);
      this.showError('图片加载失败，请检查网络连接或刷新页面重试');
    },
    async retryLoadImage() {
      if (!this.processedImageUrl) return;

      try {
        this.ossError = null;
        const response = await fetch(this.processedImageUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const blob = await response.blob();
        this.processedImageUrl = URL.createObjectURL(blob);
      } catch (error) {
        console.error('Retry failed:', error);
        this.ossError = `图片加载失败: ${error.message}`;
      }
    },
    navigateToAiAnalysis() {
      if (this.currentMode === 'image' && this.processedImageUrl) {
        this.$router.push({
          name: 'aiAnalysis',
          query: {
            processedImageUrl: this.processedImageUrl,
            currentMode: this.currentMode
          }
        });
      } else if (this.currentMode === 'video' && this.processedVideoUrl) {
        this.$router.push({
          name: 'aiAnalysis',
          query: {
            processedVideoUrl: this.processedVideoUrl,
            currentMode: this.currentMode
          }
        });
      } else {
        alert('请先处理图片或视频');
      }
    }
  }
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom, #182935, #243447);
  padding: 20px;
}

.container {
  text-align: center;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  max-width: 95%;
}

h1 {
  font-size: 3rem;
  color: #00cec9;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
}

button {
  padding: 15px 25px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background-color: #00cec9;
  color: #182935;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-family: 'Open Sans', sans-serif;
}

button:hover {
  background-color: #1dd1a1;
  transform: translateY(-3px);
  border: 2px solid #1dd1a1;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

button:active {
  transform: scale(0.95);
  background-color: #128d76;
}

.image-media-container,
.video-media-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.original-image,
.processed-image,
.original-video,
.processed-video {
  position: relative;
  flex: 1;
  height: 400px;
  border: 3px solid #00cec9;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #243447, #182935);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

img,
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(217, 235, 233, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00cec9;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  font-family: 'Open Sans', sans-serif;
}

.loading-overlay p {
  animation: fadeInOut 2s infinite;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.error-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff4757;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(255, 71, 87, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 15px;
  backdrop-filter: blur(8px);
  border: 1px solid #ff4757;
  white-space: pre-line;
  max-width: 80%;
  font-size: 14px;
}

.retry-button {
  padding: 8px 15px;
  font-size: 14px;
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background-color: #ff6b81;
  transform: translateY(-2px);
}

.retry-button:active {
  transform: translateY(0);
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  color: white;
}

.error-overlay p {
  margin-bottom: 15px;
  white-space: pre-line;
}

.retry-button {
  background-color: #00cec9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background-color: #00b5b5;
  transform: translateY(-2px);
}

.retry-button:active {
  transform: translateY(0);
}
</style>
