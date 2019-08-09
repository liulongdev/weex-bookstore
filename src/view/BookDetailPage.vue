<template>
  <scroller v-if="bookDetailM" class="scroller wrapper" show-scrollbar="false" :style="{height: scrollHeight}">
    <div class="bookInfoView">
      <div class="bookImageContainer">
        <image class="bookImage" :src="bookDetailM && bookDetailM.bookCoverURL"></image>
      </div>
      <text class="vipTag" v-if="bookDetailM && bookDetailM.vipFlag">vip</text>
      <text class="bookNameText">{{bookDetailM && bookDetailM.bookName}}</text>
      <text class="createTimeText" style="color: #999999; font-size: 20px;margin-top: 20px;">更新时间：{{bookDetailM.bookUpdateTime}}</text>
      <div class="simpleInfoView inline">
        <div class="oneInfoView">
          <text class="oneInfoText">{{bookDetailM.bookPublisherName}}</text>
          <text>发布人</text>
        </div>
        <div class="VLine"></div>
        <div class="oneInfoView">
          <text class="oneInfoText">{{numberToStr(bookDetailM.bookReadTimes)}}</text>
          <text>浏览数</text>
        </div>
        <div class="VLine"></div>
        <div class="oneInfoView">
          <text class="oneInfoText">{{numberToStr(bookDetailM.bookDownloadTimes)}}</text>
          <text>下载数</text>
        </div>
      </div>
      <text @click="toggleShowDescLines" class="bookDescText bookDescLabelShowSome" v-if="isbookDescLabelShowSome">{{bookDetailM && bookDetailM.bookDESC}}</text>
      <text @click="toggleShowDescLines" class="bookDescText" v-else>{{bookDetailM && bookDetailM.bookDESC}}</text>
    </div>
    <div class="HLine"></div>
    <div v-if="bookDetailM.supportModelList && bookDetailM.supportModelList.length > 0" class="supportTypeView inline">
      <text class="supportTypeTitle">本书支持:</text>
      <text class="supportTypeText" v-bind:key="sIdx" v-for="(supportModel, sIdx) in bookDetailM.supportModelList">{{supportModel}}</text>
    </div>
    <scroller class="bookTagsScroller inline" v-if="bookTags && bookTags.length > 0" scroll-direction="horizontal" show-scrollbar="false">
      <text class="bookTagText" v-bind:key="bIdx" v-for="(bookTag, bIdx) in bookTags">{{bookTag.name}}</text>
    </scroller>
    <scroller class="recommendBookScroller inline" v-if="recommendBooks && recommendBooks.length > 0" scroll-direction="horizontal" show-scrollbar="false">
      <div class="bookItemView" v-bind:key="bIdx" v-for="(book, bIdx) in recommendBooks" @click="goBookDetailPage(book.bookGUID)">
        <image class="bookItemImage" :src="book.bookCoverURL"></image>
        <text class="bookItemNameText">{{book.bookName}}</text>
      </div>
    </scroller>
  </scroller>
</template>

<script>
import MxrUtil from '../assets/mxrutil.js'
const navigator = weex.requireModule('navigator')
export default {
  name: 'BookDetailPage',
  data () {
    return {
      bookDetailM: undefined,
      bookGuid: '9AC6577B5A444E4A9810119C6A4DFBF7',
      bookIconPath: '',
      isbookDescLabelShowSome: false,
      recommendBooks: [],
      bookTags: [],
      scrollHeight: '1208px'
    }
  },
  created: function () {
    const url = weex.config.bundleUrl
    let queryJson = MxrUtil.parseUrlParam(url)

    this.bookGuid = queryJson['bookGuid']
    const getBookDetailApi = '/book/detail/' + this.bookGuid
    console.log('>>>> bookdetail page : ', getBookDetailApi)
    MxrUtil.get(getBookDetailApi, {}, (res) => {
      if (res.ok) {
        // let test = {}
        // Object.assign(test, res.data.Body)
        // console.log(test)
        this.bookDetailM = res.data.Body
        MxrUtil.getBookPath(this.bookGuid, (path) => {
          this.bookIconPath = path + '/bookIcon.png'
          console.log('>>>> bookicon path : ', this.bookIconPath)
        })
        console.log('>>>>> page data', JSON.stringify(res.data.Body))
      }
    })
    MxrUtil.get('/book/extension/' + this.bookGuid, {}, (res) => {
      if (res.ok) {
        console.log(res)
        this.recommendBooks = res.data.Body.recommendBooks
        this.bookTags = res.data.Body.bookTags
      }
    })
  },
  methods: {
    toggleShowDescLines: function (el) {
      this.isbookDescLabelShowSome = !this.isbookDescLabelShowSome
    },
    numberToStr: function (number) {
      if (typeof number === 'number') {
        if (number / 10000 > 0) {
          let str = number / 10000.0 + ''
          if (str.indexOf('.') > -1) {
            console.log(str.length)
            return str.substring(0, Math.min(str.indexOf('.') + 2, str.length)) + '万'
          }
        }
      }
      return number
    },
    goBookDetailPage (bookGUID) {
      navigator.push({
        url: `${MxrUtil.weexLocation}/views/BookDetailPage.js?bookGuid=${bookGUID}`,
        animated: 'true'
      }, event => {
        console.log('>>> push bookdetail callback ', event)
      })
    }
  }
}
</script>

<style scoped>
  .wrapper {
    background-color: #f4f4f4;
    padding-top: 40px;
    padding-left: 40px;
    padding-right: 40px;
    width: 750px;
    /*height: 1000px;*/
    /* justify-content: center; */
  }
  .inline {
    flex-direction: row;
  }
  .bookInfoView {
    align-items: center;
    /*background-color: #0088fb;*/
  }
  .bookImageContainer {
    width: 250px;
    height: 330px;
    border-radius: 10px;
    padding: 5px;
    background-color: #fff;
    /*align-items: center;*/
    /*justify-content: center;*/
  }
  .bookImage {
    width: 240px;
    height: 320px;
    border-radius: 10px;
  }
  .vipTag {
    margin-top: 20px;
    padding: 5px 20px 5px 20px;
    color: #fff;
    background-color: #ffd855;
    border-radius: 10px;
  }
  .bookNameText {
    font-size: 36px;
    color: #333;
    margin-top: 20px;
    lines: 1;
  }
  .simpleInfoView {
    justify-content: center;
    margin-top: 20px;
  }
  .oneInfoView {
    max-width: 210px;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
  }
  .VLine {
    background-color: #bbbbbb;
    width: 1px;
    /*height: 200px;*/
  }
  .HLine {
    background-color: #bbbbbb;
    height: 1px;
  }
  .oneInfoText {
    lines: 1;
    text-overflow: ellipsis;
  }
  .bookDescLabelShowSome {
    lines: 2;
    text-overflow: ellipsis;
  }
  .bookDescText {
    font-size: 30px;
    color: #666;
    margin-top: 50px;
    padding-bottom: 30px;
  }
  .supportTypeView {
    margin-top: 30px;
    align-items: center;
  }
  .supportTypeTitle {
    color: #666;
  }
  .supportTypeText {
    padding: 6px 20px 6px 20px;
    margin-left: 20px;
    background-color: #00B4FF;
    border-radius: 30px;
    font-size: 30px;
    color: #fff;
  }
  .bookTagsScroller {
    margin-top: 30px;
  }
  .bookTagText {
    padding: 6px 20px 6px 20px;
    border-color: #00B4FF;
    border-width: 1px;
    border-radius: 8px;
    color: #00B4FF;
    margin-right: 20px;
    font-size: 24px;
  }
  .bookTagsScroller {
    width: 670px;
    height: 50px;
  }
  .recommendBookScroller {
    margin-top: 30px;
    width: 670px;
    height: 320px;
  }
  .bookItemView {
    width: 190px;
    height: 320px;
    margin-right: 50px;
  }
  .bookItemImage {
    width: 190px;
    height: 250px;
    border-radius: 8px;
  }
  .bookItemNameText {
    margin-top: 6px;
    font-size: 24px;
    color: #666;
    lines: 2;
  }
</style>
