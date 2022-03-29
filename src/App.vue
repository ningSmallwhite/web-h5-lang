<template>
  <div>
    <!-- <Header /> -->
    <van-nav-bar
      :left-arrow='route.matched.showBack'
      title="润建股份网络运营服务平台"
      @click-left="onClickLeft"
    />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
// import Header from "/@comp/public/Header.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute()
const onClickLeft = () => {
  router.go(-1);
};



// 进入就运行
// hadOpenId();
</script>

<style></style>
