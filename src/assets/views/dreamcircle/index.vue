<template>
  <div class="wrapper">
    <scroller class="scroller" show-scrollbar="false">
      <div v-for="model in dataArray" class="item">
        <div class="userInfo row">
          <image class="userImage" :src="model.userLogo"></image>
          <div class="simpleInfo">
            <div class="row">
              <text class="userName">{{model.userName}}</text>
            </div>
            <text class="publishTime">{{formatDate(model.createTime)}}</text>
          </div>
        </div>
        <div class="contentC">
          <text class="userContent">{{model.contentWord}}</text>
          <div class="conentImageC" v-if="model.contentPicArray && model.contentPicArray.length > 0">
            <scroller class="contentImageScroller" scroll-direction="horizontal" show-scrollbar="false">
              <div class="imgCell" v-for="contentImage in model.contentPicArray">
               <image class="contentImage" :src="contentImage" resize="cover"></image>
              </div>
            </scroller>
          <!-- <waterfall class="waterfall" column-count="3" column-width="200px" show-scrollbar="false" scroll-direction="horizontal">
            <cell class="cell" v-for="contentImage in model.contentPicArray">
              <image class="contentImage" :src="contentImage"></image>
            </cell>
          </waterfall> -->
         </div>
         <div class="bookConent" v-if="model.content">
           <image class="bookCover" :src="model.content.cover" resize="cover"></image>
           <text class="bookName">{{model.content.name}}</text>
         </div>
        </div>
        <div class="bottomLine"></div>
        <!-- <text>{{JSON.stringify(model)}}</text> -->
      </div>
    </scroller>
</div>
</template>

<script>
import MxrUtil from '../../mxrutil.js'
const navigator = weex.requireModule('navigator')
export default {
  data () {
    return {
      dataArray: []
    }
  },
  created: function () {
     let param = {uid: 'CgbNAwAx', page: '1', rows: 30}
    MxrUtil.get('/community/dynamics', param, (res) => {
      if(res.ok) {
        this.dataArray = res.data.Body.list;
        for (let model of this.dataArray) {
          if (model.contentPic && model.contentPic.length > 0) {
            model.contentPicArray = model.contentPic.split(",");
          } else {
            model.contentPicArray = [];
          }
        }
      }
    })
  },
  methods: {
    formatDate (timeinterval) {
      let date = new Date(timeinterval)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes()
    }
  }
}
</script>

<style scoped>
  .wrapper {
    width: 750px;
    justify-content: center;
    /* align-items: center; */
    margin-bottom: 90px;
  }
  .scroller {
    padding-left: 30px;
    padding-right: 30px;
  }
  .item {
    margin-top: 30px;
  }
  .row {
    flex-direction: row;
  }
  .userImage {
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }
  .simpleInfo {
    margin-left: 30px;
  }
  .publishTime {
    font-size: 20px;
    color: #999;
  }
  .contentC {
    margin-left: 110px;
    margin-right: 30px;
  }
  .userContent {
    font-size: 28px;
    color: #333;
  }
  .conentImageC {
    margin-top: 20px;
  }
  .contentImageScroller {
    height: 220px;
    flex-direction: row;
  }
  .contentImage {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin-right: 30px;
  }
  .bookConent {
    padding: 16px 16px 16px 16px;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    background-color: #eee;
  }
  .bookCover {
    width: 70px;
    height: 70px;
    border-radius: 8px;
  }
  .bookName {
    margin-left: 20px;
    font-size: 24px;
    color: #666;
  }
  .bottomLine {
    margin-top: 30px;
    /* margin-left: 20px; */
    /* margin-right: 20px; */
    height: 1px;
    background-color: #e0e0e0;
  }
</style>
