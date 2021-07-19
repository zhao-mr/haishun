<template>
  <div style="padding: 0 10px;padding-top: 10px">
    <cultivateTop></cultivateTop>

    <div class="CultVAteBootm">
      <div class="Culconceal"></div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import cultivateTop from './cultivateTop';//主要上部分

  export default {
        name: "cultivate",
    components:{
      cultivateTop
    },
    }
</script>

<style scoped>
  .CultVAteBootm{
    width: 100%;
    height: 630px;
    margin-top: 20px;
    overflow: hidden;
    background: url("../assets/train/diKuang_03.png")no-repeat;
    background-size: 100% 100%;
  }
  .Culconceal{
    height: 65px;
  }
</style>

