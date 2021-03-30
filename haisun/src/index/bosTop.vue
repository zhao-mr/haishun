<template>
    <div>
      <div class="BosBacimg">
        <div class="system">
          <p class="Zhiti">OA管理系统</p>
          <div style="margin-left: 20px;">
            <span>您好, </span><span>徐雷</span><span> ,欢迎使用OA系统软件</span>
          </div>
        </div>
        <div class="TobAuot">
          <div class="RetTob">人事管理</div>
          <div class="RetTob">销售管理</div>
          <div class="RetTob">财务管理</div>
          <div class="RetTob">老师服务</div>
          <div class="RetTob">客户中心</div>
          <div class="RetTob" @click="hreRouter">培训资料</div>
          <div class="RetTob">投诉管理</div>
        </div>
        <div class="function">
          <p style="cursor:pointer" @click="propag">宣传资料</p>
          <p style="margin: 0 20px;cursor:pointer">修改密码</p>
          <div style="text-align: center;margin-right: 10px;cursor:pointer;font-size: 13px">
            <img src="../assets/imgindex/kaiguan.png" alt="">
            <p>退出</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "bosTop",
      data(){
        return{

        }
      },
      components:{

      },
      watch:{

      },
      methods:{
        //跳转培训页面
        hreRouter(){
          this.$router.push({path:'/cultivate'})
        },
        //跳转宣传页面
        propag(){
          this.$router.push({path:'/propaganda'})
        }

      },
      mounted(){

      },
      created(){

      }
    }
</script>
<style scoped>
  .BosBacimg{
    width: 100%;
    height: 65px;
    background: url("../assets/imgindex/index1_03.png")no-repeat;
    background-size: 100% 100%;
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
    width: 56%;
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
    background: url("../assets/imgindex/Tobimg.png")no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 30px;
    position: relative;
    right: 10px;
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
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  .function img {
    width: 20px;
  }
</style>
