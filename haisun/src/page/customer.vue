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
            <p><span>最近登录时间: </span><span>2021-02-01 10:00</span></p>
          </div>
        </div>

        <div class="material">
          <div class="NameTop">
            <h3>素材管理</h3>
          </div>
          <div class="materbte">
            <el-button type="primary">海报</el-button>
            <el-button type="primary">视频</el-button>
            <el-button type="primary">资讯</el-button>
            <!--<el-button type="primary">其他</el-button>-->
          </div>
          <div class="NeRong">
            <p>2021年(总数20，浙江5，湖南5，上海10)</p>
            <p>2020年(总数50，浙江11，湖南8，上海31)</p>
            <p>2019年(总数22，浙江7，湖南5，上海10)</p>
          </div>
          <div style="width: 100%;height: 60px"></div>
        </div>
      </div>
      <div class="KecusRing">
        <div class="RingTop">
          <div class="DivLfte">
            <div class="shutong" style="margin-bottom: 20px">
              <div class="NameTop" style="margin-bottom: 10px">
                <h3>合规流程单</h3>
              </div>
              <div
                id="shouruzong"
                style="width: 100%;height: 210px;"
                v-if="this.CompanyID == 1"
              ></div>
              <div
                id="shouruzong2"
                style="width: 100%;height: 210px;"
                v-if="this.CompanyID != 1"
              ></div>
            </div>
            <div class="shutong">
              <div class="NameTop">
                <h3>退款管理</h3>
              </div>
              <div class="NeRong">
                <p>2021年(总数5，浙江3，湖南1，上海1)</p>
                <p>2020年(总数8，浙江2，湖南4，上海2)</p>
                <p>2019年(总数10，浙江2，湖南3，上海5)</p>
              </div>
            </div>
          </div>
          <div class="contract">
            <div class="NameTop">
              <h3>合同管理</h3>
            </div>
            <div
              class="NeRong"
              v-if="this.CompanyID == 1"
              style="max-height: 500px;overflow-y: auto;"
            >
              <!--<div>{{ HeadOffices }}</div>-->
              <div v-for="sublist in HeadOffices" :key="sublist">
                {{ sublist }}
              </div>
              <!-- <p v-for="sublist in HeadOffices">{{sublist}}</p> -->
              <!--<p>本年新增(总数XX，浙江XX，湖南XX，上海XX)</p>-->
              <!--<p>本年新增(总数XX，浙江XX，湖南XX，上海XX)</p>-->
              <!--<p>本年新增(总数XX，浙江XX，湖南XX，上海XX)</p>-->
              <!--<p>本年新增(总数XX，浙江XX，湖南XX，上海XX)</p>-->
              <!--<p>本年新增(总数XX，浙江XX，湖南XX，上海XX)</p>-->
            </div>
            <div
              id="zhexiantu"
              style="width: 100%;height: 350px;"
              v-if="this.CompanyID != 1"
            ></div>
          </div>
        </div>
        <div class="RingBootm">
          <!-- <div class="NameTop" style="margin-bottom: 0">
            <h3>净收入</h3>
          </div> -->
          <div class="BosBten" style="margin-top: 40px;">
            <div class="Annuie" @click="caitong(0)">周统计</div>
            <div class="Annuie" @click="caitong(1)">月统计</div>
            <div class="Annuie" @click="caitong(2)">年统计</div>
          </div>

          <div class="Zongtu" v-show="this.CompanyID == 1">
            <div class="echtuo">
              <div id="toushu" style="width: 100%;height: 100%;"></div>
            </div>
            <div class="echtuo">
              <div id="qianyue" style="width: 100%;height: 100%;"></div>
            </div>
            <div class="echtuo">
              <div id="tuikuan" style="width: 100%;height: 100%;"></div>
            </div>
          </div>

          <div class="Zongtu" v-show="this.CompanyID != 1">
            <div class="echtuo">
              <div id="toushu2" style="width: 100%;height: 100%;"></div>
            </div>
            <div class="echtuo">
              <div id="qianyue2" style="width: 100%;height: 100%;"></div>
            </div>
            <div class="echtuo">
              <div id="tuikuan2" style="width: 100%;height: 100%;"></div>
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
      HeadOffices: "", //合同管理信息

      QueryType: 0, //选择0周1月2年
      shuzhufei: "周",
      bostuikuan: [
        { value: 2, name: "湖南分公司" },
        { value: 3, name: "上海分公司" },
        { value: 2, name: "浙江分公司" }
      ], //退款值

      boxftuik:[{value: 1,name: "上周退款量"},{value: 2,name: "本周退款量"}]//分公司退值

    };
  },
  methods: {
    //获取用户信息
    GetEmployee() {
      this.$axios({
        url: api.GetEmployeeInformationHomeDataAsync,
        method: "post",
        // data: { EmpId: "362324199210203028" } //用户身份id
        // data: { EmpId: "152629199807281511" } //用户身份id
        data: {EmpId:this.EmpId,}
      }).then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.CompanyID = res.data.CompanyID;
          this.Name = res.data.Name;
          this.CompanyName = res.data.CompanyName;
          this.LoginDateTime = res.data.LoginDateTime;
          this.LastDateTime = res.data.LastDateTime;
          if (this.CompanyID == 1) {
            this.$nextTick(() => {
              this.QueryComp();
              this.hetonggl();
              this.NetIncome1();
            });
          } else {
            this.$nextTick(() => {
              this.QueryComp2();
              this.zhexian();
              this.NetIncome2();
            });
          }
        }
      }).catch((error)=>{
        console.error(error);
      });
    },

    //获取合规流程单总公司
    QueryComp() {
      this.$axios({
        url: api.QueryComplianceForHomeDataAsync,
        method: "post",
        data: { QueryCompanyId: this.CompanyID } //1是宁波总公司，2是上海分部，5浙江，6湖南
      }).then(res => {
        // console.log(res);
        if (res.status == 200) {
          var shizhi = res.data.Datas;

          var shname = []; //上海数据
          var zjname = []; //浙江数据
          var hnname = []; //湖南数据

          var nianfei = [];
          for (let i = 0; i < shizhi.length; i++) {
            // console.log(shizhi[i].DIndex)
            nianfei.push(shizhi[i].DIndex);
            if (shizhi[i].CompanyName == "上海分公司") {
              shname.push(shizhi[i].DData);
            } else if (shizhi[i].CompanyName == "浙江分公司") {
              zjname.push(shizhi[i].DData);
            } else if (shizhi[i].CompanyName == "湖南分公司") {
              hnname.push(shizhi[i].DData);
            }
          }
          //去重
          var newshuzhi = [];
          for (let i = 0; i < nianfei.length; i++) {
            if (newshuzhi.indexOf(nianfei[i]) === -1) {
              newshuzhi.push(nianfei[i]);
            }
          }

          let myChart = this.$echarts.init(
            document.getElementById("shouruzong")
          );

          let option = {
            // backgroundColor: '#00265f',
            title: {},
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            legend: {
              // data: ['FT101', 'FT102', 'FT103', 'FT104'],
              // data:newshuzhi,
              left: "center",
              align: "left",
              // top: "2%",
              textStyle: {
                color: "#fff"
              },
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 35
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              top: "15%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                // data: ['2019 6-10',
                //   '2019 6-11',
                //   '2019 6-12',

                // ],
                data: newshuzhi,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#00c7ff",
                    width: 1,
                    type: "solid"
                  }
                },
                axisTick: {
                  show: true
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#00c7ff"
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                // name:'单',
                axisLabel: {
                  formatter: "{value} 单"
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#00c7ff",
                    width: 1,
                    type: "solid"
                  }
                },
                splitLine: {
                  show: false
                  // lineStyle: {
                  //     color: "#0F55B9",
                  // }
                }
              }
            ],
            series: [
              {
                name: "上海分公司",
                type: "bar",
                // data: [220, 120, 240, 220],
                data: shname,
                label: {
                  normal: {
                    show: true,
                    position: "top",
                    // "formatter": "{c}%"
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#00C7E1"
                  }
                },
                barWidth: 20, //柱子宽度
                // barGap: 1, //柱子之间间距
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00C7E1"
                      },
                      {
                        offset: 1,
                        color: "#005193"
                      }
                    ]),
                    opacity: 1,
                    barBorderRadius: 12
                  }
                }
              },
              {
                name: "浙江分公司",
                type: "bar",
                // data: [130, 150, 220, 220],
                data: zjname,
                label: {
                  normal: {
                    show: true,
                    position: "top",
                    // "formatter": "{c}%"
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#00da9c"
                  }
                },
                barWidth: 20,
                // barGap: 1,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00da9c"
                      },
                      {
                        offset: 1,
                        color: "#007a55"
                      }
                    ]),
                    opacity: 1,
                    barBorderRadius: 12
                  }
                }
              },
              {
                name: "湖南分公司",
                type: "bar",
                // data: [350, 270, 460, 220],
                data: hnname,
                label: {
                  normal: {
                    show: true,
                    position: "top",
                    // "formatter": "{c}%"
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7CB8F8"
                  }
                },
                barWidth: 20,
                // barGap: 1,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#7CB8F8"
                      },
                      {
                        offset: 1,
                        color: "#051B8F"
                      }
                    ]),
                    opacity: 1,
                    barBorderRadius: 12
                  }
                }
              }
            ]
          };

          myChart.setOption(option);
          window.addEventListener("resize", function() {
            myChart.resize();
          });
        }
      }).catch((error)=>{
        console.error(error);
      });
    },
    //获取合规流程单分公司公司
    QueryComp2() {
      this.$axios({
        url: api.QueryComplianceForHomeDataAsync,
        method: "post",
        data: { QueryCompanyId: this.CompanyID } //1是宁波总公司，2是上海分部，5浙江，6湖南
      }).then(res => {
        // console.log(res);
        if (res.status == 200) {
          var shizhi = res.data.Datas;

          var nianfei = [];
          var bosnemr;
          var boszhi = [];
          for (let i = 0; i < shizhi.length; i++) {
            bosnemr = shizhi[i].CompanyName;
            nianfei.push(shizhi[i].DIndex);
            boszhi.push(shizhi[i].DData);
          }
          let myChart = this.$echarts.init(
            document.getElementById("shouruzong2")
          );

          let option = {
            // backgroundColor: '#00265f',
            title: {},
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            legend: {
              // data: ['FT101', 'FT102', 'FT103', 'FT104'],
              // data:newshuzhi,
              left: "center",
              align: "left",
              // top: "0%",
              textStyle: {
                color: "#fff"
              },
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 35
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              top: "15%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                // data: ['2019 6-10',
                //   '2019 6-11',
                //   '2019 6-12',

                // ],
                data: nianfei,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#00c7ff",
                    width: 1,
                    type: "solid"
                  }
                },
                axisTick: {
                  show: true
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#00c7ff"
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                // name:'单',
                axisLabel: {
                  formatter: "{value} 单"
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#00c7ff",
                    width: 1,
                    type: "solid"
                  }
                },
                splitLine: {
                  show: false
                }
              }
            ],
            series: [
              {
                name: bosnemr,
                type: "bar",
                // data: [220, 120, 240, 220],
                data: boszhi,
                label: {
                  normal: {
                    show: true,
                    position: "top",
                    // "formatter": "{c}%"
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#00C7E1"
                  }
                },
                barWidth: 20, //柱子宽度
                // barGap: 1, //柱子之间间距
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00C7E1"
                      },
                      {
                        offset: 1,
                        color: "#005193"
                      }
                    ]),
                    opacity: 1,
                    barBorderRadius: 12
                  }
                }
              }
            ]
          };

          myChart.setOption(option);
          window.addEventListener("resize", function() {
            myChart.resize();
          });
        }
      }).catch((error)=>{
        console.error(error);
      });
    },

    //获取合同管理数量
    hetonggl() {
      this.$axios({
        url: api.QueryContractManageForHomeDataAsync,
        method: "post",
        data: { QueryCompanyId: this.CompanyID } //1是宁波总公司，2是上海分部，5浙江，6湖南
      }).then(res => {
        // console.log(res)
        this.HeadOffices = res.data.HeadOffices;
      }).catch((error)=>{
        console.error(error);
      });
    },
    //获取合同分公司折线数据
    zhexian() {
      this.$axios({
        url: api.QueryContractManageForHomeDataAsync,
        method: "post",
        data: { QueryCompanyId: this.CompanyID } //1是宁波总公司，2是上海分部，5浙江，6湖南
      }).then(res => {
        // console.log(res)
        var nianzhi = [];
        var szboxzhi = [];
        var nemobox = res.data.Datas;
        for (var i = 0; i < nemobox.length; i++) {
          nianzhi.push(nemobox[i].DIndex);
          szboxzhi.push(nemobox[i].DData);
        }

        let myChart = this.$echarts.init(document.getElementById("zhexiantu"));

        let option = {
          tooltip: {
            trigger: "axis"
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#00b3f4",
                  width: 1,
                  type: "solid"
                }
              },
              axisTick: {
                show: true
              },
              axisLabel: {
                show: true,
                interval: 1,
                textStyle: {
                  color: "#00b3f4"
                }
              },
              data: nianzhi
            }
          ],
          yAxis: [
            {
              splitLine: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#00c7ff",
                  width: 1,
                  type: "solid"
                }
              },

              axisLabel: {
                show: true,
                textStyle: {
                  color: "#24c4ff"
                },
                formatter: function(value) {
                  if (value === 0) {
                    return value;
                  }
                  return value;
                }
              },
              axisTick: {
                show: false
              }
            }
          ],
          series: [
            {
              name: "合同量",
              type: "line",
              symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
              showAllSymbol: true,
              symbolSize: 8,
              itemStyle: {
                color: "#00b3f4",
                borderColor: "#fff",
                borderWidth: 2
              },
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#00b3f4"
                }
              },
              tooltip: {
                show: true
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(0,179,244,0.3)"
                      },
                      {
                        offset: 1,
                        color: "rgba(0,179,244,0)"
                      }
                    ],
                    false
                  ),
                  shadowColor: "rgba(0,179,244, 0.9)",
                  shadowBlur: 20
                }
              },
              data: szboxzhi
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }).catch((error)=>{
        console.error(error);
      });
    },

    //点击切换财务收入周月年数据
    caitong(val) {
      this.QueryType = val;
      if (val == 0) {
        this.shuzhufei = "周";
        this.bostuikuan = [
          { value: 2, name: "湖南分公司" },
          { value: 3, name: "上海分公司" },
          { value: 2, name: "浙江分公司" }
        ];
       this.boxftuik = [{value: 1,name: "上周退款量"},{value: 2,name: "本周退款量"}]
      } else if (val == 1) {
        this.shuzhufei = "月";
        this.bostuikuan = [
          { value: 2, name: "湖南分公司" },
          { value: 5, name: "上海分公司" },
          { value: 2, name: "浙江分公司" }
        ];
        this.boxftuik = [{value: 3,name: "上月退款量"},{value: 2,name: "本月退款量"}]
      } else if (val == 2) {
        this.shuzhufei = "年";
        this.bostuikuan = [
          { value: 5, name: "湖南分公司" },
          { value: 8, name: "上海分公司" },
          { value: 5, name: "浙江分公司" }
        ];
        this.boxftuik = [{value: 2,name: "上年退款量"},{value: 4,name: "本年退款量"}]
      }
      this.NetIncome1();
      this.NetIncome2();
    },

    //获取总公司查看的投诉和签约退款数据
    NetIncome1() {
      this.$axios({
        url: api.QueryNetIncomeForHomeDataAsync,
        method: "post",
        data: { QueryCompanyId: this.CompanyID, QueryType: this.QueryType } //1是宁波总公司，2是上海分部，5浙江，6湖南
      }).then(res => {
        var toushu = res.data.Complaints;
        var touComplaints = [];
        var tousum = 0;
        for (let i = 0; i < toushu.length; i++) {
          if (toushu[i].CompanyName != "宁波总部") {
            touComplaints.push({
              value: toushu[i].DData,
              name: toushu[i].CompanyName
            });
            tousum += parseInt(toushu[i].DData);
          }
        }
        var qianyue = res.data.Signs;
        var touSigns = [];
        var qiansum = 0;
        for (let i = 0; i < qianyue.length; i++) {
          if (qianyue[i].CompanyName != "宁波总部") {
            touSigns.push({
              value: qianyue[i].DData,
              name: qianyue[i].CompanyName
            });
          }
          qiansum += parseInt(qianyue[i].DData);
        }

        //投诉图
        let myChart1 = this.$echarts.init(document.getElementById("toushu"));

        let option1 = {
          title: {
            text: "本" + this.shuzhufei + "投诉(" + tousum + ")",
            left: "center",
            bottom: 20,
            textStyle: {
              color: "#01c1de",
              fontSize: 20
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            show: true,
            top: "0%",
            right: "5%",
            icon: "bar",
            itemWidth: 15,
            itemHeight: 3,
            itemGap: 20, //图例间隔距离
            textStyle: {
              color: "#fff",
              // color: function(params) {
              //     var colorList = ['#FEF102', '#F35DFD', '#27CDFF'];
              // },
              fontSize: "13"
            }
          },
          series: [
            {
              type: "pie",
              radius: "70%",
              center: ["50%", "50%"],
              label: {
                position: "inner",
                // formatter: "{b}：{c}",
                formatter: "数量：{c}",
                fontSize: 16
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 30,
                  length2: 55
                },
                emphasis: {
                  show: true
                }
              },

              data: touComplaints,
              roseType: "radius",

              itemStyle: {
                normal: {
                  color: function(params) {
                    // var colorList = ['#FEF102', '#F35DFD', '#27CDFF'];
                    var colorList = ["#FEF102", "#27CDFF", "#F35DFD"];
                    return colorList[params.dataIndex % colorList.length];
                  }
                }
              },
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function(idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myChart1.setOption(option1);
        window.addEventListener("resize", function() {
          myChart1.resize();
        });

        //签约图
        let myChart2 = this.$echarts.init(document.getElementById("qianyue"));

        let option2 = {
          title: {
            text: "本" + this.shuzhufei + "签约(" + qiansum + ")",
            left: "center",
            bottom: 20,
            textStyle: {
              color: "#01c1de",
              fontSize: 20
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            show: true,
            top: "0%",
            right: "5%",
            icon: "bar",
            itemWidth: 15,
            itemHeight: 3,
            itemGap: 20, //图例间隔距离
            textStyle: {
              color: "#fff",
              // color: function(params) {
              //     var colorList = ['#FEF102', '#F35DFD', '#27CDFF'];
              // },
              fontSize: "13"
            }
          },
          series: [
            {
              type: "pie",
              radius: "70%",
              center: ["50%", "50%"],
              label: {
                position: "inner",
                // formatter: "{b}：{c}",
                formatter: "数量：{c}",
                fontSize: 16
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 30,
                  length2: 55
                },
                emphasis: {
                  show: true
                }
              },

              data: touSigns,
              roseType: "radius",

              itemStyle: {
                normal: {
                  color: function(params) {
                    // var colorList = ['#FEF102', '#F35DFD', '#27CDFF'];
                    var colorList = ["#FEF102", "#27CDFF", "#F35DFD"];
                    return colorList[params.dataIndex % colorList.length];
                  }
                }
              },
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function(idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myChart2.setOption(option2);
        window.addEventListener("resize", function() {
          myChart2.resize();
        });

        var tukansum = 0;
        for (let i = 0; i < this.bostuikuan.length; i++) {
          tukansum += parseInt(this.bostuikuan[i].value);
        }

        //退款图
        let myChart3 = this.$echarts.init(document.getElementById("tuikuan"));

        let option3 = {
          title: {
            text: "本" + this.shuzhufei + "退款(" + tukansum + ")",
            left: "center",
            bottom: 20,
            textStyle: {
              color: "#01c1de",
              fontSize: 20
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            show: true,
            top: "0%",
            right: "5%",
            icon: "bar",
            itemWidth: 15,
            itemHeight: 3,
            itemGap: 20, //图例间隔距离
            textStyle: {
              color: "#fff",
              // color: function(params) {
              //     var colorList = ['#FEF102', '#F35DFD', '#27CDFF'];
              // },
              fontSize: "13"
            }
          },
          series: [
            {
              type: "pie",
              radius: "70%",
              center: ["50%", "50%"],
              label: {
                position: "inner",
                // formatter: "{b}：{c}",
                formatter: "数量：{c}",
                fontSize: 16
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 30,
                  length2: 55
                },
                emphasis: {
                  show: true
                }
              },

              data: this.bostuikuan,
              roseType: "radius",

              itemStyle: {
                normal: {
                  color: function(params) {
                    // var colorList = ['#FEF102', '#F35DFD', '#27CDFF'];
                    var colorList = ["#FEF102", "#27CDFF", "#F35DFD"];
                    return colorList[params.dataIndex % colorList.length];
                  }
                }
              },
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function(idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myChart3.setOption(option3);
        window.addEventListener("resize", function() {
          myChart3.resize();
        });
      }).catch((error)=>{
        console.error(error);
      });
    },
    //获取各分公司的投诉和签约数据对比图
    NetIncome2() {
      this.$axios({
        url: api.QueryNetIncomeForHomeDataAsync,
        method: "post",
        data: { QueryCompanyId: this.CompanyID, QueryType: this.QueryType } //1是宁波总公司，2是上海分部，5浙江，6湖南
      }).then(res => {
        // console.log(res);
        var beztouzhi = res.data.Complaints;
        var boxtoushu = [];
        for (let i = 0; i < beztouzhi.length; i++) {
          if (beztouzhi[i].DIndex == 1) {
            beztouzhi[i]["name"] = "本" + this.shuzhufei + "投诉量"; //增加
            // beztouzhi[i].CompanyName = "本周投诉量"//替换
          } else if (beztouzhi[i].DIndex == 0) {
            // beztouzhi[i].CompanyName = "上周投诉量"
            beztouzhi[i]["name"] = "上" + this.shuzhufei + "投诉量";
          }
          // console.log(beztouzhi[i])
          boxtoushu.push({
            value: beztouzhi[i].DData,
            name: beztouzhi[i].name
          });
        }

        var boxqianye = res.data.Signs;
        var boxqianyue = []
        for (let i = 0; i < boxqianye.length; i++) {
          if (boxqianye[i].DIndex == 1) {
            boxqianye[i]["name"] = "本" + this.shuzhufei + "签约量"; //增加
            // beztouzhi[i].CompanyName = "本周签约量"//替换
          } else if (boxqianye[i].DIndex == 0) {
            // beztouzhi[i].CompanyName = "上周签约量"
            boxqianye[i]["name"] = "上" + this.shuzhufei + "签约量";
          }
          // console.log(beztouzhi[i])
          boxqianyue.push({
            value: boxqianye[i].DData,
            name: boxqianye[i].name
          });
        }

        //投诉图
        let myChart1 = this.$echarts.init(document.getElementById("toushu2"));
        let option1 = {
          title: {
            text: "本" + this.shuzhufei + "投诉情况",
            left: "center",
            bottom: 0,
            textStyle: {
              color: "#d9efff"
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)"
          },
          series: [
            {
              type: "pie",
              radius: "50%",
              selectedMode: "single",
              selectedOffset: 10,
              clockwise: true,
              center: ["50%", "50%"],
              color: ["#43cadd", "#3893e5"], //'#FBFE27','rgb(11,228,96)','#FE5050'
              data: boxtoushu,
              roseType: "radius",

              label: {
                normal: {
                  // formatter: ['{c|{b}{d}%}', '{b|{b}}'].join('\n'),
                  formatter: ["{b|{b}}", "{c|{c}}"].join("\n"),
                  rich: {
                    b: {
                      color: "#d9efff",
                      fontSize: 15,
                      height: 40
                    },
                    c: {
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "bold",
                      lineHeight: 5
                    }
                  }
                }
              },
              labelLine: {
                width: 5,
                length: 10,
                length2: 15,
                show: true,
                color: "#00ffff"
              }
            }
          ]
        };
        myChart1.setOption(option1);
        window.addEventListener("resize", function() {
          myChart1.resize();
        });

      //签约图
      let myChart2 = this.$echarts.init(document.getElementById("qianyue2"));

      let option2 = {
        // backgroundColor: 'black',

        title: {
          text: "本" + this.shuzhufei + "签约情况",
          left: "center",
          bottom: 0,
          textStyle: {
            color: "#d9efff"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },

        series: [
          {
            type: "pie",
            radius: "50%",
            selectedMode: "single",
            selectedOffset: 10,
            clockwise: true,
            center: ["50%", "50%"],
            color: ["#43cadd", "#3893e5"], //'#FBFE27','rgb(11,228,96)','#FE5050'
            data: boxqianyue,
            roseType: "radius",

            label: {
              normal: {
                // formatter: ['{c|{b}{d}%}', '{b|{b}}'].join('\n'),
                formatter: ["{b|{b}}", "{c|{c}}"].join("\n"),
                rich: {
                  b: {
                    color: "#d9efff",
                    fontSize: 15,
                    height: 40
                  },
                  c: {
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "bold",
                    lineHeight: 5
                  }
                },
                labelLine: {
                  width: 5,
                  length: 10,
                  length2: 15,
                  show: true,
                  color: "#00ffff"
                }
              }
            }
          }
        ]
      };
      myChart2.setOption(option2);
      window.addEventListener("resize", function() {
        myChart2.resize();
      });

      //退款图
      let myChart3 = this.$echarts.init(document.getElementById("tuikuan2"));
      let option3 = {
        title: {
          text: "本" + this.shuzhufei + "退款情况",
          left: "center",
          bottom: 0,
          textStyle: {
            color: "#d9efff"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },

        series: [
          {
            type: "pie",
            radius: "50%",
            selectedMode: "single",
            selectedOffset: 10,
            clockwise: true,
            center: ["50%", "50%"],
            color: ["#43cadd", "#3893e5"], //'#FBFE27','rgb(11,228,96)','#FE5050'
            data: this.boxftuik,
            roseType: "radius",

            label: {
              normal: {
                // formatter: ['{c|{b}{d}%}', '{b|{b}}'].join('\n'),
                formatter: ["{b|{b}}", "{c|{c}}"].join("\n"),
                rich: {
                  b: {
                    color: "#d9efff",
                    fontSize: 15,
                    height: 40
                  },
                  c: {
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "bold",
                    lineHeight: 5
                  }
                },
                labelLine: {
                  width: 5,
                  length: 10,
                  length2: 15,
                  show: true,
                  color: "#00ffff"
                }
              }
            }
          }
        ]
      };
      myChart3.setOption(option3);
      window.addEventListener("resize", function() {
        myChart3.resize();
      });

      }).catch((error)=>{
        console.error(error);
      });
    }

  },
  mounted() {
    this.EmpId = this.$route.query.EmpId; //获取身份id
    this.GetEmployee();
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
.material {
  width: 95%;
  height: 940px;
  background: url("../assets/train/material.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  overflow-y: auto;
}

.KecusRing {
  width: 70%;
  overflow: hidden;
  float: left;
}
.KecusRing .DivLfte {
  width: 49%;
  height: 650px;
  float: left;
  overflow: hidden;
}
.DivLfte .shutong {
  width: 100%;
  height: 315px;
  background: url("../assets/train/boszhong.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.KecusRing .contract {
  width: 49%;
  height: 650px;
  float: left;
  margin-left: 2%;
  background: url("../assets/train/contract.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.RingTop {
  width: 100%;
  overflow: hidden;
}
.RingBootm {
  width: 100%;
  height: 550px;
  overflow: hidden;
  margin-top: 20px;
  background: url("../assets/train/bootm.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
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
.Zongtu {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.Zongtu .echtuo {
  width: 30%;
  height: 400px;
}
</style>
<style>
.BosKe .el-button--primary {
  color: #000;
  background-color: #01c1de;
  border-color: #01c1de;
}
.BosKe .el-button {
  padding: 8px 20px;
}
</style>
