<template>
  <div class="h100 of-y">
    <van-tabs color='#01a7f0' type="card" v-model:active="active" @click-tab="onClickTab">
      <van-tab title="移动类工单">
        <MobileOrder />
      </van-tab>
      <van-tab title="铁塔类工单">
        <TowerOrder />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import { Toast } from "vant";
import MobileOrder from "./mobileOrder/MobileOrder.vue";
import TowerOrder from "./towerOrder/TowerOrder.vue";

export default {
  components: {
    MobileOrder,
    TowerOrder
  },
  setup() {
    const active = ref(0);
    const onClickTab = () => Toast("22");
    return {
      active,
      onClickTab
    };
  }
};
</script>

<style scope>
.van-tabs__nav.van-tabs__nav--card {
  margin: 0;
  /* --van-tabs-nav-background-color: blue; */
}

.tab-cla {
  background: greenyellow;
}
</style>
