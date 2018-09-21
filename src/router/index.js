import Vue from 'vue'
import Router from 'vue-router'
import Loading from '@/components/Loading/index.vue'
import Home from '@/components/Home/index.vue'
import DreamPre from '@/components/DreamPre/index.vue'
import DreamPreX from '@/components/DreamPreX/index.vue'
import HomePost from '@/components/HomePost/index.vue'
import Dream from '@/components/Dream/index.vue'
import DreamX from '@/components/DreamX/index.vue'
import Address from '@/components/Address/index.vue'
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
      path: '/dreamPre',
      name: 'DreamPre',
      component: DreamPre
    },
    {
      path: '/homePost',
      name: 'HomePost',
      component: HomePost
    },
    {
      path: '/dream',
      name: 'Dream',
      component: Dream
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
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
  ]
})
