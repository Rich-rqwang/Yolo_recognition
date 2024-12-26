<template>
  <div class="page-container">
    <!-- 顶部全屏背景区域 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>「AI图像识别」</h1>
        <p>智慧视觉助力生活，连接技术与未来。</p>
        <div class="scroll-down" @click="scrollToCards">
          <span class="arrow">↓</span>
        </div>
      </div>
    </div>

    <!-- 第二屏：横向卡片区域 -->
    <div class="cards-section" ref="cards">
      <div class="cards-container">
        <div class="card" v-for="(item, index) in modules" :key="index">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </div>
      </div>
      <div class="scroll-next" @click="scrollToNextPage">
        <span class="arrow">↓</span>
      </div>
    </div>

    <!-- 第三屏 -->
    <div class="next-section" ref="nextPage">
      <h1>快来看看我们可以做些什么</h1>
      <div class="dialog-box">
        <div class="dialog-header">
          <h2>正在与系统对话中</h2>
        </div>
        <div class="dialog-content">
          <p
            v-for="(message, index) in visibleMessages"
            :key="index"
            :class="{'system-message': message.sender === '系统', 'user-message': message.sender === '用户'}"
          >
            <strong>{{ message.sender }}:</strong> {{ message.text }}
          </p>
        </div>
      </div>
      <!-- 添加金色按钮 -->
      <button class="try-button" @click="onTryClick">点击试用</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      modules: [
        { title: "烟雾识别", description: "快速定位火灾源头，保护生命财产安全。" },
        { title: "火焰识别", description: "精准识别火焰形态，用于早期火灾报警。" },
        { title: "人员落水识别", description: "保障水域安全，第一时间监测异常。" },
        { title: "河道漂浮物识别", description: "清理垃圾，保护生态环境。" },
        { title: "闯红灯识别", description: "提高交通秩序，构建安全城市。" },
        { title: "无人机连接", description: "协助灾害监测与应急响应，覆盖全局场景。" },
      ],
      visibleMessages: [],
      currentMessageIndex: 0, // 当前显示的对话内容索引
      dialogMessages: [
        { sender: "系统", text: "欢迎使用AI图像识别系统！" },
        { sender: "用户", text: "这个系统可以做什么？" },
        { sender: "系统", text: "它可以识别烟雾、火焰、人员落水等场景。" },
        { sender: "用户", text: "听起来很棒，我可以试试吗？" },
        { sender: "系统", text: "当然可以，请上传相关图片或视频进行分析！" },
      ],
    };
  },
  mounted() {
    this.startConversation();
  },
  methods: {
    onTryClick() {
    this.$router.push({ name: 'productMarket' }); 
  },
    navigateToTest() {
    this.$router.push({ name: "ProductMarket" }); // 使用路由跳转到 Test.vue 页面
    },
    scrollToCards() {
      this.$refs.cards.scrollIntoView({ behavior: "smooth" });
    },
    scrollToNextPage() {
      this.$refs.nextPage.scrollIntoView({ behavior: "smooth" });
    },
    startConversation() {
      if (this.currentMessageIndex < this.dialogMessages.length) {
        setTimeout(() => {
          this.visibleMessages.push(this.dialogMessages[this.currentMessageIndex]);
          this.currentMessageIndex++;
          this.startConversation();
        }, 1500); // 每条消息延迟1.5秒
      }
    },
  },
  watch: {
    showDialog(newValue) {
      if (newValue) {
        this.currentMessageIndex = 0; // 打开对话框时重置索引
      }
    },
  },
};
</script>

<style scoped>
/* 页面容器样式 */
.page-container {
  font-family: 'Open Sans', sans-serif;
  color: #fff; /* 全局字体颜色为偏白 */
  scroll-behavior: smooth;
}

/* 第一屏背景 */
.hero-section {
  height: 100vh;
  background: url('~@/assets/城市数据流背景.jpeg') no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  z-index: 1;
}

.hero-content {
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 25px;
}

.scroll-down {
  margin-top: 20px;
  cursor: pointer;
  font-size: 2rem;
  color: #FFD700;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

/* 第二屏 */
.cards-section {
  background-color: #182935;
  padding: 50px 20px;
  text-align: center;
  clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 90%);
  z-index: 0;
  position: relative;
}

.cards-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: #14202b;
  clip-path: ellipse(150% 90% at 50% 100%);
  z-index: 2;
}

/* 卡片容器 */
.cards-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 30px;
  padding: 20px;
}

/* 卡片样式 */
.card {
  background: linear-gradient(145deg, #284056, #182935);
  border: 2px solid #FFD700;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.card h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFD700;
  margin-bottom: 10px;
}

.card p {
  font-size: 1rem;
  color: #E0E0E0;
  line-height: 1.5;
}

.scroll-next {
  margin-top: 30px;
  cursor: pointer;
  font-size: 2rem;
  color: #FFD700;
  animation: bounce 2s infinite;
}

/* 第三屏 */
.next-section {
  height: 100vh;
  background: linear-gradient(145deg, #1e2a38, #14202b);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.next-section h1 {
  font-size: 2.5rem;
  color: #FFD700;
  margin-bottom: 20px;
}

.next-section p {
  font-size: 1.2rem;
  color: #E0E0E0;
}


.dialog-box {
  width: 60%;
  max-width: 800px;
  background-color: #222f3e;
  border: 3px solid #00cec9;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: fadeIn 1s ease-in-out;
}

.dialog-header {
  background-color: #00cec9;
  color: #222f3e;
  padding: 10px 15px;
  border-radius: 10px 10px 0 0;
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
}

.dialog-content {
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
  text-align: left;
}
.dialog-content p {
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 1.2rem;
  animation: slideIn 0.5s ease;
  max-width: 100%; /* 限制消息的宽度 */
}

.system-message {
  background-color:rgb(70, 138, 190);
  color: #fff;
  text-align: left;
  align-self: flex-start;
}

.user-message {
  background-color:rgb(180, 73, 73);
  color: #fff;
  text-align: right;
  align-self: flex-end;
  margin-left: auto; /* 使对话框靠右 */
}


/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
/* 金色按钮样式 */
.try-button {
  background-color: #00cec9; /* 浅色背景 */
  color: #222f3e; /* 深色字体 */
  font-size: 1.5rem; /* 按钮字体大小 */
  font-weight: bold; /* 字体加粗 */
  padding: 15px 30px; /* 按钮内边距 */
  border: none; /* 无边框 */
  border-radius: 10px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停效果 */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* 添加动画效果 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* 添加阴影 */
  margin-top: 30px; /* 调整按钮与上方内容的距离 */
}

.try-button:hover {
  transform: scale(1.1); /* 悬停时放大 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4); /* 增强阴影 */
}

.try-button:active {
  transform: scale(0.95); /* 点击时缩小 */
}

</style>