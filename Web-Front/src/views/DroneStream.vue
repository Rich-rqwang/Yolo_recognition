<template>
    <div class="container" style="background-color: white;">
      <h1 style="margin-top: 40px;">无人机实时识别</h1>
      <div class="button-group">
        <button @click="stopDroneStream">停止无人机实时识别</button>
      </div>
      <div style="margin-top: 20px;"></div>
      <div class="video-media-container">
        <div class="processed-video" :style="{ width: '80vw', height: '70vh', margin: '0 auto', backgroundColor: '#ddd', border: '5px solid black', borderRadius: '10px' }">
          <img v-if="processedImageUrl" :src="processedImageUrl" alt="Processed Image" :style="processedImageStyle">
          <div v-if="videoProcessing" class="loading-overlay">
            <p>视频处理中，请稍候...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    name: 'DroneStream',
    data() {
      return {
        processedImageUrl: null,
        videoProcessing: false,
        socket: null,
      };
    },
    computed: {
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
            scale = imgWidth / containerWidth > imgHeight / containerHeight ? containerWidth / imgWidth : containerHeight / imgHeight;
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
      this.startDroneStream();
    },
    methods: {
      startDroneStream() {
        if (this.socket) {
          this.socket.disconnect();
        }
        this.socket = io('http://localhost:5000');
        this.socket.on('connect', () => {
          console.log('Connected to server');
          this.startVideoStream();
        });
        this.socket.on('processed_frame', (data) => {
          this.processedImageUrl = `data:image/jpeg;base64,${data}`;
        });
      },
      startVideoStream() {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const sendFrame = () => {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const frame = canvas.toDataURL('image/jpeg').split(',')[1];
              this.socket.emit('video_frame', frame);
              requestAnimationFrame(sendFrame);
            };
            requestAnimationFrame(sendFrame);
          })
          .catch(error => {
            console.error('Error accessing media devices.', error);
          });
      },
      stopDroneStream() {
        if (this.socket) {
          this.socket.disconnect();
          this.socket = null;
        }
        this.$router.go(-1);  // 返回到之前的页面
      },
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
  .video-media-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .processed-video {
    position: relative;
  }
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
  }
  </style>
  