<template>
  <header class="bg-weather-primary shadow-lg sticky top-0 z-10">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <a href="/" class="router-link-active router-link-exact-active">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">新中地天气</p>
        </div>
      </a>
      <div class="flex gap-4 items-center">
        <h4 class="text-lg">{{ addresss.city }}</h4>
        <span class="text-sm">
          {{ `实时天气：${weatherData.weather || '-'} ${weatherData.temperature ||
            '0'}℃ ${weatherData.winddirection || '-'}风${weatherData.windpower || '≤3'}级` }}</span>
      </div>
      <div class="flex gap-3 flex-1 justify-end">
        <i @click="tip()" class="fa-solid fa-circle-info text-xl hover:text-weather-secondary cursor-pointer duration-1000 tip"></i>
        <i v-if="show" @click="add"
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
      </div>
    </nav>
  </header>
</template>

<script setup>

import { onMounted, ref, computed } from 'vue';
import { getCityData, getWeatherByCode, } from '../api';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();
import { useRoute } from 'vue-router'
const route = useRoute();



const addresss = ref({});

const weatherData = ref({});


onMounted(() => {
  // 获取当前定位ip
  getCityData().then(res => {
    addresss.value = res
    console.log(res,9988)
    // 根据adcode查询天气
    getWeatherByCode(res.adcode).then(res2 => {
      if (res2.info === 'OK') {
        // 取第一条数据 
        weatherData.value = res2.lives[0]
        console.log(res2.lives[0], 999)
      }
    })
  })
  setTimeout(() => {
    if (route.query.adcode) {
      getCollectList()
    }
  }, 1000);
})
// +号的起始状态是隐藏，只有显示天气数据列表之后，show变为true时才会显示+号
const show = ref(false)


const collectList = ref([])

// 获取收藏列表
function getCollectList(){

  let data = localStorage.getItem('collectList')
  if (data) {
    collectList.value = JSON.parse(data)
  }

  let res = collectList.value.map(q => q.adcode).includes(counterStore.cityData.adcode)

  show.value = !res
}





// add方法，将api数据存储到本地仓库，添加到收藏
const add = () => {
  localStorage.setItem('collectList', JSON.stringify([...collectList.value, counterStore.cityData]))
  show.value = false
  getCollectList()
}

// tip提示信息
function tip() {
  document.querySelector(".divTip").style.display="flex"
}

</script>

<style lang="scss" scoped>
.tip:hover{
  background-color: transparent;
}
</style>