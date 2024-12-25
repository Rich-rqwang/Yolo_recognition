import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProjectIntro from '../views/ProjectIntro.vue';
import ProductMarket from '../views/ProductMarket.vue';
import About from '../views/About.vue';
import Test from '../views/Test.vue';

const routes = [
  {
    path: '/Home',
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
    path: '/About',
    name: 'about',
    component: About
  },{
    path: '/test',
    name: 'test',
    component: Test
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;