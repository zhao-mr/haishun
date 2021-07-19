<template>
  <div style="padding: 10px 15px 0px;">
    <div class="BosKe">
      <div class="KecusLfet">
        <div class="news">
          <div class="NameTop">
            <h3>个人信息</h3>
            <span>更多</span>
          </div>
          <div class="NeRong">
            <p>
              <span>姓名: </span><span>{{ Name }}</span>
            </p>
            <p>
              <span>所属机构: </span><span>{{ CompanyName }}</span>
            </p>
            <p>
              <span>本次登录时间: </span><span>{{ LoginDateTime }}</span>
            </p>
            <p><span>最近登录时间: </span><span>{{LastDateTime}}</span></p>
          </div>
        </div>
        <div class="newsbo2">
          <div class="NameTop">
            <h3>工作安排</h3>
            <span></span>
          </div>
          <div class="NeRong" style="height: 300px;">
            <el-calendar v-model="value"> </el-calendar>
          </div>
        </div>
        <div class="newsbo2">
          <div class="NameTop">
            <h3>通知公告</h3>
            <span>更多</span>
          </div>
          <div class="NeRong" style="height: 300px;">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="发布日期" :show-overflow-tooltip="true" width="">
              </el-table-column>
              <el-table-column prop="name" label="发信人" :show-overflow-tooltip="true" width="">
              </el-table-column>
              <el-table-column prop="address" label="标题" :show-overflow-tooltip="true"> </el-table-column>
              <el-table-column prop="date" label="更新时间" :show-overflow-tooltip="true"> </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="KecusRing">
        <div class="RingTop">
          <div class="DivLfte">
            <div class="NameTop">
              <h3>待办事项</h3>
              <span></span>
            </div>
            <div class="NeRong">
              <p>20210301 部门会议事件</p>
              <p>20210302 确定活动场地事件</p>
              <p>20210303 发布会活动方案事件</p>
              <p>20210304 演讲嘉宾确认事件</p>
              <p>20210305 品牌产品介绍PPT事件</p>
              <p>20210306 活动预算事件</p>
            </div>
          </div>
          <div class="contract">
            <div class="NameTop">
              <h3>本月工作总结</h3>
              <el-button type="primary" size="small">本月</el-button>
            </div>
            <div class="BoxGonzuo">
              <div id="bingtu" style="width: 100%;height: 100%;"></div>
              <div class="Biefu1"><h3>15(个)</h3></div>
              <div class="Biefu2">
                <p>本月已完成</p>
                <p style="color: #fff;">10(个)</p>
              </div>
              <div class="Biefu3">
                <p>本月未完成</p>
                <p style="color: #fff;">5(个)</p>
              </div>
            </div>
          </div>
        </div>
        <div class="RingBootm">
          <div class="NameTop" style="margin-bottom: 20px">
            <h3>
              工作统计（全部）<span id="wenzi"
                >（浙江分公司、上海分公司、湖南分公司）</span
              >
            </h3>
          </div>
          <div class="BootmShuju">
            <div class="BoxStatistics">
              <div class="census">
                <p>劳动合同填写中 (2)</p>
                <p>实习生填写中 (3)</p>
              </div>
              <div class="census">
                <p>劳动合同待审核 (5)</p>
                <p>实习生填写中 (4)</p>
              </div>
              <div class="census">
                <p>劳动合同审核失败 (1)</p>
                <p>实习生审核失败 (2)</p>
              </div>
              <div class="census">
                <div id="bingtu2" style="width: 100%;height: 280px;"></div>
              </div>
            </div>
            <div class="riqixuan">
                  <el-date-picker
      v-model="valueri"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
            </div>
            <div class="BoxStatistics">
              <div class="Boxshutu">
                <div id="chart1" style="width: 100%;height: 280px;"></div>
              </div>
              <div class="Boxshutu">
                <div id="chart2" style="width: 100%;height: 280px;"></div>
              </div>
              <div class="Boxshutu">
                <div id="chart3" style="width: 100%;height: 280px;"></div>
              </div>
              <div class="Boxshutu">
                <div id="chart4" style="width: 100%;height: 280px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import api from "@/api/apitou";
export default {
  name: "customer",
  data() {
    return {
      EmpId: "", //身份ID
      CompanyID: "", //当前登录的用户ID， 总公司分公司

      Name: "", //姓名
      CompanyName: "", //所属机构
      LoginDateTime: "", //本次登录时间
      LastDateTime: "", //最近登录时间

      value: new Date(),
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "春节放假通知"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "春节放假通知"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "春节放假通知"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "春节放假通知"
        }
      ],
      valueri:"",//日期时间
    };
  },
  methods: {
    //获取用户信息
    GetEmployee() {
            // var bosSecretKey = this.$md5('xigidsc@#74'+'778899'+'362324199210203028')//本地
      var bosSecretKey = this.$md5('xigidsc@#74'+'778899'+this.EmpId)//线上
      this.$axios({
        url: api.GetEmployeeInformationHomeDataAsync,
        method: "post",
        // data: { EmpId: "152629199807281511",License:"xigidsc@#74",OprId:"152629199807281511",SecretKey:bosSecretKey} //用户身份id分公司
        // data: { EmpId: "362324199210203028",License:"xigidsc@#74",OprId:"362324199210203028",SecretKey:bosSecretKey}, //用户身份id 本地总公司
        data: {EmpId:this.EmpId,License:"xigidsc@#74",OprId:this.EmpId,SecretKey:bosSecretKey}//用户身份id  线上
      }).then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.CompanyID = res.data.CompanyID;
          this.Name = res.data.Name;
          this.CompanyName = res.data.CompanyName;
          this.LoginDateTime = res.data.LoginDateTime;
          this.LastDateTime = res.data.LastDateTime;
          if (this.CompanyID == 1) {
            this.$nextTick(() => {});
          } else {
            this.$nextTick(() => {});
          }
        }
      }).catch((error)=>{
        console.error(error);
      });
    },
    //工作总结数据图
    summary() {
      const handred = 100;
      let point = 70;
      let myChart = this.$echarts.init(document.getElementById("bingtu"));
      let option = {
        title: {
          text: point + "%",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#29EEF3",
            fontSize: "30"
          }
        },
        // tooltip: {
        //     formatter: function(params) {
        //         return params.name + '：' + params.percent + ' %'
        //     }
        // },

        series: [
          {
            type: "pie",
            zlevel: 3,
            silent: true,
            radius: ["40%", "40.5%"],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: dotArr()
          },
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: point,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#01C1DD",
                    // color: { // 颜色渐变
                    //     colorStops: [{
                    //                 offset: 0,
                    //                 color: '#4FADFD' // 0% 处的颜色
                    //             }, {
                    //                 offset: 1,
                    //                 color: '#28E8FA' // 100% 处的颜色1
                    //             }]
                    // },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: "",
                value: handred - point,
                itemStyle: {
                  normal: {
                    color: "rgba(1,193,221,0.2)"
                  }
                }
              }
            ]
          }
        ]
      };
      function dotArr() {
        let dataArr = [];
        for (var i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: 1,
              itemStyle: {
                normal: {
                  color: "#28E8FA",
                  borderWidth: 1,
                  borderColor: "#28E8FA"
                }
              }
            });
          } else {
            // dataArr.push({
            //     name: (i + 1).toString(),
            //     value: 2,
            //     itemStyle: {
            //         normal: {
            //             color: "rgba(0,0,0,0)",
            //             borderWidth: 0,
            //             borderColor: "rgba(0,0,0,0)"
            //         }
            //     }
            // })
          }
        }
        return dataArr;
      }
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //统计图1
    statistics() {
      const handred = 100;
      let point = 66;
      let myChart = this.$echarts.init(document.getElementById("bingtu2"));
      let option = {
        title: {
          text: point + "%",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#29EEF3",
            fontSize: "30"
          }
        },
        // tooltip: {
        //     formatter: function(params) {
        //         return params.name + '：' + params.percent + ' %'
        //     }
        // },

        series: [
          {
            type: "pie",
            zlevel: 3,
            silent: true,
            radius: ["40%", "40.5%"],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: dotArr()
          },
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["50%", "55%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: point,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#01C1DD",
                    // color: { // 颜色渐变
                    //     colorStops: [{
                    //                 offset: 0,
                    //                 color: '#4FADFD' // 0% 处的颜色
                    //             }, {
                    //                 offset: 1,
                    //                 color: '#28E8FA' // 100% 处的颜色1
                    //             }]
                    // },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: "",
                value: handred - point,
                itemStyle: {
                  normal: {
                    color: "rgba(1,193,221,0.2)"
                  }
                }
              }
            ]
          }
        ]
      };
      function dotArr() {
        let dataArr = [];
        for (var i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: 1,
              itemStyle: {
                normal: {
                  color: "#28E8FA",
                  borderWidth: 1,
                  borderColor: "#28E8FA"
                }
              }
            });
          } else {
            dataArr.push({
              name: (i + 1).toString(),
              value: 2,
              itemStyle: {
                normal: {
                  color: "rgba(0,0,0,0)",
                  borderWidth: 0,
                  borderColor: "rgba(0,0,0,0)"
                }
              }
            });
          }
        }
        return dataArr;
      }
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //统计图2
    statistics2() {
      let myChart1 = this.$echarts.init(document.getElementById("chart1"));
      let option1 = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "60%"],
            color: ["#01C1DD", "#367bec"],

            label: {
              normal: {
                position: "inner",
                fontSize: 16,
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "实习生", selected: true },
              { value: 679, name: "劳动工" }
            ]
          }
        ]
      };
      myChart1.setOption(option1);
      window.addEventListener("resize", function() {
        myChart1.resize();
      });

      let myChart2 = this.$echarts.init(document.getElementById("chart2"));
      let option2 = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "60%"],
            color: ["#01C1DD", "#367bec"],

            label: {
              normal: {
                position: "inner",
                fontSize: 16,
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "实习生", selected: true },
              { value: 679, name: "劳动工" }
            ]
          }
        ]
      };
      myChart2.setOption(option2);
      window.addEventListener("resize", function() {
        myChart2.resize();
      });

            let myChart3 = this.$echarts.init(document.getElementById("chart3"));
      let option3 = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "60%"],
            color: ["#01C1DD", "#367bec"],

            label: {
              normal: {
                position: "inner",
                fontSize: 16,
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "实习生", selected: true },
              { value: 679, name: "劳动工" }
            ]
          }
        ]
      };
      myChart3.setOption(option3);
      window.addEventListener("resize", function() {
        myChart3.resize();
      });

            let myChart4 = this.$echarts.init(document.getElementById("chart4"));
      let option4 = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "60%"],
            color: ["#01C1DD", "#367bec"],

            label: {
              normal: {
                position: "inner",
                fontSize: 16,
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "实习生", selected: true },
              { value: 679, name: "劳动工" }
            ]
          }
        ]
      };
      myChart4.setOption(option4);
      window.addEventListener("resize", function() {
        myChart4.resize();
      });

    }
  },
  mounted() {
    this.EmpId = this.$route.query.EmpId; //获取身份id
    this.GetEmployee();
    this.summary();
    this.statistics();
    this.statistics2();
  }
};
</script>

<style scoped>
.BosKe {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
  /* margin-bottom: 20px; */
  padding-bottom: 20px;
  color: #01c1de;
}
.KecusLfet {
  width: 30%;
  overflow: hidden;
  float: left;
}
.news {
  width: 95%;
  height: 260px;
  background: url("../assets/train/news.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

.newsbo2 {
  width: 95%;
  height: 430px;
  background: url("../assets/train/news2.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

.KecusRing {
  width: 70%;
  overflow: hidden;
  float: left;
}

.RingTop {
  width: 100%;
  overflow: hidden;
}

.RingTop .DivLfte {
  width: 49%;
  height: 430px;
  float: left;
  background: url("../assets/train/news2.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.RingTop .contract {
  width: 49%;
  height: 430px;
  float: left;
  margin-left: 2%;
  background: url("../assets/train/news2.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.RingBootm {
  width: 100%;
  height: 710px;
  overflow: hidden;
  margin-top: 20px;
  background: url("../assets/train/renbootm.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
}

#wenzi {
  color: #ccc;
  font-size: 16px;
  margin-left: 30px;
}

.BootmShuju {
  width: 100%;
  overflow: hidden;
  border-top: 1px solid #01c1de;
}

.NameTop {
  overflow: hidden;
  border-left: 3px solid #01c1de;
  /*text-indent: 30px;*/
  margin-top: 40px;
  margin-bottom: 30px;
  padding: 0 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.NeRong {
  padding: 0 30px;
  overflow: hidden;
  line-height: 30px;
}
.materbte {
  padding: 0 30px;
  overflow: hidden;
  margin-bottom: 25px;
}

.BosBten {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  /*margin-top: 50px;*/
}
.BosBten .Annuie {
  width: 95px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
  background: url("../assets/train/dibatoe.png") no-repeat;
  background-size: 100% 100%;
  margin: 0px 25px;
}
.BoxGonzuo {
  width: 100%;
  height: 300px;
  position: relative;
}
.BoxGonzuo .Biefu1 {
  position: absolute;
  top: 0;
  left: 30px;
  color: #fff;
}
.BoxGonzuo .Biefu2 {
  position: absolute;
  bottom: 50px;
  left: 30px;
  text-align: center;
}
.BoxGonzuo .Biefu3 {
  position: absolute;
  bottom: 50px;
  right: 30px;
  text-align: center;
}
.BoxStatistics {
  width: 100%;
  height: 280px;
  display: flex;
  align-items: center;
}
.BoxStatistics .census {
  width: 25%;
  text-align: center;
}
.BoxStatistics .census p {
  margin: 5px 0;
}
.BoxStatistics .Boxshutu {
  width: 25%;
}

.riqixuan{
  padding: 0 90px;
}
</style>
<style>
.BosKe .el-calendar {
  /*background-color: initial;*/
  background-color: transparent;
}
.BosKe .el-calendar-table .el-calendar-day {
  padding: 5px;
  height: auto;
  text-align: center;
  font-size: 14px;
}
.BosKe .el-calendar-table td {
  border-bottom: none;
  border-right: none;
}
.BosKe .el-calendar-table tr:first-child td {
  border-top: none;
}
.BosKe .el-calendar-table tr td:first-child {
  border-left: none;
}
.BosKe .el-calendar-table thead th {
  padding: inherit;
  color: #01c1de;
}
.BosKe .el-calendar__header {
  border-bottom: 1px solid #01c1de;
  padding: 0px 20px 12px;
}
.BosKe .el-calendar__title {
  color: #01c1de;
}
.BosKe .el-calendar-table td.is-selected {
  background-color: #01c1de;
  color: #000;
}
.BosKe .el-calendar-table .el-calendar-day:hover {
  background-color: #01c1de;
  color: #000;
}
.BosKe .el-button--primary {
  background-color: #01c1dd;
  border-color: #01c1dd;
}
</style>
<style>
.BosKe .el-table {
  color: #01c1de;
}
.BosKe .el-table thead {
  color: #01c1de;
}
.BosKe .el-table,
.el-table__expanded-cell {
  /*background-color: initial;*/
  background-color: transparent;
}
.BosKe .el-table th {
  /* background-color: initial; */
  /*background-color: #42bbce45;*/
  background-color: rgba(66, 187, 206, 0.3);
}
.BosKe .el-table, .el-table__expanded-cell{
  background-color: transparent;
}
.BosKe .el-table tr {
  /*background-color: initial;*/
  background-color: transparent;
}
.BosKe .el-ta
.BosKe .el-table--border::after,
.el-table--group::after,
.el-table::before {
  /*background-color: initial;*/
  background-color: transparent;
}
.BosKe .el-table--enable-row-hover .el-table__body tr:hover > td {
  /*background-color: #42bbce45;*/
  background-color: rgba(66, 187, 206, 0.3);
}

.BosKe .el-table--border:after,.BosKe .el-table--group:after, .el-table:before{
    /*background-color: initial;*/
  background-color: transparent;
}
.BosKe .el-table td,.BosKe .el-table th.is-leaf{
border-bottom: none;
}
.BosKe .el-button--mini,.BosKe .el-button--mini.is-round{
  padding: 7px 5px;
}
</style>
