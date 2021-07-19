<template>
  <div style="margin-top: 20px;">
    <div class="BosEch">
      <div class="EchartsLeft">
        <div class="EchartDiv">
          <p class="wenzi">
            产品占比 <span class="words"> Asset analysis</span>
          </p>
          <div class="datagrph">
            <div id="myCharts" style="width: 100%;height: 100%;"></div>
          </div>
        </div>
        <div class="EchartDiv">
          <p class="wenzi">
            客户来源 <span class="words"> Customer source</span>
          </p>
          <div class="datagrph">
            <div id="myloudou" style="width: 90%;height: 100%;"></div>
            <div class="DatRinmg">
              <div class="brijitu" v-for="site in kehleixin" :key="site.DataValue">
                <div>
                  <p class="Binse">{{site.DataValue}}</p>
                  <p>{{site.DataName}}</p>
                </div>
              </div>
              <!-- <div class="brijitu">
                <div>
                  <p class="Binse">1289</p>
                  <p>微信访问量</p>
                </div>
              </div>
              <div class="brijitu">
                <div>
                  <p class="Binse">2289</p>
                  <p>微信访问量</p>
                </div>
              </div>
              <div class="brijitu">
                <div>
                  <p class="Binse">2890</p>
                  <p>微信访问量</p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="EchartsAout">
        <div class="AoutTop">
          <p class="BsoTobnei">实际客户总量</p>
          <div class="Shukuai">
            <div class="count">
              <b v-for="(item, index) in prosecutorArr" :key="index">
                <div :style="{ top: -item * 80 + 'px' }" class="undong">
                  <i v-for="(ic, indexc) in 10" :key="indexc">{{ ic - 1 }}</i>
                </div>
              </b>
            </div>
          </div>
        </div>
        <div class="AoutTopRchrs" style="">
          <div id="myDitu" style="width: 100%;height: 40rem;"></div>
        </div>
      </div>
      <div class="EchartsRight">
        <div class="EchartDiv">
          <p class="wenzi">
            销售人员涨幅分析 <span class="words"> Sales Force analysis</span>
          </p>
          <div class="datagrph">
            <div class="BosBten">
              <div class="Annuie" @click="caitong(0)">周统计</div>
              <div class="Annuie" @click="caitong(1)">月统计</div>
            </div>
            <div
              id="myZhuxin"
              style="width: 95%;height: 80%;margin:0 auto;"
            ></div>
          </div>
        </div>
        <div class="EchartDiv">
          <p class="wenzi">
            实际客户类占比
            <span class="words"> Proportion of actual customer category</span>
          </p>
          <div class="datagrph">
            <div id="myKehu" style="width: 100%;height: 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
//   import '../../node_modules/echarts/map/js/world.js'//世界地图
import "../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
import api from "@/api/apitou";
export default {
  name: "bosBoootm",
  data() {
    return {
      EmpId: "", //身份ID
      CompanyID: "", //当前登录的用户ID， 总公司分公司

      QueryType: 0, //选择的周月年

      prosecutorArr: ["0", "0", "0", "0", "0", "0", "0"],
      //这里的数字数组是个8位数，只是占位，不能直接使用，看需求有可能是10位或11、12、20等等
      numbers: "59832",
      //这个参数是后台传给我们的，也不能直接使用，需要转换


      kehleixin:[],//来源类型
    };
  },
  components: {},
  watch: {},
  mounted() {
    this.EmpId = this.$route.query.EmpId; //获取身份id

    this.GetEmployee();

    // this.deawLoudou();
    // this.deawKehu();

    setInterval(() => {
      this.plusNPrAll();
    }, 500);
    this.deawDitu();

    this.GetHomeDataAsync();
  },
  methods: {
    //获取用户信息
    GetEmployee() {
      // var bosSecretKey = this.$md5("xigidsc@#74" + "778899" + "362324199210203028"); //本地
      var bosSecretKey = this.$md5('xigidsc@#74'+'778899'+this.EmpId)//线上
      this.$axios({
        url: api.GetEmployeeInformationHomeDataAsync,
        method: "post",
        // data: { EmpId: "152629199807281511",License:"xigidsc@#74",OprId:"152629199807281511",SecretKey:bosSecretKey} //用户身份id分公司
        // data: {EmpId: "362324199210203028",License: "xigidsc@#74",OprId: "362324199210203028",SecretKey: bosSecretKey} //用户身份id 本地总公司
        data: {EmpId:this.EmpId,License:"xigidsc@#74",OprId:this.EmpId,SecretKey:bosSecretKey}//用户身份id  线上
      })
        .then(res => {
          // console.log(res)
          if (res.status == 200) {
            this.CompanyID = res.data.CompanyID;
            this.yejifuan(); //总公司
          }
        })
        .catch(error => {
          console.error(error);
        });
    },

    //点击切换周月数据
    caitong(val) {
      this.QueryType = val;
      this.yejifuan();
    },

    //获取公司业绩
    yejifuan() {
      // var bosSecretKey = this.$md5("xigidsc@#74" + "778899" + "362324199210203028"); //本地
      var bosSecretKey = this.$md5('xigidsc@#74'+'778899'+this.EmpId)//线上
      this.$axios({
        url: api.QueryCompanyAchievementAsync,
        method: "post",
        // data: {QueryType: this.QueryType,QueryCompanyId: this.CompanyID,License: "xigidsc@#74",OprId: "362324199210203028", SecretKey:bosSecretKey} //用户身份id,和选择周月年  本地
         data: { QueryType: this.QueryType, QueryCompanyId: this.CompanyID ,License:"xigidsc@#74",OprId:this.EmpId,SecretKey:bosSecretKey} //用户身份id,和选择周月年  线上
      })
        .then(res => {
          console.log(res);
          if (this.CompanyID == 1) {
            var shuzhi = res.data.Datas;
            var riqis = [];

            var ningbo = []; //宁波
            var hunan = []; //湖南
            var sahnghai = []; //上海
            var zhejiang = []; //浙江
            for (let i = 0; i < shuzhi.length; i++) {
              riqis.push(shuzhi[i].DIndex);
              if (shuzhi[i].CompanyName == "宁波总部") {
                ningbo.push(shuzhi[i].DData);
              } else if (shuzhi[i].CompanyName == "湖南分公司") {
                hunan.push(shuzhi[i].DData);
              } else if (shuzhi[i].CompanyName == "上海分公司") {
                sahnghai.push(shuzhi[i].DData);
              } else if (shuzhi[i].CompanyName == "浙江分公司") {
                zhejiang.push(shuzhi[i].DData);
              }
            }

            var boxary = [];
            for (let i = 0; i < riqis.length; i++) {
              for (let b = i + 1; b < riqis.length; b++) {
                if (riqis[i] == riqis[b]) {
                  delete riqis[b];
                }
              }
              if (riqis[i] != undefined) {
                boxary.push(riqis[i]);
              }
            }

            this.$nextTick(() => {
              let myChart = this.$echarts.init(
                document.getElementById("myZhuxin")
              );
              let option = {
                // backgroundColor: '#031245',
                textStyle: {
                  color: "#c0c3cd",
                  fontSize: 14
                },
                toolbox: {
                  show: false,
                  feature: {
                    saveAsImage: {
                      backgroundColor: "#031245"
                    },
                    restore: {}
                  },
                  iconStyle: {
                    borderColor: "#c0c3cd"
                  }
                },
                legend: {
                  top: 10,
                  itemWidth: 8,
                  itemHeight: 8,
                  icon: "circle",
                  left: "center",
                  padding: 0,
                  textStyle: {
                    color: "#c0c3cd",
                    fontSize: 14,
                    padding: [2, 0, 0, 0]
                  }
                },
                color: ["#00D7E9", "rgba(0, 215, 233, 0.9)"],
                grid: {
                  containLabel: true,
                  left: 20,
                  right: 20,
                  bottom: 10,
                  top: 40
                },
                xAxis: {
                  nameTextStyle: {
                    color: "#01C1DE",
                    padding: [0, 0, -10, 0],
                    fontSize: 12
                  },
                  axisLabel: {
                    color: "#01C1DE",
                    fontSize: 12,
                    interval: 0,
                    formatter: function(params) {
                      var newParamsName = ""; // 最终拼接成的字符串
                      var paramsNameNumber = params.length; // 实际标签的个数
                      var provideNumber = 4; // 每行能显示的字的个数
                      var rowNumber = Math.ceil(
                        paramsNameNumber / provideNumber
                      ); // 换行的话，需要显示几行，向上取整
                      /**
                       * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                       */
                      // 条件等同于rowNumber>1
                      if (paramsNameNumber > provideNumber) {
                        /** 循环每一行,p表示行 */
                        for (var p = 0; p < rowNumber; p++) {
                          var tempStr = ""; // 表示每一次截取的字符串
                          var start = p * provideNumber; // 开始截取的位置
                          var end = start + provideNumber; // 结束截取的位置
                          // 此处特殊处理最后一行的索引值
                          if (p == rowNumber - 1) {
                            // 最后一次不换行
                            tempStr = params.substring(start, paramsNameNumber);
                          } else {
                            // 每一次拼接字符串并换行
                            tempStr = params.substring(start, end) + "\n";
                          }
                          newParamsName += tempStr; // 最终拼成的字符串
                        }
                      } else {
                        // 将旧标签的值赋给新标签
                        newParamsName = params;
                      }
                      //将最终的字符串返回
                      return newParamsName;
                    }
                  },
                  axisTick: {
                    show: false,
                    lineStyle: {
                      color: "#01C1DE",
                      width: 1
                    }
                  },
                  splitLine: {
                    show: false
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#01C1DE"
                    },
                    show: true
                  },
                  data: boxary,
                  type: "category"
                },
                yAxis: {
                  nameTextStyle: {
                    color: "#01C1DE",
                    padding: [0, 0, -10, 0],
                    fontSize: 12
                  },
                  axisLabel: {
                    color: "#01C1DE",
                    fontSize: 12
                  },
                  axisTick: {
                    lineStyle: {
                      color: "#01C1DE",
                      width: 1
                    },
                    show: true
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: "#01C1DE"
                      // "type": "dashed"
                    }
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#01C1DE",
                      width: 1
                      // "type": "dashed"
                    },
                    show: false
                  },
                  name: ""
                },
                series: [
                  {
                    name: "宁波总部",
                    data: ningbo,
                    type: "bar",
                    barMaxWidth: "auto",
                    itemStyle: {
                      color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: "linear",
                        colorStops: [
                          {
                            offset: 0,
                            color: "#0D5EB1"
                          },
                          {
                            offset: 1,
                            color: "#00D7E9"
                          }
                        ]
                      }
                    }

                    // "label": {
                    //   "show": true,
                    //   "position": "top",
                    //   "distance": 10,
                    //   "color": "#fff"
                    // }
                  },
                  {
                    name: "湖南分公司",
                    data: hunan,
                    type: "bar",
                    barMaxWidth: "auto",
                    itemStyle: {
                      color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: "linear",
                        colorStops: [
                          {
                            offset: 0,
                            color: "#0D5EB1"
                          },
                          {
                            offset: 1,
                            color: "#00D7E9"
                          }
                        ]
                      }
                    }

                    // "label": {
                    //   "show": true,
                    //   "position": "top",
                    //   "distance": 10,
                    //   "color": "#fff"
                    // }
                  },
                  {
                    name: "上海分公司",
                    data: sahnghai,
                    type: "bar",
                    barMaxWidth: "auto",
                    itemStyle: {
                      color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: "linear",
                        colorStops: [
                          {
                            offset: 0,
                            color: "#0D5EB1"
                          },
                          {
                            offset: 1,
                            color: "#00D7E9"
                          }
                        ]
                      }
                    }

                    // "label": {
                    //   "show": true,
                    //   "position": "top",
                    //   "distance": 10,
                    //   "color": "#fff"
                    // }
                  },
                  {
                    name: "浙江分公司",
                    data: zhejiang,
                    type: "bar",
                    barMaxWidth: "auto",
                    itemStyle: {
                      color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: "linear",
                        colorStops: [
                          {
                            offset: 0,
                            color: "#0D5EB1"
                          },
                          {
                            offset: 1,
                            color: "#00D7E9"
                          }
                        ]
                      }
                    }

                    // "label": {
                    //   "show": true,
                    //   "position": "top",
                    //   "distance": 10,
                    //   "color": "#fff"
                    // }
                  }
                ],
                tooltip: {
                  show: true,
                  backgroundColor: "rgba(12,76,136,0.8)"
                  // formatter: "数据:{c0}"
                }
              };
              myChart.setOption(option);
              window.addEventListener("resize", function() {
                myChart.resize();
              });
            });
          } else {
            var neime = res.data.Datas;
            var boxDIndex = [];
            var boxDData = [];
            for (let i = 0; i < neime.length; i++) {
              boxDIndex.push(neime[i].DIndex);
              boxDData.push(neime[i].DData);
            }
            console.log(boxDIndex);
            this.$nextTick(() => {
              let myChart = this.$echarts.init(
                document.getElementById("myZhuxin")
              );
              let option = {
                // backgroundColor: '#031245',
                textStyle: {
                  color: "#c0c3cd",
                  fontSize: 14
                },
                toolbox: {
                  show: false,
                  feature: {
                    saveAsImage: {
                      backgroundColor: "#031245"
                    },
                    restore: {}
                  },
                  iconStyle: {
                    borderColor: "#c0c3cd"
                  }
                },
                legend: {
                  top: 10,
                  itemWidth: 8,
                  itemHeight: 8,
                  icon: "circle",
                  left: "center",
                  padding: 0,
                  textStyle: {
                    color: "#c0c3cd",
                    fontSize: 14,
                    padding: [2, 0, 0, 0]
                  }
                },
                color: ["#00D7E9", "rgba(0, 215, 233, 0.9)"],
                grid: {
                  containLabel: true,
                  left: 20,
                  right: 20,
                  bottom: 10,
                  top: 40
                },
                xAxis: {
                  nameTextStyle: {
                    color: "#01C1DE",
                    padding: [0, 0, -10, 0],
                    fontSize: 12
                  },
                  axisLabel: {
                    color: "#01C1DE",
                    fontSize: 12,
                    interval: 0,
                    formatter: function(params) {
                      var newParamsName = ""; // 最终拼接成的字符串
                      var paramsNameNumber = params.length; // 实际标签的个数
                      var provideNumber = 4; // 每行能显示的字的个数
                      var rowNumber = Math.ceil(
                        paramsNameNumber / provideNumber
                      ); // 换行的话，需要显示几行，向上取整
                      /**
                       * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                       */
                      // 条件等同于rowNumber>1
                      if (paramsNameNumber > provideNumber) {
                        /** 循环每一行,p表示行 */
                        for (var p = 0; p < rowNumber; p++) {
                          var tempStr = ""; // 表示每一次截取的字符串
                          var start = p * provideNumber; // 开始截取的位置
                          var end = start + provideNumber; // 结束截取的位置
                          // 此处特殊处理最后一行的索引值
                          if (p == rowNumber - 1) {
                            // 最后一次不换行
                            tempStr = params.substring(start, paramsNameNumber);
                          } else {
                            // 每一次拼接字符串并换行
                            tempStr = params.substring(start, end) + "\n";
                          }
                          newParamsName += tempStr; // 最终拼成的字符串
                        }
                      } else {
                        // 将旧标签的值赋给新标签
                        newParamsName = params;
                      }
                      //将最终的字符串返回
                      return newParamsName;
                    }
                  },
                  axisTick: {
                    show: false,
                    lineStyle: {
                      color: "#01C1DE",
                      width: 1
                    }
                  },
                  splitLine: {
                    show: false
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#01C1DE"
                    },
                    show: true
                  },
                  data: boxDIndex,
                  type: "category"
                },
                yAxis: {
                  nameTextStyle: {
                    color: "#01C1DE",
                    padding: [0, 0, -10, 0],
                    fontSize: 12
                  },
                  axisLabel: {
                    color: "#01C1DE",
                    fontSize: 12
                  },
                  axisTick: {
                    lineStyle: {
                      color: "#01C1DE",
                      width: 1
                    },
                    show: true
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: "#01C1DE"
                      // "type": "dashed"
                    }
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#01C1DE",
                      width: 1
                      // "type": "dashed"
                    },
                    show: false
                  },
                  name: ""
                },
                series: [
                  {
                    data: boxDData,
                    type: "bar",
                    barMaxWidth: "auto",
                    barWidth: 20,
                    itemStyle: {
                      color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: "linear",
                        colorStops: [
                          {
                            offset: 0,
                            color: "#0D5EB1"
                          },
                          {
                            offset: 1,
                            color: "#00D7E9"
                          }
                        ]
                      }
                    }
                    // "label": {
                    //   "show": true,
                    //   "position": "top",
                    //   "distance": 10,
                    //   "color": "#fff"
                    // }
                  },
                  {
                    data: [1, 1, 1, 1, 1, 1],
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: [0, "50%"],
                    symbolSize: [20, 10]
                  },
                  {
                    data: boxDData,
                    type: "pictorialBar",
                    barMaxWidth: "20",

                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: [0, "-50%"],
                    symbolSize: [20, 6],
                    zlevel: 2
                  }
                ],
                tooltip: {
                  show: true,
                  backgroundColor: "rgba(12,76,136,0.8)",
                  formatter: "数据:{c0}"
                }
              };
              myChart.setOption(option);
              window.addEventListener("resize", function() {
                myChart.resize();
              });
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    },


    //获取产品、客户来源、客户占比
    GetHomeDataAsync(){
      this.$axios({
        method: "post",
        url: api.GetHomeDataAsync,
        //  data: {OprId:"362324199210203028",}//用户身份id  本地
        data: {OprId:this.EmpId,}//用户身份id  线上
      })
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            var Products = res.data.Products
            var CustomerTypes = res.data.CustomerTypes
            var CustomerSources = res.data.CustomerSources
            this.kehleixin = res.data.CustomerSources

            this.deawcanpin(Products)
            this.deawKehu(CustomerTypes);
            this.deawLoudou(CustomerSources);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },

    //产品占比图
    deawcanpin(Products){
                          // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myCharts"));

      var buildList = Products;
      var arry = [];
      for (var i = 0; i < buildList.length; i++) {
        let item = {
          value: buildList[i].DataValue,
          name: buildList[i].DataName
        };
        arry.push(item);
      }
      var buildData = arry;
      var colorList = [
        "#FF8955",
        "#FFD200",
        "#00EACB",
        "#EB811A",
        "#0120EB",
        "#954EFF",
        "#FF5454",
        "#AF33E9",
        "#25CD84",
        "#EB6B9E",
        "#2871B5",
      ];
      var arr = buildData;

      function _pie2() {
        let dataArr = [];
        for (var i = 0; i < 8; i++) {
          if (i % 2 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: 23,
              itemStyle: {
                normal: {
                  color: "rgba(232,184,38,1)",
                  borderWidth: 0,
                  borderColor: "rgba(0,0,0,0)"
                }
              }
            });
          } else {
            dataArr.push({
              name: (i + 1).toString(),
              value: 20,
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
      var text = "分布区域";
      var finish = "100%";
      // 指定图表的配置项和数据
      let option = {
        color: colorList,
        title: {
          text: text,
          x: "center",
          y: "53%",
          textStyle: {
            color: "#fff",
            fontSize: 15
          }
        },
        graphic: [
          {
            type: "text",
            left: "center",
            top: "42np%",
            style: {
              text: finish,
              textAlign: "center",
              fill: "#fff",
              fontSize: 30,
              fontWeight: 600
            }
          }
        ],
        tooltip: {
          trigger: "item",
          // formatter: '{b} {c}%',
          backgroundColor: "rgba(12,76,136,0.8)",
          formatter: function(param) {
            return (
              param.name +"：" + param.value
            );
          }

          // backgroundColor: '#0C4C88',
          // 0C4C88
        },
        legend: {
          orient: "ver,tical",
          right: 10,
          show: false
        },
        series: [
          {
            type: "pie",
            zlevel: 2,
            silent: true,
            center: ["49.5%", "50%"],
            radius: ["65%", "68%"],
            startAngle: -110,
            label: {
              normal: {
                show: false
              }
            },
            data: _pie2()
          },
          {
            name: "圆圈",
            type: "pie",
            zlevel: 1,
            silent: true,
            center: ["49.5%", "50%"],
            radius: ["67%", "68%"],
            hoverAnimation: false,
            color: "#cea053",
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
            data: [
              {
                value: 1,
                name: "",
                itemStyle: {
                  normal: {
                    color: "#e8b826"
                  }
                }
              }
            ]
          },
          {
            type: "pie",
            center: ["49.5%", "50%"],
            radius: ["43%", "60%"],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 5,
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                },
                borderWidth: 1,
                lineStyle: {
                  color: "#e8b826"
                }
              }
            },
            //文字消失
            label: {
              show: true,
              // formatter: "{text|}\n{b}",
              formatter: "{b}：{c}"
              // borderWidth: 20,
              // borderRadius: 4,
              // fontSize:14,
              // padding: [-30, -40, 0, -40],
              // alignTo: 'labelLine',
              // rich: {
              //     b: {
              //         color: "#fff",
              //         fontSize: 12,
              //         lineHeight: 33
              //     },
              //     per: {
              //         fontSize: 12,
              //         padding: [2, 4],
              //         borderRadius: 2
              //     }
              // }
            },
            //指示线消失
            labelLine: {
              show: true,
              normal: {
                position: "outside",
                length: 25,
                length2: 28,
                show: true
              }
            },
            data: arr
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },

    deawLoudou(CustomerSources) {
      var kaishu = CustomerSources
      var datares = []
      for (let i = 0; i < kaishu.length; i++) {
        let item = {
          value: kaishu[i].DataValue,
          name: kaishu[i].DataName
        };
        datares.push(item);
      }
      let myChart = this.$echarts.init(document.getElementById("myloudou"));

      var colorList = ["#72A029", "#04B38C", "#059BB9", "#0973B9"];
      var colorListBos = [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(225,255,0,.8)" // 0% 处的颜色
            },
            {
              offset: 0.2,
              color: "rgba(225,255,0,.5)" // 20% 处的颜色
            },
            {
              offset: 0.5,
              color: "rgba(225,255,0,.3)" // 50% 处的颜色
            },
            {
              offset: 0.8,
              color: "rgba(225,255,0,.5)" // 80% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(225,255,0,.8)" // 100% 处的颜色
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(10,255,179,.8)" // 0% 处的颜色
            },
            {
              offset: 0.2,
              color: "rgba(10,255,179,.5)" // 20% 处的颜色
            },
            {
              offset: 0.5,
              color: "rgba(10,255,179,.3)" // 50% 处的颜色
            },
            {
              offset: 0.8,
              color: "rgba(10,255,179,.5)" // 80% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(10,255,179,.8)" // 100% 处的颜色
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(9,227,255,.8)" // 0% 处的颜色
            },
            {
              offset: 0.2,
              color: "rgba(9,227,255,.5)" // 20% 处的颜色
            },
            {
              offset: 0.5,
              color: "rgba(9,227,255,.3)" // 50% 处的颜色
            },
            {
              offset: 0.8,
              color: "rgba(9,227,255,.5)" // 80% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(9,227,255,.8)" // 100% 处的颜色
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(27,184,255,.8)" // 0% 处的颜色
            },
            {
              offset: 0.2,
              color: "rgba(27,184,255,.5)" // 20% 处的颜色
            },
            {
              offset: 0.5,
              color: "rgba(27,184,255,.3)" // 50% 处的颜色
            },
            {
              offset: 0.8,
              color: "rgba(27,184,255,.5)" // 80% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(27,184,255,.8)" // 100% 处的颜色
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(0,255,255,.8)" // 0% 处的颜色
            },
            {
              offset: 0.2,
              color: "rgba(0,255,255,.5)" // 20% 处的颜色
            },
            {
              offset: 0.5,
              color: "rgba(0,255,255,.3)" // 50% 处的颜色
            },
            {
              offset: 0.8,
              color: "rgba(0,255,255,.5)" // 80% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(0,255,255,.8)" // 100% 处的颜色
            }
          ]
        }
      ];
      let option = (option = {
        calculable: true,
        color: colorList,
        series: [
          {
            name: "",
            type: "funnel",

            minSize: "0%",
            maxSize: "80%",
            sort: "ascending",
            gap: 8,
            label: {
              normal: {
                show: true,
                position: "left",
                formatter: "{b}: {c}",
                fontSize: "12",
                color: "#059BB9"
              },
              emphasis: {
                position: "inside",
                formatter: "{b}: {c} "
              }
            },

            itemStyle: {
              normal: {
                borderColor: "transparent",
                color: function(param) {
                  return colorListBos[param.dataIndex];
                }
              }
            },
            // data: [
            //   { value: 1, name: "类型一", ten: "15" },
            //   { value: 2, name: "类型二", ten: "20" },
            //   { value: 3, name: "类型三", ten: "30" },
            //   { value: 4, name: "类型四", ten: "35" }
            // ]
            data: datares
          }
        ]
      });

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },

    //客户类型
    deawKehu(CustomerTypes) {
      var kaishu = CustomerTypes
      var datares = []
      for (let i = 0; i < kaishu.length; i++) {
        let item = {
          value: kaishu[i].DataValue,
          name: kaishu[i].DataName
        };
        datares.push(item);
      }
      let myChart = this.$echarts.init(document.getElementById("myKehu"));
      let option = {
        color: [
          "#AF33E9",
          "#25CD84",
          "#EB6B9E",
          "#DED71F",
          "#2871B5",
          "#23B5CC"
        ],
        title: {},
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(12,76,136,0.8)",
          formatter: "{b} : {c}"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: [20, 110],
            roseType: "area",
            // label:{
            //   normal:{
            //       formatter: '{font|{c}}\n{hr|}\n{font|{d}%}',
            //   }
            // },
            label: {
              show: true,
              formatter: "{b} : {c}"
            },
            labelLine: {
              show: true,
              normal: {
                position: "outside",
                length: 5,
                length2: 10,
                show: true
              }
            },
            data: datares
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },

    PrefixInteger(num, length) {
      //给数字前面补零 比如‘59832’补成8位即位‘00059832’
      return (Array(length).join("0") + num).slice(-length);
    },
    plusNPrAll() {
      const res = this.PrefixInteger(this.numbers, 7);
      this.prosecutorArr = res.toString().split("");
    },
    //地图
    deawDitu() {
      let myChart = this.$echarts.init(document.getElementById("myDitu"));
      var outname = [
        "北京",
        "天津",
        "上海",
        "重庆",
        "河北",
        "河南",
        "云南",
        "辽宁",
        "黑龙江",
        "湖南",
        "安徽",
        "吉林",
        "福建",
        "贵州",
        "广东",
        "青海",
        "西藏",
        "四川",
        "宁夏",
        "海南",
        "香港",
        "澳门"
      ];
      var outvalue = [
        524,
        13,
        140,
        75,
        13,
        83,
        11,
        19,
        15,
        69,
        260,
        4,
        18,
        5,
        208,
        41,
        0,
        484,
        404,
        22,
        22,
        5,
        225
      ];
      var outdata = [];

      var max = 6000,
        min = 10;
      var maxSize4Pin = 100,
        minSize4Pin = 20;

      for (var i = 0; i < outname.length; i++) {
        outdata.push({
          name: outname[i],
          value: outvalue[i]
        });
      }

      var geoCoordMap = {};
      /*获取地图数据*/
      var geoCoordMap = {
        台湾: [121.5135, 25.0308],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891]
      };
      var convertData = function(outdata) {
        var res = [];
        for (var i = 0; i < outdata.length; i++) {
          var geoCoord = geoCoordMap[outdata[i].name];
          if (geoCoord) {
            res.push({
              name: outdata[i].name,
              value: geoCoord.concat(outdata[i].value)
            });
          }
        }
        return res;
      };

      let option = {
        // backgroundColor: '#0F1C3C',
        tooltip: {
          show: true,
          backgroundColor: "rgba(12,76,136,0.8)",
          formatter: function(params) {
            if (params.value.length > 1) {
              return (
                "&nbsp;&nbsp;" +
                params.name +
                "&nbsp;&nbsp;&nbsp;" +
                params.value[2] +
                "人&nbsp;&nbsp;"
              );
            } else {
              // return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value + '人&nbsp;&nbsp;';
            }
          }
        },

        geo: {
          map: "china",
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false
            }
          },
          layoutSize: "100%",
          itemStyle: {
            normal: {
              borderColor: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#00F6FF"
                  },
                  {
                    offset: 1,
                    color: "#53D9FF"
                  }
                ],
                false
              ),
              borderWidth: 3,
              shadowColor: "rgba(10,76,139,1)",
              shadowOffsetY: 0,
              shadowBlur: 60
            }
          }
        },
        series: [
          {
            type: "map",
            map: "china",
            aspectScale: 0.75,
            //zoom:1.1,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#073684" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#061E3D" // 100% 处的颜色
                    }
                  ]
                },
                borderColor: "#215495",
                borderWidth: 1
              },
              emphasis: {
                areaColor: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#073684" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#061E3D" // 100% 处的颜色
                    }
                  ]
                }
              }
            },
            data: outdata
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            rippleEffect: {
              brushType: "stroke"
            },
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(5,80,151,0.2)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(5,80,151,0.8)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,108,255,0.7)"
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            label: {
              normal: {
                show: true,
                color: "#fff",
                fontWeight: "bold",
                position: "inside",
                formatter: function(para) {
                  return "{cnNum|" + para.data.value[2] + "}";
                },
                rich: {
                  cnNum: {
                    fontSize: 13,
                    color: "#D4EEFF"
                  }
                }
              }
            },
            symbol: "circle",
            symbolSize: function(val) {
              if (val[2] === 0) {
                return 0;
              }
              var a = (maxSize4Pin - minSize4Pin) / (max - min);
              var b = maxSize4Pin - a * max;
              return a * val[2] + b * 1.2;
            },
            data: convertData(outdata),
            zlevel: 1
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  },
  created() {}
};
</script>
<style scoped>
.count {
  float: left;
}
.count b {
  width: 60px;
  height: 80px;
  float: left;
  color: #fff;
  text-align: center;
  line-height: 80px;
  margin: 0 3px;
  position: relative;
  z-index: 3;
  overflow: hidden;
  background: url("../../src/assets/imgindex/zhusbei.png") no-repeat;
  background-size: 100% 100%;
}
.count .undong {
  width: 100%;
  height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 1s ease-in-out;
}
.count .undong i {
  width: 100%;
  height: 80px;
  float: left;
  font-style: normal;
  font-size: 50px;
  color: #fff;
  /*font-family: fantasy;*/
}
</style>
<style scoped>
.BosEch {
  width: 100%;
  overflow: hidden;
}
.EchartsLeft,
.EchartsRight {
  width: 30%;
  float: left;
}
.EchartsAout {
  width: 40%;
  float: left;
}
.EchartDiv {
  width: 100%;
  color: #fff;
  margin-top: 10px;
  margin-bottom: 20px;
}
.EchartDiv .words {
  font-size: 12px;
  color: #01c1de;
  margin-left: 10px;
  font-family: arial;
}
.EchartDiv .wenzi {
  text-indent: 35px;
  color: #01c1de;
  font-family: "宋体";
}
.EchartDiv .datagrph {
  width: 100%;
  /* height: 300px; */
  height: 23rem;
  background: url("../assets/imgindex/datatu.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  z-index: 999;
}

.DatRinmg {
  position: absolute;
  top: 9%;
  right: 5%;
}
.DatRinmg .brijitu {
  width: 70px;
  height: 50px;
  margin: 10px 0;
  text-align: right;
  display: flex;
  align-items: center;
  /*padding-right: 10px;*/
  background: -webkit-linear-gradient(
    left,
    rgba(255, 0, 0, 0),
    rgba(0, 100, 166, 0.6)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    rgba(255, 0, 0, 0),
    rgba(0, 100, 166, 0.6)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    rgba(255, 0, 0, 0),
    rgba(0, 100, 166, 0.6)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    rgba(255, 0, 0, 0),
    rgba(0, 100, 166, 0.6)
  ); /* 标准的语法（必须放在最后） */
  /*background: -webkit-linear-gradient(left, rgba(255,0,0,0), rgba(10,114,182,0.6)); !* Safari 5.1 - 6.0 *!*/
  /*background: -o-linear-gradient(right, rgba(255,0,0,0), rgba(10,114,182,0.6)); !* Opera 11.1 - 12.0 *!*/
  /*background: -moz-linear-gradient(right, rgba(255,0,0,0), rgba(10,114,182,0.6)); !* Firefox 3.6 - 15 *!*/
  /*background: linear-gradient(to right, rgba(255,0,0,0), rgba(10,114,182,0.6)); !* 标准的语法（必须放在最后） *!*/
}
.brijitu p {
  font-size: 12px;
}
.brijitu .Binse {
  font-size: 18px;
  font-weight: 600;
}
.DatRinmg .brijitu:nth-of-type(1) .Binse {
  color: #72a029;
}
.DatRinmg .brijitu:nth-of-type(2) .Binse {
  color: #04b38c;
}
.DatRinmg .brijitu:nth-of-type(3) .Binse {
  color: #059bb9;
}
.DatRinmg .brijitu:nth-of-type(4) .Binse {
  color: #0973b9;
}
.AoutTop {
  color: #fff;
  font-size: 20px;
  margin-top: 30px;
  padding: 0 30px;
  overflow: hidden;
}
.AoutTop .BsoTobnei {
  font-size: 24px;
  margin-bottom: 15px;
  color: #01c1de;
  letter-spacing: 3px;
}
.BosBten {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
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
</style>
