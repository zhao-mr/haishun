<template>
    <div>
      <div class="formatTop">
        <h3>{{WZtitle}}</h3>
      </div>
      <div class="Bosvideo" v-if="formatToye === 'video'">
        <div class="videoDi">
          <div style="width: 100%;height:380px;overflow:hidden;">
            <video id="video1" width="100%" height="100%" controls>
              <source v-bind:src="urldizhi" type="video/mp4">
              <source v-bind:src="urldizhi" type="video/mp4">
              您的浏览器不支持 video 标签。
            </video>
          </div>

          <div class="Bidwenzi">
            <div class="SoicanLfte"><span>{{WZms}}</span></div>
            <div class="Soican">
              <div><span>{{FBdate}}</span></div>
              <div style="margin-left: 20px;cursor:pointer;" @click="collections"><i :class="soucan"></i> <span>收藏</span></div>
            </div>
          </div>

          <div class="BosBten">
                <div class="Annuie">完成学习</div>
          </div>
        </div>
      </div>
      <div class="Bosfile" v-if="formatToye === 'files'">
        <div class="zhutou">
          <div class="fileNei">
            <div class="fileNeiTop">
              <div><span>{{FBdate}}</span></div>
              <div style="margin-left: 20px;cursor:pointer;" @click="collections"><i :class="soucan"></i> <span>收藏</span></div>
            </div>
          </div>
          <div class="fileNei">
            <div class="Bosneirong">
              <div class="irongLfte">
                <span>文件简介 : </span>
              </div>
              <div class="irongRing">
                <span>{{WZms}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="BosBten">
          <div class="Annuie" @click="downloadwen(urldiwen)">点击下载</div>
          <!-- <a :href="urldizhi" target="view_window"><div class="Annuie">点击下载</div></a> -->
          <div class="Annuie">完成学习</div>
        </div>
      </div>
      <div class="Bosfile" v-if="formatToye === 'xinwen'">
        <div style="padding: 10px 50px">
          <div v-html="WZcont"></div>
        </div>
      </div>
    </div>
</template>

<script>
 import api from "@/api/api";
  import exportFile from '@/file/exportFile'
    export default {
        name: "format",
      data(){
        var myPlyer
          return{
            forId:"",//id
            formatToye:"",//判断视频还是文件类型
            soucan:"el-icon-star-off",//收藏
            WZtitle:"",//标题
            FBdate:"",//时间
            urldizhi:"",//视频地址
            WZms:"",//文件或视频介绍
            WZcont:"",//新闻内容
            urldiwen:"",//文件下载地址
          }
      },
      methods:{
        collections(){
          this.soucan = "el-icon-star-on"
        },
        forVoe(){
          this.$axios({
            // url: "http://47.98.38.58:8030/GetPXQueryForId",
            url:api.GetPXQueryForId,
            method: "get",
            params: {id:this.forId}
          }).then(res => {
            console.log(res)
            if(res.status == 200){
              this.WZtitle = res.data.WZtitle;
              this.FBdate = res.data.FBdate;

              if(this.formatToye  == "video"){
            this.myPlyer = document.getElementById("video1");
            this.urldizhi = "http://www.haishun.com"+res.data.FBdizhi;
            this.myPlyer.load();
            }
          this.urldiwen = res.data.FBdizhi;
              this.WZms = res.data.WZms;
              this.WZcont = res.data.WZcont
            }
          })
        },
              //下载//
      downloadwen(val){
        var wenval = "http://www.haishun.com"+val
        exportFile.getdoc(wenval, val)
      }

      },
      mounted(){
          this.forId = this.$route.query.id;
          this.formatToye = this.$route.query.form
          // if(this.$route.query.form == "video"){
          //   this.formatToye = true
          // }else if(this.$route.query.form == "file"){
          //   this.formatToye = false
          // }
        this.forVoe()
      },

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
  .Bosvideo{
    width: 100%;
    overflow: hidden;
  }
  .videoDi{
    width: 700px;
    height: 480px;
    margin: 25px auto;
  }
  .videoDi .Bidwenzi{
    overflow: hidden;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #01294C;
    margin-bottom: 20px;
  }
  .Bidwenzi .SoicanLfte{
    width: 60%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .Bidwenzi .Soican{
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .BosBten{
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .BosBten .Annuie{
    width: 95px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #01C1DE;
    font-size: 14px;
    cursor:pointer;
    background: url("../../assets/train/dibatoe.png") no-repeat;
    background-size: 100% 100%;
    margin: 0px 35px;
  }


.fileNei{
  padding: 20px 100px;
  border-bottom: 1px solid #1C4C7D;
}
.fileNeiTop{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
  .Bosneirong{
    width: 100%;
    overflow: hidden;
    margin-bottom: 30px;
  }
  .zhutou{
    width: 100%;
    overflow: hidden;
    margin-bottom: 50px;
  }
  .irongLfte,.irongRing{
    float: left;
  }
  .irongLfte{
    width: 8%;
    margin-right: 2%;
    font-size: 18px;
  }
  .irongRing{
    width: 90%;
  }


/*包含以下四种的链接*/
a {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
a:active {
  text-decoration: none;
}
</style>
