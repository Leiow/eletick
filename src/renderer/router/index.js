import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mission',
      name: 'Mission',
      component: require('@/views/Mission').default,
    },
    {
      path: '/home',
      name: 'Home',
      component: require('@/views/Home').default,
    },
    {
      path: '*',
      redirect: '/home',
    }
  ]
})
