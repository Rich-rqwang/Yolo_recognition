<template>
  <div class="project-intro">
    <!-- 顶部介绍部分 -->
    <div class="intro-header">
      <h1>关于「慧眸科技」</h1>
      <p>
        慧眸科技采用最新的YOLOv11深度学习模型，结合无人机与物联网设备，
        实现了对多种场景的智能识别和实时监控。系统可高效、精准地完成复杂场景中的视觉任务，
        通过智能算法分析图像和视频数据，为用户提供全面的安全保障与便捷服务。
      </p>
      <div class="tech-advantages-container">
        <strong>Technological Superiority</strong>
        <ul>
          <p>超高的检测精度与识别效率，可在复杂环境下稳定运行</p>
          <p>实时处理能力强，适用于各种动态场景</p>
          <p>支持多平台部署，可结合无人机、监控设备等硬件扩展应用</p>
        </ul>
      </div>
      <p>
        无论是工业安全监控、防火防灾，还是智能交通管理、生态环境保护，我们的系统都能提供高效、智能的解决方案。
        致力于通过技术为生活赋能，守护每一个重要时刻。
      </p>
    </div>

    <!-- 模块展示部分 -->
    <div class="modules-section">
      <div class="module-card" v-for="(item, index) in modules" :key="index">
        <img :src="item.image" alt="模块图片" class="module-image" />
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <button @click="viewDetails(item)">查看详细</button>
      </div>
    </div>

    <!-- 模态框：显示详细信息 -->
    <div v-if="selectedModule" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">×</button>
        <h2>{{ selectedModule.title }}</h2>
        <img :src="selectedModule.detailImage" alt="详细图片" class="modal-image" />
        <p>{{ selectedModule.details }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectIntro",
  data() {
    return {
      modules: [
        {
          title: "烟雾识别",
          description: "快速定位火灾源头，保护生命财产安全。",
          image: require("@/assets/figure/烟雾识别.jpg"),
          detailImage: require("@/assets/figure/烟雾识别.jpg"),
          details: "利用先进的YOLOv11模型，可以实时识别烟雾的来源，适用于工业场景、森林防火等多个应用场景。",
        },
        {
          title: "火焰识别",
          description: "精准识别火焰形态，用于早期火灾报警。",
          image: require("@/assets/figure/火焰识别.jpeg"),
          detailImage: require("@/assets/figure/火焰识别.jpeg"),
          details: "火焰识别系统通过捕捉火焰的动态形态，可在火灾发生的早期发出警报，避免更大损失。",
        },
        {
          title: "人员落水识别",
          description: "保障水域安全，第一时间监测异常。",
          image: require("@/assets/figure/人员落水识别.jpeg"),
          detailImage: require("@/assets/figure/人员落水识别.jpeg"),
          details: "该模块用于监测人员在水域活动中的安全，第一时间检测落水情况并发出警报。",
        },
        {
          title: "河道漂浮物识别",
          description: "识别垃圾，精准清理，保护生态环境。",
          image: require("@/assets/figure/河道漂浮物.jpg"),
          detailImage: require("@/assets/figure/河道漂浮物.jpg"),
          details: "通过智能识别河道中的漂浮物，协助清理垃圾，保护水域生态平衡。",
        },
        {
          title: "农田作物生长状况识别",
          description: "实时监测农作物生长情况，帮助农民优化种植和收成。",
          image: require("@/assets/figure/农田作物生长情况识别.jpg"),
          detailImage: require("@/assets/figure/农作物.png"),
          details: "监测作物生长状态，助力现代农业生产。",
        },
        {
          title: "车辆闯红灯识别",
          description: "识别车辆闯红灯，提高交通管理效率。",
          image: require("@/assets/figure/车辆闯红灯.jpg"),
          detailImage: require("@/assets/figure/车辆闯红灯.jpg"),
          details: "精准识别车辆闯红灯行为，有效提升交通秩序。",
        },
        {
          title: "行人闯红灯识别",
          description: "识别行人闯红灯，提高交通管理效率。",
          image: require("@/assets/figure/行人闯红灯.jpg"),
          detailImage: require("@/assets/figure/行人闯红灯.jpg"),
          details: "精准识别行人闯红灯行为，有效提升交通秩序。",
        },
        {
          title: "无人机光伏巡检识别",
          description: "通过无人机识别光伏板上的问题，提高维护效率。",
          image: require("@/assets/figure/无人机光伏巡检识别.jpeg"),
          detailImage: require("@/assets/figure/无人机光伏巡检识别.jpeg"),
          details: "通过无人机精准识别光伏板上的问题，提高使用者维护效率。",
        },
        {
          title: "人员摔倒识别",
          description: "实时监测，帮助及时处理摔倒情况。",
          image: require("@/assets/figure/人员摔倒识别.jpeg"),
          detailImage: require("@/assets/figure/人员摔倒识别.jpeg"),
          details: "特别适用于养老院、医院等场景，为安全管理提供保障。",
        },
        {
          title: "景区客流量识别",
          description: "实时统计客流量，优化景区管理。",
          image: require("@/assets/figure/景区客流量识别.jpeg"),
          detailImage: require("@/assets/figure/景区客流量识别.jpeg"),
          details: "通过实时客流量统计，帮助景区更高效地管理开放时间，让出行不再拥堵。",
        },
      ],
      selectedModule: null, // 当前选中的模块
    };
  },
  methods: {
    viewDetails(module) {
      this.selectedModule = module;
    },
    closeModal() {
      this.selectedModule = null;
    },
  },
};
</script>

<style scoped>
.project-intro {
  padding: 40px 20px;
  background: #000000;
  color: #c18484;
  font-family: "Open Sans", sans-serif;
}

/* 顶部标题部分 */
.intro-header {
  text-align: center;
  margin-bottom: 40px;
}

.intro-header h1 {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent;
}

.intro-header p {
  font-size: 1.1rem;
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto 20px;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent;
}


.tech-advantages-container {
  background: linear-gradient(to right, #e66465, #9198e5);
  padding: 20px 10px; /* 内边距 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 轻微的阴影效果 */
  margin-top: 30px; /* 与上文的间距 */
  margin-bottom: 30px; /* 与上文的间距 */
}

.tech-advantages-container ul p {
  padding: 5px 0; /* 列表项的上下内边距 */
  margin-top: 10px; /* 与上文的间距 */
  margin-bottom: 5px; /* 与上文的间距 */
  color:#000000;
}


/* 标题样式 */
.tech-advantages-container strong {
  font-size: 1.6em; /* 字体大小 */
  color: #000000; /* 字体颜色 */
}


/* 模块展示部分 */
.modules-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* 模块卡片 */
.module-card {
  background: #000000;
  border: 2px solid transparent; /* 保持边框宽度 */
  border-image: linear-gradient(to right, #e66465, #9198e5) 1; /* 应用渐变到边框 */
  border-radius: 12px;
  width: 280px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative; /* 保持相对定位 */
}

.module-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.module-card .module-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
}

.module-card h2 {
  font-size: 1.5rem;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent; /* 使文字颜色透明，以便只显示背景 */
  margin: 10px 0;
}

.module-card p {
  font-size: 1rem;
  line-height: 1.6;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent; /* 使文字颜色透明，以便只显示背景 */
}

.module-card button {
  display: inline-block; /* 使按钮内联显示 */
  padding: 6px 16px; /* 按钮内边距 */
  font-size: 1rem; /* 按钮字体大小 */
  color: #000000; /* 按钮文字颜色 */
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  border: none; /* 无边框 */
  border-radius: 8px; /* 圆角边框 */
  cursor: pointer; /* 鼠标手形 */
  text-transform: uppercase; /* 文字大写 */
  letter-spacing: 0.5px; /* 字间距 */
  transition: background 0.3s ease, transform 0.3s ease; /* 渐变背景和悬浮效果过渡 */
}

.module-card button:hover {
  background: linear-gradient(to right, #9198e5, #e66465); /* 鼠标悬浮时渐变方向改变 */
  transform: translateY(-2px); /* 轻微上移，制造悬浮感 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
}


/* 模态框 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #000000;
  /* 使用渐变作为边框图像 */
  border: 2px solid transparent;
  border-image: linear-gradient(to right, #e66465, #9198e5) 1 / 1px 1px stretch;
  border-radius: 12px;
  padding: 20px;
  width: 600px;
  text-align: center;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent; /* 使文字颜色透明，以便只显示背景 */
}

.modal-content h2 {
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent; /* 使文字颜色透明，以便只显示背景 */
  margin-bottom: 15px;
}

.modal-content img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
}

.modal-content .close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #000000;
}

.modal-content button {
  padding: 5px 12px; /* 按钮内边距 */
  font-size: 1rem; /* 按钮字体大小 */
  color: #000000; /* 按钮文字颜色 */
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  border: none; /* 无边框 */
  border-radius: 8px; /* 圆角边框 */
  cursor: pointer; /* 鼠标手形 */
  transition: background 0.3s ease; /* 渐变背景过渡效果 */
}

.modal-content button:hover {
  background: linear-gradient(to right, #9198e5, #e66465); /* 鼠标悬浮时渐变方向改变 */
}
</style>
