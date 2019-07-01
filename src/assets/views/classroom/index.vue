<template>
  <div class="wrapper">
    <text class="greeting">Class room</text>
    <router-view/> 
  </div>
</template>



<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
  .message {
    margin: 30px;
    font-size: 32px;
    color: #727272;
  }
</style>