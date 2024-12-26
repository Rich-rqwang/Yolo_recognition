import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProjectIntro from '../views/ProjectIntro.vue';
import ProductMarket from '../views/ProductMarket.vue';
import About from '../views/About.vue';
import Test from '../views/Test.vue';
import DroneStream from '../views/DroneStream.vue'; // 新增的无人机实时识别组件
import AiAnalysis from '../views/AiAnalysis.vue'; // 新增的AI分析页面组件

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/project-intro',
    name: 'projectIntro',
    component: ProjectIntro
  },
  {
    path: '/product-market',
    name: 'productMarket',
    component: ProductMarket
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/drone-stream', // 新增的路由
    name: 'droneStream',
    component: DroneStream
  },
  {
    path: '/ai-analysis', // 新增的路由
    name: 'aiAnalysis',
    component: AiAnalysis
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
