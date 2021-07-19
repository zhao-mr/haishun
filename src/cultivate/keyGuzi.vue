<template>
  <div>
    <div class="formatTop">
      <h3>{{WZtitle}}</h3>
    </div>
    <div class="fileNei">
      <div class="Bosneirong">
        <div class="irongLfte">
          <span>关键字 : </span>
        </div>
        <div class="irongRing">
          <span>{{WZgjc}}</span>
        </div>
      </div>
    </div>
    <div class="fileNei">
      <div class="Bosneirong">
        <div class="irongLfte">
          <span>分类 : </span>
        </div>
        <div class="irongRing">
          <span>{{WZtype}}</span>
        </div>
      </div>
    </div>
    <div class="BosBten">
      <div class="Annuie">点击搜藏</div>
      <div class="Annuie">完成学习</div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
  export default {
    name: "",
    data(){
      return{
        forId:"",//id
        WZtitle:"",//标题
        WZgjc:"",//关键字
        WZtype:"",//分类
      }
    },
    methods:{
      //  获取信息
      Bosconer(){
        this.$axios({
          // url: "http://47.98.38.58:8030/GetPXQueryForId",
          url:api.GetPXQueryForId,
          method: "get",
          params: {id:this.forId}
        }).then(res => {
          console.log(res)
          if(res.status == 200){
            this.WZtitle = res.data.WZtitle
            this.WZgjc = res.data.WZgjc
            this.WZtype = res.data.WZtype
          }
        })
      }

    },
    mounted(){
      this.forId = this.$route.query.id;
      this.Bosconer()
    }

  }
</script>

<style scoped>
  .formatTop{
    width: 100%;
    height: 44px;
    background-color: #00E4FF;
    text-align: center;
    color: black;
    line-height: 44px;
  }
  .formatTop h3{
    font-weight: 500;
  }
  .fileNei{
    padding: 20px 100px;
    border-bottom: 1px solid #1C4C7D;
  }
  .Bosneirong{
    width: 100%;
    overflow: hidden;
    margin-bottom: 30px;
  }

  .irongLfte,.irongRing{
    float: left;
  }
  .irongLfte{
    width: 5%;
  }
  .irongRing{
    width: 95%;
  }

  .BosBten{
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  .BosBten .Annuie{
    width: 95px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #01C1DE;
    font-size: 14px;
    cursor:pointer;
    background: url("../assets/train/dibatoe.png") no-repeat;
    background-size: 100% 100%;
    margin: 0px 35px;
  }
</style>
