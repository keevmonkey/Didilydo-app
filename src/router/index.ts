import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/views/layouts/AuthLayout.vue'
import HouseLayout from '@/views/layouts/HouseLayout.vue'
import AccountLayout from '@/views/layouts/AccountLayout.vue'

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
      path: '/house/:slug',
      component: HouseLayout,
      children: [
        {
          path: 'dashboard',
          name: 'house-dashboard',
          component: () => import('@/views/pages/house/dashboard/HouseDashboardIndex.vue')
        },
        {
          path: 'finances',
          name: 'house-finances',
          component: () => import('@/views/pages/house/finances/HouseFinancesIndex.vue')
        },
        {
          path: 'tasks',
          name: 'house-tasks',
          component: () => import('@/views/pages/house/tasks/HouseTasksIndex.vue')
        }
      ]
    },
    {
      path: '/account',
      component: AccountLayout,
      children: [
        {
          path: 'dashboard',
          name: 'account-dashboard',
          component: () => import('@/views/pages/account/dashboard/AccountDashboardIndex.vue')
        },
        {
          path: 'tasks',
          name: 'account-tasks',
          component: () => import('@/views/pages/account/tasks/AccountTasksIndex.vue')
        }
      ]
    },
    {
      path: '/',
      name: 'select-an-app',
      component: () => import('@/views/pages/main/SelectAnApp.vue')
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/pages/error/ErrorNotFound.vue')
    }
  ]
})

export default router
