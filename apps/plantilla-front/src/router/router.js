import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '../view/layout/guest-layout.vue'
import AdminLayout from '../view/layout/admin-layout.vue'

import Home from '../view/Home.vue'
import Login from '../view/Login.vue'
import AdminDashboard from '../view/AdminDashboard.vue'

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
      {
        path: 'login',
        name: 'Login',
        component: Login
      }
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
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
