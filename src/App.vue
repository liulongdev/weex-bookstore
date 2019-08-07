<template>
  <div class="app-wrapper">
    <!--<router-view class="r-box"></router-view>-->
    <!--<tab-bar @tabTo="onTabTo"></tab-bar>-->
    <main-tab-page></main-tab-page>
<!--    <search-page></search-page>-->
  </div>
</template>

<style>
  body{
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color:#333;
  }
</style>

<style scoped>
  .app-wrapper{
    background-color: #f4f4f4;
  }
</style>

<script>
import util from './assets/util.js'
import MainTabPage from './view/MainTabPage.vue'
import SearchPage from './view/SearchPage.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    MainTabPage,
    SearchPage
  },
  created () {
    util.initIconFont()
  }
}
</script>
