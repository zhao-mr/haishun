<template>
  <div  style="padding: 0 10px;padding-top: 10px">
    <div class="BosBacimg">
      <!--<div class="system">-->
         <!--<p class="Zhiti">OA管理系统</p>-->
        <!--<div style="margin-left: 20px;">-->
          <!--<span>您好, </span><span>徐雷</span><span> ,欢迎使用OA系统软件</span>-->
        <!--</div>-->

      <!--</div>-->
      <div class="TobAuot">
        <!--<div class="RetTob" @click="homepage">首页</div>-->
        <!--<div class="RetTob" @click="Bosctype('资讯')">宣传资讯</div>-->
        <!--<div class="RetTob" @click="Bosctype('图片')">宣传图片</div>-->
        <!--<div class="RetTob" @click="Bosctype('视频')">宣传视频</div>-->
        <el-button type="primary" size="small" @click="Bosctype('资讯')">宣传资讯</el-button>
        <el-button type="primary" size="small" @click="Bosctype('图片')">宣传图片</el-button>
        <el-button type="primary" size="small" @click="Bosctype('视频')">宣传视频</el-button>
      </div>
      <!--<div class="function">-->
        <!--<div style="text-align: center;margin-right: 30px;cursor:pointer;font-size: 13px;">-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <div class="CultVAteBootm">
      <div class="Culconceal"></div>
      <infor v-if="sctype==='资讯'"></infor>
      <formpict v-if="sctype==='图片'"></formpict>
      <formvid v-if="sctype==='视频'"></formvid>
    </div>
  </div>
</template>

<script>
  import infor from './information';//资讯
  import formpict from './picture';//图片
  import formvid from './video';//视频
export default {
  name: '',
  components:{
    infor,formpict,formvid
  },
  data () {
    return {
      sctype:"资讯",//切换值
    }
  },
  watch:{},
  methods:{
    //点击切换
    Bosctype(val){
      this.sctype = val
    }
  },
  mounted(){
  },
  created(){}
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
  .BosBacimg{
    width: 100%;
    height: 65px;
    /*background: url("../assets/imgindex/index1_03.png")no-repeat;*/
    /*background-size: 100% 100%;*/
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
    align-items: center;
  }
  .TobAuot .RetTob{
    width: 13%;
    height: 35px;
    /*background: url("../assets/imgindex/Tobimg.png")no-repeat;*/
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
</style>
