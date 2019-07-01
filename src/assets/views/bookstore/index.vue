<template>
  <div  @click="clicked" class="wrapper">
    <text class="greeting">Book store : {{ myMessage }}</text>
    <router-view/> 
  </div>
</template>


<script>
// const superagent = require('superagent');
import Methods from '../../../mixins'
import MxrUtil from '../../mxrutil.js'
const stream = weex.requireModule('stream')
 
export default {
  data () {
    return { 
      myMessage: 'hello, martin' 
    }
  },
  created: function() {
    console.log('hello >>>> create')
    this.myMessage = 'Martin, hi' + Methods;

    console.log(JSON.stringify(Methods))

   MxrUtil.get('/core/banner/template/1', {}, ((res) => {
      this.myMessage = 'res :' + res.status;
      /// need to do 手机端不支持buffer？
      console.log(' respons : ', MxrUtil.mxrDecoder(res.data.Body));
    }).bind(this)) 


    // let headers = 'aLIAAAAmTxwcEB94HU9XT1lPWX8gHjkAGRBvR19cb2VvLB0BK0hfXlZaW59nj5qbnJ2bYX+Rb63Sw9be2oSpb5dvb4V/n4qSlpqbX2dPXU9FT46hobSpb0dvXlFRXV1ZWV1dQUEdHRkZHR0RER0dGRkdHWFhHR0ZGRxvFR8pKtMmLiIswxQeHBJPZ19qa1hsU2BvbWJOTlleWEFPP11iT01SVERBaGSfbWxhkWabnpGPKA==';

    // stream.fetch({
    //   method: 'GET',
    //   type: 'json',
    //   headers: {'mxr-key': headers},
    //   url: 'https://bs-api.mxrcorp.cn' + '/core/banner/template/1'
    // }, ((res) => {
    //   console.log(JSON.stringify(res.data))
    // }).bind(this))


    // Methods.MXRGET('https://liulong.site', {}, ((res) => {
    //   this.myMessage = ' res status : ' + res.status
    // }).bind(this))

    // stream.fetch({
    //     method: 'GET',
    //     url: 'https://liulong.site',
    //     type:'json'
    //   }, function(ret) {
    //     this.myMessage = '>>>>' + ret.status;
    //     console.log('>>> res : ', ret);
    //   }.bind(this));

    // superagent
    //   .get('https://liulong.site')
    //   .end((err, res) => {
    //     this.myMessage = 'lsjkdflsjlfksdjlf';
    //     console.log('hello >>>> get back', err, 'res', res);
    //     // Calling the end function will send the request
    //   });
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