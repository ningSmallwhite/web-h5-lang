<template>
  <div>
    <van-tabs color="#01a7f0" v-model:active="active">
      <van-tab title="网优工单">
        <NetworkOrder />
      </van-tab>
      <van-tab title="无线工单">
        <WuxianOrder />
      </van-tab>
      <van-tab title="临时工单">
        <LinshiOrder />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import NetworkOrder from "./NetworkOrder.vue";
import WuxianOrder from "./WuxianOrder.vue";
import LinshiOrder from "./LinshiOrder.vue";

export default {
  components: {
    NetworkOrder,
    WuxianOrder,
    LinshiOrder,
  },
  setup() {
    const active = ref(0);
    return { active };
  },
};
</script>

<style></style>
