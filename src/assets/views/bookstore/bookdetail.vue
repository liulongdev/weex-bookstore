<template>
  <scroller class="scroller wrapper" show-scrollbar="false">
    <div class="bookInfoView">
      <div class="bookImageContainer">
        <image class="bookImage" :src="bookDetailM && bookDetailM.bookCoverURL"></image>
      </div>
      <text class="bookNameLabel">{{bookDetailM && bookDetailM.bookName}}</text>
      <text @click="showlines" class="bookDescLabel bookDescLabelShowSome" v-if="isbookDescLabelShowSome">{{bookDetailM && bookDetailM.bookDESC}}</text>
      <text @click="showlines" class="bookDescLabel" v-else>{{bookDetailM && bookDetailM.bookDESC}}</text>
    </div>
    <text>图书详情</text>
    <text>{{bookGuid}}</text>
  </scroller>
</template>

<script>

import MxrUtil from '../../mxrutil.js'

export default {
  data () {
    return {
      bookDetailM: undefined,
      bookGuid: '9AC6577B5A444E4A9810119C6A4DFBF7',
      bookIconPath: '',
      isbookDescLabelShowSome: false
    }
  },
  created: function () {
    // const url = weex.config.bundleUrl;
    // let queryJson = {}
    // const index = url.indexOf("?");
    // if (index != -1) {
    //     const str = url.substr(index + 1);
    //     if (str.length > 0) {
    //       const strs = str.split("&");
    //       for(var i = 0; i < strs.length; i ++) {
    //         queryJson[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    //       }
    //     }
    // }
    // this.bookGuid = queryJson['bookGuid']
    const getBookDetailApi = '/book/detail/' + this.bookGuid
    console.log('>>>> bookdetail page : ', getBookDetailApi)
    MxrUtil.get(getBookDetailApi, {}, (res) => {
      if (res.data.isSuccess) {
        this.bookDetailM = res.data.Body
        MxrUtil.getBookPath(this.bookGuid, (path) => {
          this.bookIconPath = path + '/bookIcon.png'
          console.log('>>>> bookicon path : ', this.bookIconPath)
        })
        console.log('>>>>> page data', JSON.stringify(res.data.Body))
      }
      if (MxrUtil.isWeb()) {
        this.bookDetailM = JSON.parse(MxrUtil.mxrDecoder(res.data.Body))
      }
    })
  },
  methods: {
    showlines: function (el) {
      this.isbookDescLabelShowSome = !this.isbookDescLabelShowSome
    }
  }
}
</script>

<style scoped>
  .wrapper {
    background-color: bisque;
    padding-top: 40px;
    padding-left: 60px;
    padding-right: 60px;
    /* justify-content: center; */
    align-items: center;
  }
  .bookInfoView {
    align-items: center;
  }
  .bookImageContainer {
    width: 250px;
    height: 330px;
    border-radius: 10px;
    padding: 5px;
    background-color: #fff;
  }
  .bookImage {
    width: 240px;
    height: 320px;
    border-radius: 10px;
  }
  .bookNameLabel {
    font-size: 36px;
    color: #333;
    margin-top: 20px;
    lines: 1;
  }
  .bookDescLabelShowSome {
    lines: 2;
  }
  .bookDescLabel {
    font-size: 30px;
    color: #666;
    margin-top: 20px;
  }
</style>
