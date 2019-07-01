/* global Vue */
import Router from 'vue-router'
import BookStore from '@/assets/views/bookstore/index.vue'
import ClassRoom from '@/assets/views/classroom/index.vue'

Vue.use(Router)

export const router = new Router({
  routes: [
    {path: '/', redirect: 'bookstore'},
    {path: '/bookstore', component: BookStore},
    {path: '/classroom', component: ClassRoom}
  ]
})
