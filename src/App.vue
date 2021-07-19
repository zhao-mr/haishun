<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html{
    height: 100%;
  }
 body{
   height: 100%;
   /*background: url("assets/imgindex/index.png");*/
   background: url("assets/imgindex/index.png");
   background-size: 100% 100%;
   margin: 0 0;
   color: #fff;
 }
 #app{
   height: 100%;
 }
  h1,h2,h3,h4,h5,h6,p{
    margin: 0 0 ;
    padding: 0 0 ;
  }
</style>
