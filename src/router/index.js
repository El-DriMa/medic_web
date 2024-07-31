import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import HandleLogin from '../components/HandleLogin.vue';

const routes = [
  {
    path: '/hello-world',
    name: 'HelloWorld',
    component: HelloWorld
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
