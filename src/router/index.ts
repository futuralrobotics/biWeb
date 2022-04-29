import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Overview from '../views/overview/index.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'EquipmentOverview' },
    component: Home,
    children: [{
      path: '/dataAnalysis/equipment',
      name: 'DataAnalysisEquipment',
      component: () => import('@/views/dataAnalysis/Equipment.vue')
    }, {
      path: '/dataAnalysis/task',
      name: 'DataAnalysisTask',
      component: () => import('@/views/dataAnalysis/Task.vue')
    }, {
      path: '/equipment/overview',
      name: 'EquipmentOverview',
      component: () => import('@/views/equipment/Overview.vue')
    }, {
      path: '/equipment/detail',
      name: 'EquipmentDetail',
      component: () => import('@/views/equipment/Detail.vue')
    }, {
      path: '/equipment/task',
      name: 'EquipmentTask',
      component: () => import('@/views/equipment/Task.vue')
    }, {
      path: '/account/member',
      name: 'AccountMember',
      component: () => import('@/views/account/member.vue')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
