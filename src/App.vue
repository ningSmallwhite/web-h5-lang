<template>
  <div>
    <!-- <Header /> -->
    <van-nav-bar title="标题" />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import Header from "/@comp/public/Header.vue";
</script>

<style></style>
