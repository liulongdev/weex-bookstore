<template>
  <div :class="['wrapper']">
    <!--<div v-for="i in items">-->
      <!--<div class="bar-item" @click="tabTo(i.key)">-->
        <!--<text class="bar-ic iconfont">{{i.icon}}</text>-->
        <!--<text class="bar-txt">{{i.name}}</text>-->
      <!--</div>-->
    <!--</div>-->

    <div class="bar-item" @click="tabTo('bookstore')">
      <text class="bar-ic iconfont" :class="[this.isActive('bookstore')]">&#xe660;</text>
      <text class="bar-txt" :class="[this.isActive('bookstore')]">书城</text>
    </div>
    <!-- <div class="bar-item" @click="tabTo('bookdetail')">
      <text class="bar-ic iconfont" :class="[this.isActive('bookdetail')]">&#xe660;</text>
      <text class="bar-txt" :class="[this.isActive('bookdetail')]">图书</text>
    </div> -->
    <div class="bar-item" @click="tabTo('classroom')">
      <text class="bar-ic iconfont" :class="[this.pIndexKey == 'classroom'?'bar-active':'']">&#xe744;</text>
      <text class="bar-txt" :class="[this.isActive('classroom')]">课堂</text>
      <!-- test  -->
    <!-- <text class="notice-dot">2</text> -->
    </div>
    <div class="bar-item" @click="tabTo('dreamcircle')">
      <text class="bar-ic iconfont" :class="[this.isActive('dreamcircle')]">&#xe744;</text>
      <text class="bar-txt" :class="[this.isActive('dreamcircle')]">梦想圈</text>
    </div>
    <!-- <div class="bar-item" @click="tabTo('my')">
      <text class="bar-ic iconfont" :class="[this.isActive('my')]">&#xe639;</text>
      <text class="bar-txt" :class="[this.isActive('my')]">个人</text>
      <text class="i-notice">2</text>    
    </div> -->
    
  </div>
</template>

<style scoped>
.iconfont {
  font-family:iconfont;
}
.wrapper{
  position: fixed;
  bottom: 0;
  left: 0;right: 0;
  height: 90px;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  border-top-width: 1px;
  border-top-color: #d9d9d9;
  background-color: #fafafa;
}
.w-ipx{
  height: 140px;
}
.bar-item{
  flex: 1;
}
.bar-txt,.bar-ic{
  color:#666;
  text-align: center;
}
.bar-active{
  color:#b4282d;
}
.bar-ic{
  padding-top: 14px;
  font-size: 38px;
}
.bar-txt{
  font-size: 22px;
  padding-top: 2px;
}
.i-notice{
  position: absolute;
  top:10px;
  right: 30px;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  font-size: 26px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background-color: #f00;
}
.notice-dot{
  position: absolute;
  top:15px;
  right: 40px;
  height: 15px;
  width: 15px;
  border-radius: 100%;
  background-color: #f00;
  /* test */
  height: 30px;
  width: 30px;
  font-size: 22px;
  color: #fff;
  align-items: center;
}
</style>

<script>
// const modal = weex.requireModule('modal')
export default {
  computed: {
  },
  data () {
    return {
      pIndexKey: 'bookstore'
    }
  },
  mounted () {
  },
  methods: {
    isActive: function (_c) {
      return this.pIndexKey === _c ? 'bar-active' : ''
    },
    tabTo (_key) {
      if (this.pIndexKey === _key) return
      this.pIndexKey = _key
      this.$emit('tabTo', {
        status: 'tabTo',
        data: {
          key: _key
        }
      })
    }
  }
}
</script>
