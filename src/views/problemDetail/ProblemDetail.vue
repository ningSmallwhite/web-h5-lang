<template>
  <div class="h100 of-y">
    <van-tabs
      color="#01a7f0"
      type="card"
      :sticky="true"
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
    <div class="back-btn" @click="goBack">返回</div>
  </div>
</template>

<script>
import { ref, provide, reactive, toRefs } from "vue";
import { Toast } from "vant";
import MobileOrder from "./mobileOrder/MobileOrder.vue";
import TowerOrder from "./towerOrder/TowerOrder.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { postAction } from "/@api/api";

export default {
  components: {
    MobileOrder,
    TowerOrder,
  },
  setup() {
    const state = reactive({ data: { Data_Wo_Son_WangYoulist: [] } });
    const active = ref(0);
    const onClickTab = () => {};

    const router = useRouter();
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
            state.data = res.Data;
          }
        })
        .catch(() => {
          // Toast.clear();
        });
    };

    provide("dataSource", state);
    provide("loadDetail", loadDetail);

    loadDetail();
    const goBack = () => {
      router.go(-1);
    };
    return {
      ...toRefs(state),
      active,
      onClickTab,
      goBack,
      loadDetail,
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
:root {
  --van-tabs-card-height: 40px;
}

.back-btn {
  position: fixed;
  bottom: 40px;
  right: 30px;
  width: 40px;
  justify-content: center;
  height: 40px;
  font-size: 14px;
  background: rgb(17 130 228 / 65%);
  display: flex;
  align-items: center;
  color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.4);
}
</style>
