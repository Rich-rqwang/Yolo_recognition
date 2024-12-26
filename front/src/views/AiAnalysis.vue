<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>AI大模型分析与帮助</h1>
      <div class="content-layout">
        <!-- Left Column - Media Display -->
        <div class="media-column">
          <div v-if="currentMode === 'image'" class="media-container">
            <img :src="processedImageUrl" alt="Processed Image" />
            <div class="confidence-tag" v-if="confidence">
              {{ confidence }}
            </div>
          </div>
          <div v-if="currentMode === 'video'" class="media-container">
            <video :src="processedVideoUrl" controls></video>
          </div>
        </div>

        <!-- Right Column - Controls -->
        <div class="controls-column">
          <div class="input-group">
            <textarea 
              v-model="userQuery" 
              placeholder="请输入您的问题"
              rows="4"
            ></textarea>
            <button 
              @click="sendQuery" 
              :disabled="isLoading"
              class="send-button"
            >
              {{ isLoading ? '分析中...' : '发送' }}
            </button>
          </div>
          <div class="result-container" v-if="analysisResult">
            <h3>分析结果：</h3>
            <p>{{ analysisResult }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentMode = ref('image')
const processedImageUrl = ref('')
const processedVideoUrl = ref('')
const userQuery = ref('')
const analysisResult = ref('')
const isLoading = ref(false)
const confidence = ref('Fire 0.98')

onMounted(() => {
  processedImageUrl.value = route.query.processedImageUrl
  processedVideoUrl.value = route.query.processedVideoUrl
  currentMode.value = route.query.currentMode || 'image'
})

async function sendQuery() {
  if (!userQuery.value) {
    alert('请输入您的问题')
    return
  }

  isLoading.value = true

  const imageUrl = currentMode.value === 'image' ? processedImageUrl.value : await getVideoFrameUrl()

  try {
    const response = await fetch('http://127.0.0.1:8080/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: imageUrl,
        userQuery: userQuery.value
      })
    })

    const data = await response.json()
    analysisResult.value = data.analysis_result
  } catch (error) {
    console.error('Error:', error)
    alert('分析请求失败，请稍后再试')
  } finally {
    isLoading.value = false
  }
}

async function getVideoFrameUrl() {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = processedVideoUrl.value
    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const frameUrl = canvas.toDataURL('image/jpeg')
      resolve(frameUrl)
    })
    video.addEventListener('error', (error) => {
      reject(error)
    })
  })
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom, #182935, #243447);
  padding: 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #00cec9;
  margin-bottom: 30px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 206, 201, 0.3);
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  min-height: 600px;
}

.media-column {
  position: relative;
}

.media-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #00cec9;
  background: rgba(0, 0, 0, 0.2);
}

.media-container img,
.media-container video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.confidence-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 206, 201, 0.9);
  color: #182935;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
}

.controls-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #00cec9;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 16px;
  resize: vertical;
  min-height: 120px;
}

textarea:focus {
  outline: none;
  border-color: #00fff5;
  box-shadow: 0 0 10px rgba(0, 206, 201, 0.3);
}

.send-button {
  align-self: flex-end;
  padding: 12px 30px;
  border-radius: 8px;
  background: #00cec9;
  color: #182935;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-button:hover {
  background: #00fff5;
  transform: translateY(-2px);
}

.send-button:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
}

.result-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  flex-grow: 1;
}

.result-container h3 {
  color: #00cec9;
  margin-bottom: 10px;
  font-size: 18px;
}

.result-container p {
  color: #fff;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
  
  .media-container {
    min-height: 300px;
  }
}
</style>