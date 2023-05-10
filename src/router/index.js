import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/home/Home.vue')
const Monitor= () => import('views/monitor/Monitor.vue')
const Analysis = () => import('views/analysis/Analysis.vue')


Vue.use(VueRouter)

const routes =  [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/monitor',
    component: Monitor
  },
  {
    path: '/analysis',
    component: Analysis
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
