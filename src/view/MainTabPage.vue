<template>
  <wxc-tab-bar :tab-titles="tabTitles"
               :tab-styles="tabStyles"
               title-type="icon"
               @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <div class="item-container" :style="contentStyle"><home-page></home-page></div>
    <div class="item-container" :style="contentStyle"><class-romm></class-romm></div>
    <div class="item-container" :style="contentStyle"><circle-page></circle-page></div>
  </wxc-tab-bar>
</template>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
  }
</style>

<script>
import { Utils, WxcTabBar } from 'weex-ui'
import TabBar from '../components/widget/TabBar.vue'
import NavigationBar from '../components/widget/NavigationBar.vue'
import HomePage from './BookstorePage.vue'
import CirclePage from './CirclePage.vue'
import ClassRomm from './ClassRoom.vue'
export default {
  components: { TabBar, WxcTabBar, NavigationBar, CirclePage, HomePage, ClassRomm },
  data: () => ({
    tabTitles: [{
      title: '书城'
      // icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
      // activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
    }, {
      title: 'AR课堂'
      // icon: 'https://gw.alicdn.com/tfs/TB1VKMISXXXXXbyaXXXXXXXXXXX-72-72.png',
      // activeIcon: 'https://gw.alicdn.com/tfs/TB1aTgZSXXXXXazXFXXXXXXXXXX-72-72.png',
      // badge: 5
    }, {
      title: '梦想圈'
      // icon: 'https://gw.alicdn.com/tfs/TB1ARoKSXXXXXc9XVXXXXXXXXXX-72-72.png',
      // activeIcon: 'https://gw.alicdn.com/tfs/TB19Z72SXXXXXamXFXXXXXXXXXX-72-72.png'
    }],
    tabStyles: {
      bgColor: '#FFFFFF',
      titleColor: '#666666',
      activeTitleColor: '#52ceff',
      activeBgColor: '#FFFFFF',
      isActiveTitleBold: true,
      iconWidth: 60,
      iconHeight: 60,
      width: 160,
      height: 100,
      fontSize: 24,
      textPaddingLeft: 10,
      textPaddingRight: 10
    },
    mainHeight: 0
  }),
  created () {
    const tabPageHeight = Utils.env.getPageHeight()
    this.contentStyle = {height: tabPageHeight}
    this.mainHeight = Utils.env.getScreenHeight()
  },
  methods: {
    wxcTabBarCurrentTabSelected (e) {
      const index = e.page
      console.log(index)
    },
    minibarRightButtonClick () {
    }
  }
}
</script>
