import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HistoryView from '../views/HistoryView.vue'
import SinglePredictionView from "../views/SinglePredictionView.vue"

import store from '../store/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresUnauthorized: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requiresUnauthorized: true
      }
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
      meta: {
        requiresAuthorized: true
      }
    },
    {
      path: '/history/:predictionId',
      name: 'singleHistory',
      component: SinglePredictionView,
      meta: {
        requiresAuthorized: true
      }
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuthorized && !store.getters.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresUnauthorized && store.getters.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
