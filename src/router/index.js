import Vue from 'vue'
import Router from 'vue-router'
import Loading from '@/components/Loading/index.vue'
import Home from '@/components/Home/index.vue'
import DreamPreX from '@/components/DreamPreX/index.vue'
import HomePost from '@/components/HomePost/index.vue'
import DreamX from '@/components/DreamX/index.vue'
import Result from '@/components/Result/index.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/loading',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/homePost',
      name: 'HomePost',
      component: HomePost
    },
    {
      path: '/dreamX',
      name: 'DreamX',
      component: DreamX
    },
    {
      path: '/dreamPreX',
      name: 'DreamPreX',
      component: DreamPreX
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
  ]
})
