import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import HandleLogin from '../components/HandleLogin.vue';

const routes = [
  {
    path: '/home-page',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/',
    name: 'Login',
    component: HandleLogin
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
