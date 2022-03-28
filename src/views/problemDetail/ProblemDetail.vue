<template>
  <div class="h100 of-y">
    <van-tabs
      color="#01a7f0"
      type="card"
      v-model:active="active"
      @click-tab="onClickTab"
    >
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
import { ref, provide, reactive, toRefs } from "vue";
import { Toast } from "vant";
import MobileOrder from "./mobileOrder/MobileOrder.vue";
import TowerOrder from "./towerOrder/TowerOrder.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { postAction } from "/@api/api";

export default {
  components: {
    MobileOrder,
    TowerOrder,
  },
  setup() {
    const state = reactive({data: {Data_Wo_Son_WangYoulist: []}})
    const active = ref(0);
    const onClickTab = () => {}

    const route = useRoute();
    const store = useStore();
    const loadDetail = () => {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      postAction("/Wo/App/WeChatWo/GetTheDataWeChat", {
        id: route.query.id,
        openid: store.state.openId,
      })
        .then((res) => {
          if (res.Success) {
            console.log(res);
            state.data = res.Data
          }
          Toast.clear();
        })
        .catch(() => {
          Toast.clear();
        });
    };

    provide('dataSource', state) 
    provide('loadDetail', loadDetail)

    loadDetail();
    return {
      ...toRefs(state),
      active,
      onClickTab,
    };
  },
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
