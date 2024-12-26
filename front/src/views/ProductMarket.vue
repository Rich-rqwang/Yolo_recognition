<template>
  <div>
    <h1 style="margin-top: 80px;">Product Market</h1>
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
            :style="{ height: '200px', width: '100%' }"
          >
            <div class="card-body">
              <!-- 显示卡片图片 -->
              <img :src="category.image" alt="Category Image" style="width: 100%; height: 120px; object-fit: cover; margin-bottom: 10px;">
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
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
}
.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin: 10px;
  transition: transform 0.3s ease;
  cursor: pointer;
}
.card:hover {
  transform: scale(1.1);
  z-index: 1;
}
.card-body {
  text-align: center;
}
</style>
