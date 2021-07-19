<template>
    <div id="boxyidon">
       <div class="boxConei">
         <div class="ConfeiTop"></div>
         <div class="ConfeiAout">
           <div class="GongNemo">
             <img src="../assets/imgindex/soulog.png" alt="log">
             <h5>海顺投资咨询有限公司</h5>
           </div>
         </div>

         <div class="ConfeiBootm">
           <div class="BootmTop">
             <h4>{{sctitle}}</h4>
             <p style="font-size: 0.12rem;color: #666;">{{FBdate}}</p>
           </div>
           <div class="BootmXia">
              <div v-html="sccont"></div>
           </div>
         </div>

       </div>
    </div>
</template>

<script>
import api from "@/api/api";
    export default {
        name: "partake",
      data(){
          return{
            url:"", //地址参数
            sctitle:"",//标题
            FBdate:"",//时间
            sccont:"",//内容
          }
      },
      methods:{
        DialogVisible(){
          this.$axios({
            // url: "http://47.98.38.58:8030/GetSCQueryForId",
            url:api.GetSCQueryForId,
            method: "get",
            params: {id:this.url}
          }).then(res => {
            if(res.status == 200){
              console.log(res)
              this.sctitle = res.data.sctitle;
              this.FBdate = res.data.FBdate;
              this.sccont = res.data.sccont;
            }
          })
        },
      },
      mounted(){
          this.DialogVisible()
      },
      created(){
        var baseFontSize = 100;
        var baseWidth = 375;

        var set = function () {
          var clientWidth = document.documentElement.clientWidth || window.innerWidth;

          var rem = 100;
          if (clientWidth != baseWidth) {
            rem = Math.floor(clientWidth / baseWidth * baseFontSize);
          }

          document.querySelector('html').style.fontSize = rem + 'px';
        }
        set();

        window.addEventListener('resize', set);

        this.url = this.$route.query.id
      }
    }
</script>
<style scoped>
#boxyidon{
  width: 100%;
  height: 100%;
  background: #eee;
  color: black;
  font-size: 0.2em;
}
  .boxConei{
    width: 100%;
    background: #eee;
    overflow: hidden;
  }
  .ConfeiTop{
    width: 100%;
    height: 1.7rem;
    background: url("../assets/imgindex/yidongbei.jpg")no-repeat;
    background-size: 100% 100%;
  }
  .ConfeiAout{
    width: 95%;
    /*height: 0.8rem;*/
    background-color: #fff;
    position: relative;
    top: -15px;
    margin: 0 auto;
    border-radius: 0.05rem;
  }
  .ConfeiAout .GongNemo{
    overflow: hidden;
    padding: 0.2rem 0.3rem;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
   .GongNemo img{
     width: 1rem;
     margin-right: 0.2rem;
   }

  .ConfeiBootm{
    width: 95%;
    /*height: 0.8rem;*/
    background-color: #fff;
    margin: 0 auto;
    border-radius: 0.05rem;
    font-size: 0.15rem;
    padding: 0.1rem 0rem;
  }

  .BootmTop{
    padding: 0rem 0.3rem;
    overflow: hidden;
  }
  .BootmTop p{
      padding: 0.1rem 0;
      border-bottom: 0.01rem solid #eee;
  }
  .BootmXia{
    padding: 0rem 0.3rem;
    margin-top: 0.15rem;
  }
</style>
