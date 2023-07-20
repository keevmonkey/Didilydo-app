import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/views/layouts/MainLayout.vue'
import AuthLayout from '@/views/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'signin',
          name: 'signin',
          component: () => import('@/views/pages/auth/SignIn.vue')
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/pages/auth/SignUp.vue')
        }
      ]
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/pages/main/dashboard/DashboardIndex.vue')
        },
      ]
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/pages/error/ErrorNotFound.vue')
    }
  ]
})

export default router
