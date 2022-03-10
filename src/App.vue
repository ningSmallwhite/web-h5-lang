<template>
  <div>
    <!-- <Header /> -->
    <van-nav-bar title="润建股份网络运营服务平台" />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import Header from "/@comp/public/Header.vue";
</script>

<style></style>
