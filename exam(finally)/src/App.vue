<template>
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <myHeader />
    <!-- 路由出口展示 -->
    <router-view></router-view>
  </div>
  <div class="fixed z-20 w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 text-black divTip" style="display: none;">
    <div class="p-4 bg-white self-start mt-32 max-w-screen-md">
      <h2>关于</h2>
      <p class="text-xs mb-4">这个应用可以用来追踪你选择城市的当前天气</p>
      <h2>如何使用:</h2>
      <p class="text-xs mb-4">
         1.点击搜索框输入你希望追踪的城市
         <br>
         2.在搜索结果中选中一个城市，你将获取当地最新的天气
         <br>
         3.点击右侧的＋号可以将追踪城市的天气情况保存在首页 
      </p>
      <h2>移除城市:</h2>
      <p class="text-xs"> 如果你不想在首页关注某个城市,可以通过底部的按钮删
        <br>
        除它
      </p>
      <button @click="close" class="text-white mt-8 bg-weather-primary py-2 px-6 text-xs">关闭</button>
    </div>
  </div>
</template>

<script setup>
import myHeader from './components/myHeader.vue';


function close() {
 document.querySelector(".divTip").style.display = "none"

 }
</script>

<style lang="scss" >

</style>