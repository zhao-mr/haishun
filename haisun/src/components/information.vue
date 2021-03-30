<template>
    <div>
      <div class="BosTable">
        <div id="BneiTab">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="id"
              width="240"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="sctitle"
              label="标题"
              :show-overflow-tooltip="true"
              width="240">
              <template slot-scope="scope">
                <span @click="DialogVisible(scope.row.id)" style="cursor:pointer;">{{scope.row.sctitle}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="sctype"
              label="分类"
              :show-overflow-tooltip="true"
              width="200">
            </el-table-column>
            <el-table-column
              prop="FBdate"
              label="发布日期"
              width="200">
            </el-table-column>
            <el-table-column
              prop=""
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="DialogFen(scope.row.id)">分享</el-button>
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

      <el-dialog
        title="宣传内容"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        <div v-html="sccont"></div>
        <span slot="footer" class="dialog-footer">
  </span>
      </el-dialog>

    </div>
</template>

<script>
import api from "@/api/api";
    export default {
        name: "",
      data(){
        return{
          tableData: [],
          PageIndex:"1",
          total: 0,
          centerDialogVisible: false,
          sccont:""//内容
        }
      },
      watch:{},
      methods:{
        propag(){
          this.$axios({
            url: api.GetSCQuery,
            method: "get",
            params: {sctype:"资讯",PageIndex:this.PageIndex,PageSize:"10"}
          }).then(res => {
            if(res.status == 200){
              this.tableData = res.data.NewsModels
              this.total = res.data.RowsCount
            }
          })
        },
        current_change:function (curr) {
          // console.log(curr)
          this.PageIndex = curr;
          this.propag()
        },
        DialogVisible(val){
          console.log(val);
          this.centerDialogVisible = true;
          // http://47.98.38.58:8030/GetSCQueryForId?id=1
          this.$axios({
            url: api.GetSCQueryForId,
            method: "get",
            params: {id:val}
          }).then(res => {
            if(res.status == 200){
                console.log(res)
              this.sccont =res.data.sccont
            }
          })
        },
        //分享
        DialogFen(val){
          // alert(val)
          // this.$router.push({ path: '/partake',query:{id:val}});
          var domUrl = document.createElement("input");
          domUrl.value = "http://www.haishun.com/Publish3/index.html#/partake?id="+val; //复制的地址
          // http://www.haishun.com/Publish3/index.html#/partake?id=10
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
        }

      },
      mounted(){
          this.propag()
      },
      created(){}
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
