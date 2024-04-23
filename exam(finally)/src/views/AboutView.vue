<template>
  <div class="flex flex-col text-white">
    <div class="p-2 text-center bg-weather-secondary">
      "你正在浏览{{ query.cityname }}的天气信息"
      <span>可以通过右上角的"+"按钮保存起来</span>
    </div>
    <div class="container flex flex-col text-center mt-6 gap-4">
      <h1>当日气温是：{{ weatherData.temperature }}摄氏度</h1>
      <h1>当日天气是：{{ weatherData.weather }}</h1>
      <h1>当日风向是：{{ weatherData.winddirection }}风</h1>
      <h1>当日风力是：{{ weatherData.windpower }}级</h1>
    </div>
    <hr class="border-white border-opacity-10 mt-6">
    <div class="moreweather container">
      <div class="bg-weather-secondary px-12 pt-10 mt-2 rounded">
        <div class="flex gap-6">
          <div class="flex flex-col flex-1 text-center gap-4" v-for="(item, index) in weatherList" :key="index">
            <span>周{{ item.week }}</span>
            <span> {{ item.date && item.date.substring(5, 10) }}</span>
            <span>{{ item.dayweather }}</span>
            <span>风力{{ item.nightpower }}级</span>
          </div>

        </div>
        <div id="charts">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();
import * as echart from 'echarts';

import { getCityData, getWeatherByCodeAll, getWeatherData, getWeatherByCode } from '../api';



const weatherList = ref([]);

const weatherData = ref({});

// 路由参数
const query = ref({})



onMounted(() => {


  query.value = route.query
  console.log(query.value);
  if (query.value) {
    getWeatherByCodeAll(query.value.adcode).then(res2 => {
      weatherList.value = res2.forecasts[0].casts
      setCharts(res2.forecasts[0].casts)
      console.log(res2.forecasts[0].casts,333)
    })
    // 根据adcode查询天气
    getWeatherByCode(query.value.adcode).then(res2 => {
      if (res2.info === 'OK') {
        // 取第一条数据 
        weatherData.value = res2.lives[0]
        counterStore.api1({
          cityname: query.value.cityname,
          temperature: weatherData.value.temperature,
          adcode: query.value.adcode
        })
      }
    })
  }
});






//  设置图表数据
const setCharts = (data) => {

  let charts = echart.init(document.getElementById('charts'))
  let option = {

    // backgroundColor: '#323a5e',
    grid: {
      left: '3%',
      right: '9%',
      bottom: '10%',
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: [data[0].daytemp, data[1].daytemp, data[2].daytemp, data[3].daytemp],
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: (value) => { return '白天' + value.value + '℃' },
              color: '#fff',
              position: 'top',
            }
          }
        }
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: [data[0].nighttemp, data[1].nighttemp, data[2].nighttemp, data[3].nighttemp],
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: (value) => { return '夜晚' + value.value + '℃' },
              color: '#fff',
              position: 'bottom',
            }
          }
        }
      },

    ]
  };
  charts.setOption(option)
}



</script>

<style lang="scss" scoped>
#charts {
  width: 100%;
  height: 200px;
  background: transparent;
  // margin: 20px 0;
}
</style>
