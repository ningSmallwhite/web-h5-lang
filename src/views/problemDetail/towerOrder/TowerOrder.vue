<template>
  <div>
    <van-tabs color='#01a7f0' v-model:active="active">
      <van-tab title="故障工单">故障工单</van-tab>
      <van-tab title="巡检工单">巡检工单</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const active = ref(0);
    return { active };
  }
};
</script>

<style></style>
