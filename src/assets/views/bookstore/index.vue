<template>
  <div  @click="clicked" class="wrapper">
    <scroller class="scroller" show-scrollbar="false">
      <slider class="slider" interval="3000" auto-play="true">
        <div class="frame" v-for="banner in bannerArray">
          <image class="image" resize="cover" :src="banner.bannerUrl"></image>
        </div>
      </slider>
      <div class="contentWrapper" v-for="floor in dataArray">
          <!--  -->
          <div class="floorView" v-if="floor.type === 1">
            <scroller class="bookListScroller" show-scrollbar="false" scroll-direction="horizontal">
              <div class="bookView" v-for="item in floor.items">
                <image class="bookImage" resize="cover" :src="item.itemIcon"></image>
                <text class="bookNameLabel">{{item.itemName}}</text>
              </div>
            </scroller>
          </div>
          <!--  -->
          <div class="floorView" v-if="floor.type === 3">
            <text class="floorTitleLabel">{{floor.moduleName}}</text>
            <image class="image" resize="cover" :src="floor.items[0].itemIcon"></image>
          </div>
      </div>
    </scroller>
    <router-view/> 
  </div>
</template>


<script>
// const superagent = require('superagent');
import Methods from '../../../mixins'
import MxrUtil from '../../mxrutil.js'
const myUtil = weex.requireModule('mxrutil')
const stream = weex.requireModule('stream')
 
export default {
  data () {
    return { 
      bannerArray: [],
      dataArray: [],
      test: 0,
    }
  },
  created: function() {
    // 获取首页banner数据
    MxrUtil.get('/core/banner/template/1', {}, ((res) => {
      // console.log('>>> respons : ', JSON.stringify(res));
      if (res.data.isSuccess) {
        this.bannerArray = res.data.Body
        console.log(JSON.stringify(res.data.Body))
      }
      if (MxrUtil.isWeb()) {
        console.log(JSON.parse(MxrUtil.mxrDecoder(res.data.Body)))
        this.bannerArray = JSON.parse(MxrUtil.mxrDecoder(res.data.Body))
        // console.log(MxrUtil.mxrDecoder(res.data.Body))
      }
    }).bind(this)) 

    // 获取首页数据
    MxrUtil.get('/core/home/0', 
    {
      page: '1',
      rows: '20',
      search: 'normal',
      topNums: '20',
      region: '0',
      uid: '0',
      deviceId: 'sdfavasdfsdfasd'
    }, ((res) => {
      if(res.data.isSuccess) {
        this.dataArray = res.data.Body.list
        // console.log('>>>>> page data', JSON.stringify(res.data.Body))
      }
      if (MxrUtil.isWeb()) {
        console.log(JSON.parse(MxrUtil.mxrDecoder(res.data.Body)))
        this.dataArray = JSON.parse(MxrUtil.mxrDecoder(res.data.Body)).list
        console.log(this.dataArray)
      }
    }).bind(this))
  },
  methods: {
    clicked: function () {
      this.myMessage = 'Click my button'
    }
  }

}
</script>


<style scoped>
  .wrapper {
    padding-left: 15px;
    padding-right: 15px;
    justify-content: center;
    /* align-items: center; */
    margin-bottom: 90px;
  }
  /* slider */
  .image {
    width: 720px;
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
    width: 720px;
    height: 300px;
    position: relative;
  }
  .floorView {
    margin-top: 40px;
  }
  .floorTitleLabel {
    margin-bottom: 10px;
    color: #333;
    font-size: 36px;
  }
   .bookListScroller {
    width: 720px;
    height: 320px;
    flex-direction: row;
  }
  .bookView {
    width: 190px;
    height: 320px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .bookImage {
    width: 190px;
    height: 250px;
    border-radius: 8px;
  }
  .bookNameLabel {
    font-size: 24px;
    color: #666;
    lines: 2;
  }
</style>