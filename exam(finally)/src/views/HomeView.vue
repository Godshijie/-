<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" placeholder="请输入城市名称" @click="del()" @blur="addLine()" @input="search" v-model="keyWord"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-md">
      <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[62px]"
        style="margin-bottom: 20px;" v-if="loading || addressList.length > 0">
        <p style="cursor: pointer;" v-for="(item, index) in addressList" :key="index" @click="toDetail(item)">{{ item.city
        }}</p>
        <p v-if="addressList.length == 0">似乎没有找到你查找的城市</p>
      </ul>
    </div>

    <div class="mt-10 max-h-[300px] overflow-y-scroll scrollbar-thin hover:scrollbar-thumb-blue-300">
      <div class="flex justify-between  " v-for="(item, index) in collectList" :key="index"
        @mouseenter="current = index + 1" @mouseleave="current = 0">
        <div class="mb-4 bg-weather-secondary py-2 px-4 flex justify-between cursor-pointer w-full duration-300  aaaa">
          <h3>{{ item.cityname }}</h3>
          <span> {{ item.temperature + '度' }}</span>
        </div>
        <div class="flex mb-4 gap-2 btn" v-if="current == index + 1" style="margin-left: 30px;">
          <button class="bg-yellow-500 text-center w-[80px]" @click="caozuo(item, 1, index)">查看</button>
          <button class="bg-yellow-500 text-center w-[80px]" @click="caozuo(item, 2, index)">删除</button>
        </div>
      </div>
      <div v-if="collectList.length==0" style="text-align: center;">暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。</div>
    </div>

    <h2 class="mt-6">近期天气</h2>
    <div class="bg-weather-secondary px-12 pt-10 mt-2 rounded">
      <div class="flex gap-6">
        <div class="flex flex-col flex-1 text-center gap-4" v-for="(item, index) in weatherList" :key="index">
          <span>周{{ item.week }}</span>
          <span> {{ item.date && item.date.substring(5, 10) }}</span>
          <span>{{ item.dayweather }}</span>
          <span>风力{{ item.nightpower }}级</span>
        </div>
      </div>
      <div id="charts"></div>
    </div>
  </main>
</template>


<script setup>
// import { debounce } from 'lodash ';
import { onMounted } from 'vue';
import { ref } from 'vue';
import * as echart from 'echarts';
import { getCityData, getWeatherByCodeAll, getWeatherData } from '../api';

// 判断是否在查询状态
const loading = ref(false)

const keyWord = ref("")

// 搜索列表
const addressList = ref([])
const weatherList = ref([])

// 文本框输入的方法
function search(){
  addressList.value = []
  if (!keyWord.value) {
    loading.value = false
    return
  }
  loading.value = true
  getWeatherData(keyWord.value).then(res => {
    if (res.info == 'OK') {
      addressList.value = res.geocodes
      console.log(res, 5551)
    }
    
  })
}

//week字段处理
// const day = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

function del() {
  document.querySelector("input").classList.remove("border-b");
}
// input失去焦点添加下划线方法
function addLine() {
  document.querySelector("input").classList.add("border-b");
}

const collectList = ref([])


// 将数据存储到本地(收藏列表)
function getCollectList() {
  let data = localStorage.getItem('collectList')
  if (data) {
    collectList.value = JSON.parse(data)
  }
}

onMounted(() => {
  // 获取当前定位ip 
  getCityData().then(res => {
    // 根据adcode查询天气
    getWeatherByCodeAll(res.adcode).then(res2 => {
      weatherList.value = res2.forecasts[0].casts
      weatherList.week=
      // weatherList.week.value
      console.log(weatherList.week,"2223")
      setCharts(res2.forecasts[0].casts)
      // console.log(res2.forecasts[0], "000")
      // console.log(res2.forecasts[0].casts[0].daytemp,"111")
    })
  })
  // 获取收藏列表
  getCollectList()


});

// 跳转页面并带上参数
const toDetail = (row) => {
  window.location.href = window.location.origin + `/search?adcode=${row.adcode}&cityname=${row.city}`
}

//  设置图标数据
const setCharts = (data) => {

  let charts = echart.init(document.getElementById('charts'))
  let option = {

    // backgroundColor: '#323a5e',
    grid: {
      left: '3%',
      right: '9%',
      bottom: '11%',
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


const caozuo = (row, type, index) => {
  // 查看
  if (type == 1) {
    window.location.href = window.location.origin + `/search?adcode=${row.adcode}&cityname=${row.cityname}`
  }
  else {
    console.log();

    localStorage.setItem('collectList', JSON.stringify(collectList.value.filter(q => q.adcode != row.adcode)))
    getCollectList()
  }
}

const current = ref(0)

</script>

<style lang="scss" scoped>
.weathercanvas {
  display: flex;
  justify-content: center;
}

.btn {
  animation: animationName 1s ease;
}

@keyframes animationName {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

.aaaa {
  animation: animationName 1s ease;
}

#charts {
  width: 100%;
  height: 200px;
  background: transparent;
}

// 开始进入
.move-enter {
  margin-top: 5rem;
  width: 0;
}

// 进入中的过程
.move-enter-active {
  transition: all 2s;
}


// 进入完毕
.move-enter-to {
  margin-top: 0px;
}

// 离开完毕
.move-leave-to {
  display: none;
}
</style>
