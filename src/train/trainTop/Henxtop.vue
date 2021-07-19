<template>
  <div style="padding: 0 10px;padding-top: 10px">
    <!--<cultivateTop></cultivateTop>-->
    <div class="BosBacimg">
      <!--<div class="system">-->
        <!--<p class="Zhiti">OA管理系统</p>-->
        <!--<div style="margin-left: 20px;">-->
          <!--<span>您好, </span><span>徐雷</span><span> ,欢迎使用OA系统软件</span>-->
        <!--</div>-->

      <!--</div>-->
      <div class="TobAuot">
        <!--<div class="RetTob" @click="homepage">首页</div>-->
        <!--<div class="RetTob" @click="Fnahui('待培训')">待培训</div>-->
        <!--<div class="RetTob" @click="Fnahui('学习中')">学习中</div>-->
        <!--<div class="RetTob" @click="Fnahui('已完成')">已完成</div>-->
        <!--<div class="RetTob">收藏记录</div>-->
        <el-button type="primary" size="small" @click="Fnahui('待培训')">待培训</el-button>
        <el-button type="primary" size="small" @click="Fnahui('学习中')">学习中</el-button>
        <el-button type="primary" size="small" @click="Fnahui('已完成')">已完成</el-button>
        <el-button type="primary" size="small">收藏记录</el-button>
      </div>
      <!--<div class="function">-->
        <!--<div style="text-align: center;margin-right: 30px;cursor:pointer;font-size: 13px;">-->
          <!--&lt;!&ndash; <img src="../../assets/imgindex/tuiX.png" alt=""> &ndash;&gt;-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <div class="CultVAteBootm">
      <div class="Culconceal"></div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  // import cultivateTop from './cultivateTop';//主要上部分

  export default {
    name: "",
    components:{
    },
    data(){
      return{
        boszw:"",//信息
        bossfz:"",//号码
        bosgs:"",//公司
      }
    },
    methods:{
      Fnahui(val){
        console.log(val)
        this.$router.push({ path: '/train',query:{zw:this.boszw,sfz:this.bossfz,gs:this.bosgs,pxzt:val}});
      }
    },
    mounted(){
      this.boszw = this.$route.query.zw; //信息
      this.bossfz = this.$route.query.sfz; //身份证号码
      this.bosgs = this.$route.query.gs;//公司
    }
  }
</script>

<style scoped>

  .BosBacimg{
    width: 100%;
    height: 65px;
    /*background: url("../../assets/imgindex/index1_03.png")no-repeat;*/
    /*background-size: 100% 100%;*/
    /*margin-top: 10px;*/
  }
  .system{
    width: 29%;
    line-height: 55px;
    float: left;
    color: #01C1DE;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
    .system .Zhiti{
    font-size: 22px;
    font-weight: 600;
    letter-spacing:2px
  }
  .TobAuot{
    width: 100%;
    height: 60px;
    float: left;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .TobAuot .RetTob{
    width: 13%;
    height: 35px;
    /*background: url("../../assets/imgindex/Tobimg.png")no-repeat;*/
    /*background-size: 100% 100%;*/
    text-align: center;
    line-height: 30px;
    position: relative;
    right: 50px;
    font-size: 14px;
  }
  .TobAuot .RetTob:hover{
    cursor:pointer;
    color: #01C1DE;
  }
  .function{
    width: 15%;
    /*line-height: 55px;*/
    height: 65px;
    float: right;
    color: #01C1DE;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
  }
  .function img {
    width: 20px;
  }
  .CultVAteBootm{
    width: 100%;
    height: 630px;
    margin-top: 20px;
    overflow: hidden;
    background: url("../../assets/train/diKuang_03.png")no-repeat;
    background-size: 100% 100%;
  }
  .Culconceal{
    height: 65px;
  }
</style>
