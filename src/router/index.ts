import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      redirect: '/todo',
    },
    {
      path: '/todo',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/done',
      name: 'done',
      component: () => import('../pages/DonePage.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

// Navigation guard to protect routes
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Initialize auth state if not already done
  if (!authStore.session) {
    await authStore.initializeAuth()
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (authStore.isAuthenticated) {
      next()
    } else {
      next('/login')
    }
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    // If already logged in and trying to access login page, redirect to home
    next('/todo')
  } else {
    next()
  }
})

export default router
