<template>
  <div class="background">
    <h1 class="product-market">Choose a product you want to experience!</h1>
    <div class="container">
      <div class="row">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="col-md-2"
          style="flex: 1 1 18%; max-width: 18%; margin: 1%;"
        >
          <div
            class="card"
            @click="selectWeightFile(category)"
            :style="{ height: '220px', width: '120%' }"
          >
            <div class="card-body">
              <!-- 显示卡片图片 -->
              <img :src="category.image" alt="Category Image" style="width: 100%; height: 140px; object-fit: cover; margin-bottom: 10px;">
              <!-- 显示卡片标题 -->
              <p>{{ category.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductMarket",
  data() {
    return {
      categories: [
        { name: "烟雾识别", weight: "烟雾.pt", image: require('@/assets/figure/烟雾识别.jpg') },
        { name: "火焰识别", weight: "火焰.pt", image: require('@/assets/figure/火焰识别.jpeg') },
        { name: "人员落水识别", weight: "人员落水.pt", image: require('@/assets/figure/人员落水识别.jpeg') },
        { name: "光伏巡检识别", weight: "光伏板.pt", image: require('@/assets/figure/无人机光伏巡检识别.jpeg') },
        { name: "河道漂浮物识别", weight: "河道漂浮物.pt", image: require('@/assets/figure/河道漂浮物.jpg') },
        { name: "农田作物生长情况识别", weight: "植物生长.pt", image: require('@/assets/figure/农田作物生长情况识别.jpg') },
        { name: "行人闯红灯识别", weight: "人闯红灯.pt", image: require('@/assets/figure/行人闯红灯.jpg') },
        { name: "车辆闯红灯识别", weight: "车闯红灯.pt", image: require('@/assets/figure/车辆闯红灯.jpg') },
        { name: "人员摔倒识别", weight: "人员摔倒.pt", image: require('@/assets/figure/人员摔倒识别.jpeg') },
        { name: "景区客流量识别", weight: "景区人流量识别.pt", image: require('@/assets/figure/景区客流量识别.jpeg') }
      ]
    };
  },
  methods: {
    selectWeightFile(category) {
      // 将选中的权重文件传递给Test页面，并跳转到Test页面
      this.$router.push({
        path: "/Test",
        query: { weight_file: category.weight }
      });
    }
  }
};
</script>

<style scoped>
.background {
  background-color: #000; /* 整个背景变黑 */
  width: 100%;
  height: 1500px;
}

.product-market {
  color: transparent;
  background: linear-gradient(to right, #e66465, #9198e5);
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 3em; /* 增大字体大小 */
  font-weight: bold; /* 加粗字体 */
  text-align: center; /* 文字居中 */
  padding-top: 40px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;
  width: 100%;
  height: auto;
}

.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin: 5px;
  background: #000000;
  transition: transform 0.3s ease;
  cursor: pointer;
  height: 220px; /* 增加卡片高度 */
  border-radius: 0; /* 去掉圆角 */
  /* 使用渐变作为边框图像 */
  border: 2px solid transparent;
  border-image: linear-gradient(to right, #e66465, #9198e5) 1 / 3px 3px stretch;
  
}

.card:hover {
  transform: scale(1.1);
  z-index: 1;
}

.card-body {
  text-align: center;
  color: transparent; /* 使文字颜色透明，以便只显示背景 */
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  font-size: 1rem;
    font-weight: bold; /* 加粗字体 */
}


</style>