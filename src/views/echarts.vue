<template>
  <el-row>
    <el-col :span="8">
      <!-- user卡片 -->
      <el-card>
        <div class="user">
          <img src="https://img2.baidu.com/it/u=1452799733,302086199&fm=253&fmt=auto&app=138&f=JPEG?w=306&h=300" alt="">
          <div class="userInfo">
            <p  class="name">Admin</p>
            <p  class="access">超级管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>快打车app：<span>按小时计费，灵活方便！租辆汽车，不再等车，不再拥挤！</span></p>
        </div>
      </el-card>
      <!-- table卡片 -->
      <el-card style="margin-top: 20px;">
        <el-table :data="TableData" style="width: 100%">
          <el-table-column
              prop="type"
              label="打车类型"
              width="160">
          </el-table-column>
          <el-table-column
              prop="orderNum"
              label="订单数量"
              width="160">
          </el-table-column>
          <el-table-column
              prop="moneyNum"
              label="订单金额">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16">
      <div class="num">
        <el-card v-for="item in CountData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
          <div class="details">
            <p class="price">{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>


      <!-- echarts图表 -->
      <div style="margin-left:20px">
        <!-- 折线图 -->
        <el-card style="height:350px">
          <div ref="echarts1" style="height:350px; width: 100%"></div>
        </el-card>
        <el-card style="height:350px;margin-top: 20px">
          <div ref="echarts2" style="height:350px; width: 100%"></div>
        </el-card>
      </div>

    </el-col>
  </el-row>
</template>

<script>

import * as echarts from 'echarts'
import $axios from "axios";
import json from "@/api/url.json";
// echarts的配置数据


export default {
  name: 'echartsView',
  data() {
    return {
      dataList: [],
      CountData: [],
      TableData: [],
    }
  },
  created() {
    this.findAggregateStatistics();
    this.findVehicleStatistics();
  },
  methods: {
    findAggregateStatistics() {
      $axios.get(json.serviceUrl.echarts.AggregateStatistics).then(res => {
        this.CountData = res.data.data;
      })
    },
    findVehicleStatistics() {
      $axios.get(json.serviceUrl.echarts.VehicleStatistics).then(res => {
        this.TableData = res.data.data;
      })
    },
    echarts1() {
      const echarts1 = echarts.init(this.$refs.echarts1);

      $axios.get(json.serviceUrl.echarts.BrokenLineChart).then(res => {
        const array = res.data.data;
        const names = [];
        const nums = [];
        for (let i = 0; i < array.length; i++) {
          names.push(array[i].date);
          nums.push(array[i].money);
        }
        const option = {
          title: {
            text: '交易金额'
          },
          tooltip: {},
          xAxis: {
            data: names
          },
          yAxis: {},
          series: [{
            name: '金额',
            type: 'line',
            data: nums
          }]
        };
        echarts1.setOption(option);
      })


    },
    echarts2() {
      // 基于准备好的dom，初始化echarts实例
      const echarts2 = echarts.init(this.$refs.echarts2);
      $axios.get(json.serviceUrl.echarts.BarChart).then(res => {
        const array = res.data.data;
        const names = [];
        const nums = [];
        for (let i = 0; i < array.length; i++) {
          names.push(array[i].date);
          nums.push(array[i].num);
        }
        const option = {
          title: {
            text: '订单完成数量'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: names
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: nums
            }
          ]
        };
        echarts2.setOption(option);
      })

    },
    mounted() {
      this.echarts1()
      this.echarts2()
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  // 垂直居中
  display: flex;
  align-items: center;

  // 外边距:分割线距离loginInfo的距离
  margin-bottom: 20px;
  // 内边距:分割线距离User的距离
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }

  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}

.loginInfo {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  // 要换行
  flex-wrap: wrap;
  // 从头到尾均匀排列
  justify-content: space-between;
  margin-left: 20px;

  .el-card {
    width: 32%;
    margin-bottom: 20px;

    .icon {
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 30px;
      color: #fff;
    }

    .details {
      // 竖着排且居中
      display: flex;
      flex-direction: column;
      justify-content: center;

      margin-left: 15px;

      .price {
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 30px;
        height: 30px;
      }

      .desc {
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    }
  }
}

.graph {
  display: flex;
  // 两个靠边
  justify-content: space-between;
  margin-top: 20px;

  .el-card {
    width: 49%;
  }
}
</style>
