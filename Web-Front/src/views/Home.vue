<template>
  <div class="page-container">
    <!-- 顶部全屏背景区域 -->
    <div class="hero-section">
      <div class="hero-overlay"></div> <!-- 添加黑色纱布遮罩层 -->
      <div class="hero-content">
        <h1>慧眸科技</h1>
        <p>智慧视觉助力生活，连接技术与未来。</p>
        <div class="scroll-down" @click="scrollToCards">
          <span class="arrow">↓</span>
        </div>
      </div>
    </div>

     <!-- 第二屏：显示两张图片区域 -->
     <div class="image-section" ref="cards">
      <div class="image-container">
        <div class="image-card">
          <!-- 使用相对路径的图片 -->
          <img src="@/assets/01.jpg" alt="Image 1" />
          <p class="image-description">Unveiling the unseen with intelligent vision</p>
        </div>
        <div class="image-card">
          <img src="@/assets/02.jpg" alt="Image 2" />
          <p class="image-description">Sharpening the lens of AI to clarify the world</p>
        </div>
      </div>
    </div>

    <!-- 第三屏 -->
    <div class="next-section" ref="nextPage">
      <h1>Let's see what we can accomplish!</h1>
      <div class="dialog-box">
        <div class="dialog-header">
          <h2>"Currently in conversation with the system..."</h2>
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
      <button class="try-button" @click="onTryClick">点击试用</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      visibleMessages: [],
      currentMessageIndex: 0, // 当前显示的对话内容索引
      dialogMessages: [
        { sender: "AI", text: "欢迎使用慧眸科技！" },
        { sender: "用户", text: "这个系统可以做什么呢？" },
        { sender: "AI", text: "它可以识别烟雾、火焰、人员落水等场景，用处可大了！" },
        { sender: "用户", text: "听起来很棒，我可以试试吗？" },
        { sender: "AI", text: "当然可以，请点击开启试用吧！" },
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
  scroll-behavior: smooth;
  background-color: #000000;
}

/* 第一屏背景 */
.hero-section {
  height: 100vh;
  background: url('~@/assets/城市数据流背景.jpeg') no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* 黑色纱布遮罩层样式 */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 半透明黑色 */
  z-index: 1; /* 确保它在图片下方，文本上方 */
}

.hero-content {
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 40px 100px;
  z-index: 2; /* 确保内容在遮罩层上方 */
  color: transparent; /* 设置文本颜色为透明，以便只显示背景渐变 */
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
}

.hero-content h1 {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 5.5rem;
  font-weight: bold;
}


.hero-content p {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 2.5rem;
}

.scroll-down {
  margin-top: 20px;
  cursor: pointer;
  font-size: 2rem;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent;
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

/* 第二屏：图片区域 */
.image-section {
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 图片之间的间隔 */
}

.image-card {
  width: 500px; /* 固定宽度 */
  height: 300px; /* 固定高度 */
  position: relative;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片比例并裁切 */
}

.image-description {
  text-align: center;
  color: #fff;
  font-size: 14px;
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
  white-space: nowrap; /* 防止文字换行 */
  width: auto; /* 根据文字内容自动调整宽度 */
  max-width: 90%; /* 限制最大宽度为父容器的90% */
  overflow: hidden; /* 防止溢出 */
  text-overflow: ellipsis; /* 文字溢出时使用省略号 */
}

/* 第三屏 */
.next-section {
  height: 100vh;
  background: #000000;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 3rem;
}
.next-section h1 {
  font-size: 3rem;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent; /* 使文字颜色透明，以便只显示背景 */
  margin-bottom: 20px;
}

.next-section p {
  font-size: 1.2rem;
  color: #000000;
}


.dialog-box {
  width: 70%;
  max-width: 800px;
  background: linear-gradient(to right, #e66465, #9198e5);
  border: 3px solid #000000;

  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: fadeIn 1s ease-in-out;
}

.dialog-header {
  font-size: 2em; /* 设置字体大小 */
  background: #000000; /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent; /* 使文字颜色透明，以便只显示背景 */
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
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  color: #000000;
  text-align: left;
  align-self: flex-start;
}

.user-message {
  color: #000000;
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

.try-button {
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  color: #222f3e; /* 深色字体 */
  font-size: 1.5rem; /* 按钮字体大小 */
  font-weight: bold; /* 字体加粗 */
  padding: 12px 25px; /* 按钮内边距 */
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