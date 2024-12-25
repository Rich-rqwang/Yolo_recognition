<template>
  <div class="container" style="background-color: white;">
    <h1>测试版1</h1>
    <div class="button-group">
      <button @click="clearSelectedImage">清除图片</button>
      <input type="file" @change="onFileChange" accept="image/*" style="display: none;">
      <button @click="triggerFileInput">选择文件</button>
      <button @click="submitImage">提交图片</button>
      <button @click="showHistoryMessage">历史记录</button>
      <button @click="showModeSwitchMessage">切换模式</button>
      <button @click="showProcessDemoMessage">流程演示</button>
      <button @click="saveProcessedImage">保存图片</button>
    </div>
    <div class="image-container">
      <div class="original-image" :style="{ width: '80vw', height: '70vh', marginLeft: '5vw', backgroundColor: '#eee', border: '5px solid black', borderRadius: '10px' }">
        <img v-if="previewImageUrl" :src="previewImageUrl" alt="Original Image" :style="originalImageStyle">
      </div>
      <div class="processed-image" :style="{ width: '80vw', height: '70vh', marginRight: '5vw', backgroundColor: '#ddd', border: '5px solid black', borderRadius: '10px' }">
        <img v-if="processedImageUrl" :src="processedImageUrl" alt="Processed Image" :style="processedImageStyle">
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
    };
  },
  computed: {
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
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    },
    submitImage() {
      if (!this.previewImageUrl) {
        alert('请先选择一张图片进行提交。');
        return;
      }
      alert('已提交。\n现在先用原图做测试。');
      // 模拟提交后在右侧显示图片
      this.processedImageUrl = this.previewImageUrl;
    },
    clearSelectedImage() {
      this.selectedFile = null;
      this.previewImageUrl = null;
    },
    triggerFileInput() {
      document.querySelector('input[type="file"]').click();
    },
    showProcessDemoMessage() {
      alert('流程演示暂未开发');
    },
    showHistoryMessage() {
      alert('历史记录暂未开发');
    },
    showModeSwitchMessage() {
      alert('切换模式暂未开发');
    },
    saveProcessedImage() {
      if (!this.processedImageUrl) {
        alert('没有处理后的图片可保存。');
        return;
      }
      const link = document.createElement('a');
      link.href = this.processedImageUrl;
      link.download = 'processed_image.png';
      link.click();
    }
  },
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
.image-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.original-image,
.processed-image {
  position: relative;
  margin-right: 3vw;
}
</style>