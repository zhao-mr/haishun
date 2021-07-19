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
        <div class="news">
          <div class="NameTop">
            <h3>开票管理</h3>
            <span></span>
          </div>

          <div class="leibian">
            <div class="NeRong">
                <p>本期未发票金额（总数：5120000，浙江：2100000, 湖南：650000，上海：2370000‬）</p>
                <p>到期未开票金额（总数：5520000，浙江：2200000, 湖南：750000，上海：2570000‬）</p>
            </div>
          </div>
        </div>
        <div class="news">
          <div class="NameTop">
            <h3>税负率管理</h3>
            <span></span>
          </div>
          <div class="leibian">
            <div class="NeRong">
              <p>增值税税负率（总数：150000，浙江：85000,湖南：23000，上海：42000）</p>
            </div>
          </div>
        </div>
      </div>

      <div class="KecusRing">
        <div class="RingBootm">
          <div class="NameTop" style="margin-bottom: 0">
            <h3>收入</h3>
          </div>
          <div class="BosBten">
            <div class="Annuie" @click="caitong(0)">周统计</div>
            <div class="Annuie" @click="caitong(1)">月统计</div>
            <div class="Annuie" @click="caitong(2)">年统计</div>
          </div>
          <div
            id="shouru"
            style="width: 100%;height: 330px"
            v-show="this.CompanyID == 1"
          ></div>
          <div id="shouru2" style="width: 100%;height: 330px" v-show="this.CompanyID != 1"></div>
          <!-- <div id="shouruf2" style="width: 100%;height: 330px;" v-show="this.CompanyID != 1">111</div> -->
        </div>
        <div class="RingBootm">
          <div class="NameTop" style="margin-bottom: 0">
            <h3>退款</h3>
          </div>
          <div class="BosBten">
            <div class="Annuie" @click="caitong2(0)">周统计</div>
            <div class="Annuie" @click="caitong2(1)">月统计</div>
            <div class="Annuie" @click="caitong2(2)">年统计</div>
          </div>
          <div id="tuikuan" style="width: 100%;height: 350px;"></div>
        </div>
        <div class="RingBootm">
          <div class="NameTop" style="margin-bottom: 0">
            <h3>净收入</h3>
          </div>
          <div class="BosBten">
            <div class="Annuie" @click="caitong3(0)">周统计</div>
            <div class="Annuie" @click="caitong3(1)">月统计</div>
            <div class="Annuie" @click="caitong3(2)">年统计</div>
          </div>
          <div id="jinshouru" style="width: 100%;height: 350px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import api from "@/api/apitou";
export default {
  data() {
    return {
      EmpId: "", //身份ID
      CompanyID: "", //当前登录的用户ID， 总公司分公司

      Name: "", //姓名
      CompanyName: "", //所属机构
      LoginDateTime: "", //本次登录时间
      LastDateTime: "", //最近登录时间

      QueryType: "0" //选择0周1月2年
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
            this.$nextTick(() => {
              this.income();
            });
          } else {
            this.$nextTick(() => {
              this.income2();
            });
          }
        }
      }).catch((error)=>{
        console.error(error);
      });
    },

    //点击切换财务收入周月年数据
    caitong(val) {
      this.QueryType = val;
      this.income();
      this.income2();
    },
    //退款切换
    caitong2(val){

    },
        //净收入切换
    caitong3(val){

    },

    //收入数据图总部图
    income() {
            // var bosSecretKey = this.$md5('xigidsc@#74'+'778899'+'362324199210203028')//本地
        var bosSecretKey = this.$md5('xigidsc@#74'+'778899'+this.EmpId)//线上
      this.$axios({
        url: api.QueryOrderIncomeForHomeDataAsync,
        method: "post",
        data: { QueryType: this.QueryType, QueryCompanyId: this.CompanyID ,License:"xigidsc@#74",OprId:this.EmpId,SecretKey:bosSecretKey} //用户身份id,和选择周月年
      }).then(res => {
        var zhexshe = res.data.Datas;

        var nianfei = [];

        var shname = [];//上海数据
        var zjname = [];//浙江数据
        var hnname = [];//湖南数据

        for (var i = 0; i < zhexshe.length; i++) {
          nianfei.push(zhexshe[i].DIndex);
          if (zhexshe[i].CompanyName == "上海分公司") {
            shname.push(zhexshe[i].DData);
          } else if (zhexshe[i].CompanyName == "浙江分公司") {
            zjname.push(zhexshe[i].DData);
          } else if (zhexshe[i].CompanyName == "湖南分公司") {
            hnname.push(zhexshe[i].DData);
          }
        }
        //日期去重
        var newshuzhi = [];
        for (let i = 0; i < nianfei.length; i++) {
          if (newshuzhi.indexOf(nianfei[i]) === -1) {
            newshuzhi.push(nianfei[i]);
          }
        }
        let myChart = this.$echarts.init(document.getElementById("shouru"));
        let option = {
          grid: {
            left: "5%",
            right: "5%",
            top: "10%",
            bottom: "5%",
            containLabel: true
          },
          tooltip: {
            show: true, //去除面板显示
            trigger: "axis"
          },

          color: ["#58C5FF", "#FFF100", "#A303C0"],
          legend: {
            show: true,
            top: "0%",
            right: "5%",
            icon: "bar",
            itemWidth: 20,
            itemHeight: 3,
            itemGap: 35, //图例间隔距离
            textStyle: {
              color: "#fff",
              fontSize: "16"
            },
            // data: ["上海", "湖南", "杭州"]
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false, //图形距离y轴线的距离
              axisLabel: {
                // interval: 0,
                color: "#fff",
                fontSize: 14
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#ccc",
                  width: 0.5
                }
              },
              axisTick: {
                show: true
              },
              splitLine: {
                //x轴分割线
                show: false,
                lineStyle: {}
              },
              data: newshuzhi,
            }
          ],
          yAxis: [
            {
              type: "value",
              //   max: 8000,
              name: "单位（万）",
              nameTextStyle: {
                fontSize: 14,
                color: "#fff"
              },
              axisLabel: {
                formatter: "{value}万  ",
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              },
              splitLine: {
                //y轴分割线
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#ccc",
                  width: 0.5
                }
              },
              axisTick: {
                show: true
              }
            }
          ],
          series: [
            {
              name: "上海",
              type: "line",
              smooth: true, //平滑曲线显示
              showSymbol: false,
              symbol: "circle", //拐点样式
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "#58C5FF"
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: "rgba(88,197,255,.1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(88,197,255,.5)"
                      }
                    ])
                  }
                }
              },
              data: shname,
            },
            {
              name: "湖南",
              type: "line",
              smooth: true, //平滑曲线显示
              showSymbol: false,
              symbol: "circle", //拐点样式
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "#FFF100"
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: "rgba(240,210,84,.1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(240,210,84,.5)"
                      }
                    ])
                  }
                }
              },
              data: hnname,
            },
            {
              name: "杭州",
              type: "line",
              smooth: true, //平滑曲线显示
              showSymbol: false,
              symbol: "circle", //拐点样式
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "#A303C0"
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: "rgba(163,4,194,.1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(163,4,194,.3)"
                      }
                    ])
                  }
                }
              },
              data: zjname,
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
    //收入分公司图
    income2(){
                  // var bosSecretKey = this.$md5('xigidsc@#74'+'778899'+'362324199210203028')//本地
        var bosSecretKey = this.$md5('xigidsc@#74'+'778899'+this.EmpId)//线上
      this.$axios({
        url: api.QueryOrderIncomeForHomeDataAsync,
        method: "post",
        data: { QueryType: this.QueryType, QueryCompanyId: this.CompanyID,License:"xigidsc@#74",OprId:this.EmpId,SecretKey:bosSecretKey } //用户身份id,和选择周月年
      }).then(res => {
        var zhexshe = res.data.Datas;

        var nianfei = [];
        var bosnemr;
        var boszhi = [];
        for (var i = 0; i < zhexshe.length; i++) {
          nianfei.push(zhexshe[i].DIndex);
          bosnemr = zhexshe[i].CompanyName;
          boszhi.push(zhexshe[i].DData);
        }

        let myChart = this.$echarts.init(document.getElementById("shouru2"));
        let option = {
          grid: {
            left: "5%",
            right: "5%",
            top: "10%",
            bottom: "5%",
            containLabel: true
          },
          tooltip: {
            show: true, //去除面板显示
            trigger: "axis"
          },

          color: ["#58C5FF", "#FFF100", "#A303C0"],
          legend: {
            show: true,
            top: "0%",
            right: "5%",
            icon: "bar",
            itemWidth: 20,
            itemHeight: 3,
            itemGap: 35, //图例间隔距离
            textStyle: {
              color: "#fff",
              fontSize: "16"
            },
            // data: ["上海", "湖南", "杭州"]
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false, //图形距离y轴线的距离
              axisLabel: {
                // interval: 0,
                color: "#fff",
                fontSize: 14
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#ccc",
                  width: 0.5
                }
              },
              axisTick: {
                show: true
              },
              splitLine: {
                //x轴分割线
                show: false,
                lineStyle: {}
              },
              data: nianfei,
            }
          ],
          yAxis: [
            {
              type: "value",
              //   max: 8000,
              name: "单位（万）",
              nameTextStyle: {
                fontSize: 14,
                color: "#fff"
              },
              axisLabel: {
                formatter: "{value}万  ",
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              },
              splitLine: {
                //y轴分割线
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#ccc",
                  width: 0.5
                }
              },
              axisTick: {
                show: true
              }
            }
          ],
          series: [
            {
              name: bosnemr,
              type: "line",
              smooth: true, //平滑曲线显示
              showSymbol: false,
              symbol: "circle", //拐点样式
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "#58C5FF"
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: "rgba(88,197,255,.1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(88,197,255,.5)"
                      }
                    ])
                  }
                }
              },
              data: boszhi,
            },
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });

      });
    },
    //退款数据图
    refund() {
      let myChart = this.$echarts.init(document.getElementById("tuikuan"));

      let option = {
        grid: {
          left: "5%",
          right: "5%",
          top: "10%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          show: true, //去除面板显示
          trigger: "axis"
        },

        color: ["#58C5FF", "#FFF100", "#A303C0"],
        legend: {
          show: true,
          top: "0%",
          right: "5%",
          icon: "bar",
          itemWidth: 20,
          itemHeight: 3,
          itemGap: 35, //图例间隔距离
          textStyle: {
            color: "#fff",
            fontSize: "16"
          },
          data: ["上海", "湖南", "杭州"]
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false, //图形距离y轴线的距离
            axisLabel: {
              // interval: 0,
              color: "#fff",
              fontSize: 14
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ccc",
                width: 0.5
              }
            },
            axisTick: {
              show: true
            },
            splitLine: {
              //x轴分割线
              show: false,
              lineStyle: {}
            },
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            //   max: 8000,
            name: "单位（万）",
            nameTextStyle: {
              fontSize: 14,
              color: "#fff"
            },
            axisLabel: {
              formatter: "{value}万  ",
              textStyle: {
                color: "#fff",
                fontSize: 14
              }
            },
            splitLine: {
              //y轴分割线
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ccc",
                width: 0.5
              }
            },
            axisTick: {
              show: true
            }
          }
        ],
        series: [
          {
            name: "上海",
            type: "line",
            smooth: true, //平滑曲线显示
            showSymbol: false,
            symbol: "circle", //拐点样式
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#58C5FF"
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(88,197,255,.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(88,197,255,.5)"
                    }
                  ])
                }
              }
            },
            data: [
              6000,
              5600,
              4400,
              3000,
              3400,
              4200,
              4600,
              7000,
              6800,
              5400,
              4200,
              3600,
              2800
            ]
          },
          {
            name: "湖南",
            type: "line",
            smooth: true, //平滑曲线显示
            showSymbol: false,
            symbol: "circle", //拐点样式
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#FFF100"
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(240,210,84,.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(240,210,84,.5)"
                    }
                  ])
                }
              }
            },
            data: [
              4100,
              4000,
              2400,
              2300,
              1800,
              5100,
              4100,
              2400,
              2300,
              2100,
              4000,
              4200
            ]
          },
          {
            name: "杭州",
            type: "line",
            smooth: true, //平滑曲线显示
            showSymbol: false,
            symbol: "circle", //拐点样式
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#A303C0"
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(163,4,194,.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(163,4,194,.3)"
                    }
                  ])
                }
              }
            },
            data: [
              3300,
              4000,
              6000,
              4500,
              2900,
              6300,
              4200,
              3800,
              3500,
              2900,
              6300,
              4200
            ]
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //净收入数据图
    jincome() {
      let myChart = this.$echarts.init(document.getElementById("jinshouru"));

      let option = {
        grid: {
          left: "5%",
          right: "5%",
          top: "10%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          show: true, //去除面板显示
          trigger: "axis"
        },

        color: ["#58C5FF", "#FFF100", "#A303C0"],
        legend: {
          show: true,
          top: "0%",
          right: "5%",
          icon: "bar",
          itemWidth: 20,
          itemHeight: 3,
          itemGap: 35, //图例间隔距离
          textStyle: {
            color: "#fff",
            fontSize: "16"
          },
          data: ["上海", "湖南", "杭州"]
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false, //图形距离y轴线的距离
            axisLabel: {
              // interval: 0,
              color: "#fff",
              fontSize: 14
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ccc",
                width: 0.5
              }
            },
            axisTick: {
              show: true
            },
            splitLine: {
              //x轴分割线
              show: false,
              lineStyle: {}
            },
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            //   max: 8000,
            name: "单位（万）",
            nameTextStyle: {
              fontSize: 14,
              color: "#fff"
            },
            axisLabel: {
              formatter: "{value}万  ",
              textStyle: {
                color: "#fff",
                fontSize: 14
              }
            },
            splitLine: {
              //y轴分割线
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ccc",
                width: 0.5
              }
            },
            axisTick: {
              show: true
            }
          }
        ],
        series: [
          {
            name: "上海",
            type: "line",
            smooth: true, //平滑曲线显示
            showSymbol: false,
            symbol: "circle", //拐点样式
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#58C5FF"
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(88,197,255,.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(88,197,255,.5)"
                    }
                  ])
                }
              }
            },
            data: [
              6000,
              5600,
              4400,
              3000,
              3400,
              4200,
              4600,
              7000,
              6800,
              5400,
              4200,
              3600,
              2800
            ]
          },
          {
            name: "湖南",
            type: "line",
            smooth: true, //平滑曲线显示
            showSymbol: false,
            symbol: "circle", //拐点样式
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#FFF100"
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(240,210,84,.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(240,210,84,.5)"
                    }
                  ])
                }
              }
            },
            data: [
              4100,
              4000,
              2400,
              2300,
              1800,
              5100,
              4100,
              2400,
              2300,
              2100,
              4000,
              4200
            ]
          },
          {
            name: "杭州",
            type: "line",
            smooth: true, //平滑曲线显示
            showSymbol: false,
            symbol: "circle", //拐点样式
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#A303C0"
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(163,4,194,.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(163,4,194,.3)"
                    }
                  ])
                }
              }
            },
            data: [
              3300,
              4000,
              6000,
              4500,
              2900,
              6300,
              4200,
              3800,
              3500,
              2900,
              6300,
              4200
            ]
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  },
  mounted() {
    this.EmpId = this.$route.query.EmpId; //获取身份id

    this.GetEmployee();

    this.refund();
    this.jincome();
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

.KecusRing {
  width: 70%;
  overflow: hidden;
  float: left;
}

.RingBootm {
  width: 100%;
  height: 450px;
  overflow: hidden;
  background: url("../assets/train/caibootm.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  /* margin-bottom: 20px; */
}
.RingBootm:nth-of-type(2) {
  margin: 20px 0;
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
.leibian{
  width: 100%;
  height: 135px;
  overflow: auto;
}
</style>
