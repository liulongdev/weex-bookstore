<template>
  <text class="message">Now,haha let's use Vue.js to build your Weex app.</text>
</template>

<script>
console.log('>>>> go hello js')
export default {
  created: function () {
    console.log('>>>>> url : ', weex.config.bundleUrl)
  }  
}
</script>
