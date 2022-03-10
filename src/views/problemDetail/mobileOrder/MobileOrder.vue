<template>
  <div>
    <van-tabs color='#01a7f0' v-model:active="active">
      <van-tab title="网优工单">
        <NetworkOrder />
      </van-tab>
      <van-tab title="无线工单">无线工单</van-tab>
      <van-tab title="传输工单">传输工单</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import NetworkOrder from "./NetworkOrder.vue";

export default {
  components: {
    NetworkOrder
  },
  setup() {
    const active = ref(0);
    return { active };
  }
};
</script>

<style></style>
