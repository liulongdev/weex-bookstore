/* global Vue */
import Router from 'vue-router'
import BookStore from '@/assets/views/bookstore/index.vue'
import ClassRoom from '@/assets/views/classroom/index.vue'
import BookDetail from '@/assets/views/bookstore/bookdetail.vue'
import DreamCircle from '@/assets/views/dreamcircle/index.vue'
import BookstorePage from '@/view/BookstorePage.vue'
import MainTabPage from '@/view/MainTabPage.vue'
import SearchPage from '@/view/SearchPage.vue'
import BookDetailPage from '@/view/BookDetailPage.vue'
Vue.use(Router)

export const router = new Router({
  routes: [
    {path: '/', redirect: 'MainTabPage'},
    {path: '/BookstorePage', component: BookstorePage},
    {path: '/MainTabPage', component: MainTabPage},
    {path: '/SearchPage', component: SearchPage},
    {path: '/BookDetailPage', component: BookDetailPage},
    {path: '/bookstore', component: BookStore},
    {path: '/classroom', component: ClassRoom},
    {path: '/bookdetail', component: BookDetail},
    {path: '/dreamcircle', component: DreamCircle}
  ]
})
