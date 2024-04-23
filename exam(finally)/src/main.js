
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./main.css";
import * as echarts from "echarts"
import vcharts from "vue-echarts";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("v-chart", vcharts);
app.mount('#app')
