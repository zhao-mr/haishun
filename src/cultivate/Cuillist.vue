  <template>
      <div>
        <div class="BosTable">
          <div id="BneiTab">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="Id"
                label="ID"
                width="240"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="WZtitle"
                label="标签"
                :show-overflow-tooltip="true"
                width="240">
              </el-table-column>
              <el-table-column
                prop="WZtype"
                label="分类"
                :show-overflow-tooltip="true"
                width="200">
                <template slot-scope="scope">
                  <span @click="keyword(scope.row.Id)" style="cursor:pointer;">{{scope.row.WZtype}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="WZgjc"
                label="资料关键字"
                :show-overflow-tooltip="true"
                width="260">
                <template slot-scope="scope">
                  <span @click="keyword(scope.row.Id)" style="cursor:pointer;">{{scope.row.WZgjc}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="FBlx"
                label="格式" width="150">
                <template slot-scope="scope">
                  <span @click="format(scope.row.Id,scope.row.FBlx)" style="cursor:pointer;">{{scope.row.FBlx}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="FBdate"
                label="日期">
              </el-table-column>
              <el-table-column
                prop=""
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.FBlx === '新闻'" @click="DialogFen(scope.row.Id)">分享</el-button>
                  <el-button type="text" v-if="scope.row.FBlx === '视频'" @click="download(scope.row.Id)">下载</el-button>
                  <el-button type="text" v-if="scope.row.FBlx === '文件'" @click="downloadwen(scope.row.Id)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="Fenye">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="current_change">
            </el-pagination>
          </div>

        </div>
      </div>
  </template>

  <script>
  import api from "@/api/api";
  import exportFile from '@/file/exportFile'
      export default {
          name: "Cuillist",
        data(){
          return{
            boszw:"",//信息
            bossfz:"",//身份证号码
            bosgs:"",//公司
            tableData: [],//获取数据
            PageIndex:"1",//页数
            total: 0,//总共s数
          }
        },
        components:{

        },
        watch:{

        },
        methods:{
          format(val,name){
            var topylei = "";
            if(name == "视频"){
              topylei = "video"
            }else if (name == "文件") {
              topylei = "files"
            }
            else if (name == "新闻") {
              topylei = "xinwen"
            }
            this.$router.push({ path: '/cultivate/forshipin',query:{id:val,form:topylei}});
          },

          keyword(val){
            this.$router.push({ path: '/cultivate/keyuizi',query:{id:val}});
          },

          //获取接口
          Cuiltlste(){
            this.$axios({
              // url: "http://47.98.38.58:8030/GetPXQuery",
              url:api.GetPXQuery,
              method: "get",
              // params: {zw:"销售管理",sfz:"310230198303041052",gs:"宁波总公司",PageIndex:this.PageIndex,PageSize:"10"}
              params: {zw:this.boszw,sfz:this.bossfz,gs:this.bosgs,PageIndex:this.PageIndex,PageSize:"10"}
            }).then(res => {
              // console.log(res)
              if(res.status == 200){
                this.tableData = res.data.NewsModels;
                this.total = res.data.RowsCount
              }
            })
          },
          current_change:function (curr) {
            // console.log(curr)
            this.PageIndex = curr;
            this.Cuiltlste()
          },
          //分享
          DialogFen(val){
            // this.$router.push({ path: '/partaketrain',query:{id:val}});
            var domUrl = document.createElement("input");
            domUrl.value = "http://www.haishun.com/Publish3/index.html#/partaketrain?id="+val; //复制的地址
            // http://www.haishun.com/Publish3/index.html#/partaketrain?id=10
            domUrl.id = "creatDom";
            document.body.appendChild(domUrl);
            domUrl.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            let creatDom = document.getElementById("creatDom");
            creatDom.parentNode.removeChild(creatDom);
            this.$message({
              message: '分享链接复制成功',
              type: 'success'
            });
          },
          //下载视频
          download(imgSrc){
            this.$axios({
              // url: "http://47.98.38.58:8030/GetPXQueryForId",
              url:api.GetPXQueryForId,
              method: "get",
              params: {id:imgSrc}
            }).then(res => {
              if(res.status == 200){
                console.log(res)
                var imgSrc = 'http://www.haishun.com'+res.data.FBdizhi
                var imgname = res.data.FBdizhi
                exportFile.getmp4(imgSrc, imgname)
                // window.open('http://www.haishun.com'+res.data.FBdizhi);
              }
            })
          },
          //下载文件
          downloadwen(imgSrc){
            this.$axios({
              // url: "http://47.98.38.58:8030/GetPXQueryForId",
              url:api.GetPXQueryForId,
              method: "get",
              params: {id:imgSrc}
            }).then(res => {
              if(res.status == 200){
                console.log(res)
                var imgSrc = 'http://www.haishun.com'+res.data.FBdizhi
                var imgname = res.data.FBdizhi
                exportFile.getdoc(imgSrc, imgname)
                // window.open('http://www.haishun.com'+res.data.FBdizhi);
              }
            })
          }

        },
        mounted(){
          this.boszw = this.$route.query.zw; //信息
          this.bossfz =  this.$route.query.sfz; //身份证号码
          this.bosgs = this.$route.query.gs ;//公司
          this.Cuiltlste()
        },
        created(){

        }
      }
  </script>

  <style scoped>
    .Fenye{
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
  </style>
  <style>
    #BneiTab .el-table{
      color: #fff;
    }
    #BneiTab .el-table, #BneiTab .el-table__expanded-cell{
      background-color: transparent;
    }
    #BneiTab .el-table th, #BneiTab .el-table tr{
      background-color: transparent;
    }
    #BneiTab .el-table tr{
      font-size: 13px;
    }
    #BneiTab .el-table thead{
      color: #000;
      background-color: #00E4FF;
    }
    #BneiTab .el-table--enable-row-hover .el-table__body tr:hover>td{
      background-color: #1C4C7D;
    }
    #BneiTab .el-table--border::after, #BneiTab .el-table--group::after, .el-table::before{
      background-color: transparent;
    }
    #BneiTab .el-table td, #BneiTab .el-table th.is-leaf{
      border-bottom: 1px solid #1C4C7D;
    }
    #BneiTab .el-table td, #BneiTab .el-table th{
      padding: 11px 0;
    }
    #BneiTab .el-button{
      padding: 0 0;
    }
    .Fenye .el-pagination.is-background .btn-next, .Fenye .el-pagination.is-background .btn-prev, .Fenye .el-pagination.is-background .el-pager li{
      background-color: transparent;
      border: 1px solid #01C1DE;
      color: #01C1DE;
    }
  </style>
