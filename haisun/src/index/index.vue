<template>
<div style="padding: 0 10px;padding-top: 10px">
  <!--<Home></Home>-->
  <HomeBom></HomeBom>
</div>
</template>

<script>
  import Home from './bosTop';//主要上部分
  import HomeBom from './bosBoootm';
    export default {
        name: "index",
      components:{
        Home,HomeBom
      },
      data(){
          return{

          }
      }
    }
</script>

<style scoped>

</style>
