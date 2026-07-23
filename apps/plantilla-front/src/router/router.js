import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '../view/layout/guest-layout.vue'
import AdminLayout from '../view/layout/admin-layout.vue'

import Home from '../view/Home.vue'
import AdminDashboard from '../view/AdminDashboard.vue'
import { routerAuth } from '../view/auth/router.js'

const routes = [
  {
    path: '/',
    component: GuestLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      ...routerAuth,
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: {
          requiresAuth: true
        }
      }
    ],
    meta: {
      requiresAuth: true,
      
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
