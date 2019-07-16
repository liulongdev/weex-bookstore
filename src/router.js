/* global Vue */
import Router from 'vue-router'
import BookStore from '@/assets/views/bookstore/index.vue'
import ClassRoom from '@/assets/views/classroom/index.vue'
import BookDetail from '@/assets/views/bookstore/bookdetail.vue'
import DreamCircle from '@/assets/views/dreamcircle/index.vue'
Vue.use(Router)

export const router = new Router({
  routes: [
    {path: '/', redirect: 'bookstore'},
    {path: '/bookstore', component: BookStore},
    {path: '/classroom', component: ClassRoom},
    {path: '/bookdetail', component: BookDetail},
    {path: '/dreamcircle', component: DreamCircle}
  ]
})
