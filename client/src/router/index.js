import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import VotePage from '../views/VotePage.vue';
import VoteResult from '../views/VoteResult.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/vote',
    name: 'Vote',
    component: VotePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/voteResult',
    name: 'VoteResult',
    component: VoteResult,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/draw',
    name: "DrawList",
    component: () => import('../views/DrawList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/draw/:id',
    name: "DrawPage",
    component: () => import('../views/DrawPage.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem('userToken');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userToken) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;