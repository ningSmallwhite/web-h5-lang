<template>
  <div>
    <van-tabs color="#01a7f0" v-model:active="active">
      <van-tab title="故障工单">
        <GuzhangOrder />
      </van-tab>
      <van-tab title="巡检工单">
        <XunjianOrder />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import GuzhangOrder from "./GuzhangOrder.vue";
import XunjianOrder from "./XunjianOrder.vue";

export default {
  components: { GuzhangOrder, XunjianOrder },
  setup() {
    const active = ref(0);
    return { active };
  },
};
</script>

<style></style>
