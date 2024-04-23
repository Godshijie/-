import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCityData, getWeatherData } from "../api/index";

export const useCounterStore = defineStore('counter', () => {
  let cityData = ref({});
  async function api1(row) {
    cityData.value = row
  }

  return { cityData, api1 }
})
