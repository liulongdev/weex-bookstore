<template>
  <div class="wrapper">
    <scroller class="scroller" show-scrollbar="false">
      <slider class="slider" v-if="hasBanner" interval="3000" auto-play="true">
        <div class="frame" v-for="banner in bannerArray">
          <image class="image" resize="stretch" :src="banner.bannerUrl"></image>
        </div>
      </slider>
      <div class="mainMenu" v-if="hasMenu">
        <div v-for="menu in menuArray">
          <image class="menuImage" :src="menu.image"></image>
          <text class="menuTitle">{{menu.name}}</text>
        </div>
      </div>
      <div class="contentWrapper" v-for="floor in dataArray">
          <!-- 图书列表楼层 -->
          <div class="floorView" v-if="floor.type === 1">
            <scroller class="bookListScroller" show-scrollbar="false" scroll-direction="horizontal">
              <div class="bookView" v-for="item in floor.items" @click="goBookDetailPage(item.itemId)">
                <image class="bookImage" resize="stretch" :src="item.itemIcon"></image>
                <text class="bookNameLabel">{{item.itemName}}</text>
              </div>
            </scroller>
          </div>
          <!-- 专区楼层 -->
          <div @click="goSubjuectPage(floor.items[0].itemId)" class="floorView" v-if="floor.type === 3 && floor.items.length > 0">
            <text class="floorTitleLabel">{{floor.moduleName}}</text>
            <image class="image" resize="stretch" :src="floor.items[0].itemIcon"></image>
          </div>
          <!-- 两个专区楼层 -->
          <div class="floorView" v-if="floor.type === 4">
            <div v-if="floor.items.length >= 2">
              <div class="twoTopicView">
                <div class="oneTopicView"  @click="goSubjuectPage(floor.items[0].itemId)">
                  <image class="towTopicImage" resize="stretch" :src="floor.items[0].itemIcon"></image>
                  <text class="topicTitleLabel">{{floor.items[0].itemName}}</text>
                </div>
                <div class="oneTopicView secondTopicView" @click="goSubjuectPage(floor.items[1].itemId)">
                  <image class="towTopicImage" resize="stretch" :src="floor.items[1].itemIcon"></image>
                  <text class="topicTitleLabel">{{floor.items[1].itemName}}</text>
                </div>
              </div>
            </div>
          </div>
          <!-- 标签列表楼层 -->
          <div class="floorView" v-if="floor.type === 6">
            <scroller class="tagScrollView" show-scrollbar="false" scroll-direction="horizontal">
              <div v-for="item in floor.items">
                <text class="tagLabel">{{item.itemName}}</text>
              </div>
            </scroller>
          </div>
      </div>
    </scroller>
    <router-view/>
  </div>
</template>

<script>
import MxrUtil from '../../mxrutil.js'
const navigator = weex.requireModule('navigator')

export default {
  data () {
    return {
      hasBanner: false,
      bannerArray: [],
      dataArray: [],
      hasMenu: false,
      menuArray: [],
      test: 0
    }
  },
  created: function () {
    // 获取首页banner数据
    MxrUtil.get('/core/banner/template/1', {}, (res) => {
      if (res.ok) {
        this.bannerArray = res.data.Body
      }
      this.hasBanner = this.bannerArray.length > 0
    })

    // 获取首页主要菜单数据
    MxrUtil.get('/core/homepage/navigator/list', {}, (res) => {
      if (res.ok) {
        this.menuArray = res.data.Body;
      }
      this.hasMenu = this.menuArray.length > 0
    })

    // 获取首页数据
    MxrUtil.get('/core/home/0', {
      page: '1',
      rows: '20',
      search: 'normal',
      topNums: '20',
      region: '0',
      uid: '0',
      deviceId: '5F3E6EB4-CA01-42B0-BD77-0E72DA409618'
    }, (res) => {
      if (res.ok) {
        this.dataArray = res.data.Body.list
      }
    })
  },
  methods: {
    goBookDetailPage: function (bookGuid) {
      console.log('>>>>> click book bookGuid: ', bookGuid)
      navigator.push({
        url: `${MxrUtil.weexLocation}/views/bookstore/bookdetail.js?bookGuid=${bookGuid}`,
        animated: 'true'
      }, event => {
        console.log('>>> push bookdetail callback ', event)
      })
    },
    goSubjuectPage: function (recommendId) {
      console.log('>>>>> click subject id : ', recommendId)
      navigator.push({
        url: `${MxrUtil.weexLocation}/views/bookstore/subjectbooks.js?recommendId=${recommendId}`,
        animated: 'true'
      }, event => {
        console.log('>>>>> push subject callback ', event)
      })
    }
  }

}
</script>

<style scoped>
  .wrapper {
    padding-left: 20px;
    padding-right: 20px;
    justify-content: center;
    /* align-items: center; */
    margin-bottom: 90px;
  }
  /* slider */
  .image {
    /* flex: 1; */
    width: 710px;
    height: 300px;
    border-radius: 10px;
  }
  .slider {
    /* margin-top: 25px;
    margin-left: 25px; */
    width: 720px;
    height: 300px;
    /* border-radius: 10px; */
  }
  .frame {
    width: 710px;
    height: 300px;
    position: relative;
  }
  /* 主要菜单 */
  .mainMenu {
    margin-top: 20px;
    height: 150px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .menuImage {
    width: 100px;
    height: 100px;
  }
  .menuTitle {
    margin-top: 8px;
    width: 100px;
    text-align: center;
    font-size: 20px;
  }
  /* 楼层 */
  .floorView {
    margin-top: 20px;
  }
  .floorTitleLabel {
    margin-bottom: 10px;
    color: #333;
    font-size: 36px;
  }
  /* 图书列表楼层 */
   .bookListScroller {
    width: 720px;
    height: 320px;
    flex-direction: row;
  }
  .bookView {
    width: 190px;
    height: 320px;
    /* margin-left: 20px; */
    margin-right: 20px;
  }
  .bookImage {
    width: 190px;
    height: 250px;
    border-radius: 8px;
  }
  .bookNameLabel {
    margin-top: 6px;
    font-size: 24px;
    color: #666;
    lines: 2;
  }
  /* 两个专区楼层 */
  .twoTopicView {
    flex-direction: row;
    justify-content:space-between;
  }
  .oneTopicView {
    flex: 1;
  }
  .secondTopicView {
    direction: rtl;
  }
  .towTopicImage {
    width: 340px;
    height: 300px;
    border-radius: 8px;
  }
  .topicTitleLabel {
    margin-top: 10px;
    font-size: 30px;
    color: #666;
    lines: 1;
  }
  /* 标签列表楼层 */
  .tagScrollView {
    flex-direction: row;
  }
  .tagLabel {
    border-radius: 8px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 16px;
    padding-right: 16px;
    margin-right: 20px;
    color: #333;
    background-color:blueviolet;
  }
</style>
