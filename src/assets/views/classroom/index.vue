<template>
  <div class="wrapper">
    <slider v-if="bannerArray.length > 0" class="slider" interval="3000" auto-play="true">
      <div class="frame" v-for="banner in bannerArray">
        <image class="bannerImg" resize="stretch" :src="banner.imageUrl"></image>
      </div>
    </slider>
    <waterfall class="waterfall" column-count="2" column-width="320px" show-scrollbar="false">
      <cell class="cell" v-for="video in videoArray" @click="goVideoCourseDetail(video.courseId)">
        <image class="image" :src="video.courseCoverUrl"></image>
        <text class="videoNameLable">{{video.courseName}}</text>
      </cell>
    </waterfall>
  </div>
</template>

<script>
import MxrUtil from '../../mxrutil.js'
const navigator = weex.requireModule('navigator')

export default {
  data () {
    return {
      bannerArray: [],
      videoArray: []
    }
  },
  created: function () {
    // 获取banner数据
    MxrUtil.get('/course/banners', {}, (res) => {
      if (res.data.isSuccess) {
        this.bannerArray = res.data.Body
      }
      if (MxrUtil.isWeb()) {
        // console.log(JSON.parse(MxrUtil.mxrDecoder(res.data.Body)))
        this.videoArray = JSON.parse(MxrUtil.mxrDecoder(res.data.Body))
      }
    })
    // 获取视频数据数据
    MxrUtil.get('/course/videoCourses', {courseType: 0, gradeType: 0, pageNo: 1, pageSize: 1000}, (res) => {
      // console.log('>>> respons : ', JSON.stringify(res));
      if (res.data.isSuccess) {
        this.videoArray = res.data.Body && res.data.Body.list
      }
      if (MxrUtil.isWeb()) {
        // console.log(JSON.parse(MxrUtil.mxrDecoder(res.data.Body)))
        this.videoArray = JSON.parse(MxrUtil.mxrDecoder(res.data.Body && res.data.Body.list))
      }
    })
  },
  methods: {
    goVideoCourseDetail: function (courseId) {
       navigator.push({
        url: `${MxrUtil.weexLocation}/views/classroom/videocoursedetail.js?courseId=${courseId}`,
        animated: 'true'
      }, event => {
        console.log('>>>>> push video course callback ', event)
      })
    }
  }
}
</script>

<style scoped>
  .wrapper {
    background-color: #f4f4f4;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
  }
   /* slider */
  .bannerImg {
    /* flex: 1; */
    width: 710px;
    height: 300px;
    border-radius: 10px;
  }
  .slider {
    /* margin-top: 25px;
    margin-left: 25px; */
    padding-top: 20px;
    width: 720px;
    height: 300px;
    /* border-radius: 10px; */
  }
  .frame {
    width: 710px;
    height: 300px;
    position: relative;
  }
  /* waterfall */
  .waterfall{
    padding-top: 40px;
    width: 690px;
  }
  .cell {
    padding-bottom: 20px;
  }
  .image {
   width: 320px;
   height: 250px;
    border-radius: 8px;
  }
  .videoNameLable {
    font-size: 30px;
    color: #666;
    lines: 1;
  } 
</style>
