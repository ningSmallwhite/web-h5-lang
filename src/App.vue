<template>
  <div>
    <!-- <Header /> -->
    <van-nav-bar
      left-arrow
      title="润建股份网络运营服务平台"
      @click-left="onClickLeft"
    />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import Header from "/@comp/public/Header.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const onClickLeft = () => {
  router.go(-1);
};

// router.push('/register')
</script>

<style></style>
