import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Main
  },
  {
    path: '/goodsList',
    name: 'GoodsList',
    component: () => import('../views/GoodsList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
