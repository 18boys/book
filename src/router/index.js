import Vue from 'vue'
import Router from 'vue-router'
import Loading from '@/components/Loading/index.vue'
import Home from '@/components/Home/index.vue'
import Result from '@/components/Result/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
  ]
})
