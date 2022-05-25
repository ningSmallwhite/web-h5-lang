<template>
  <div>
    <van-empty
      v-if="data.Data_Wo_Son_Checklist.length == 0"
      description="暂无数据"
    />
    <div
      class="li-item1"
      v-for="item in data.Data_Wo_Son_Checklist"
      :key="item.Id"
    >
      <p>
        <span>计划名称：</span>
        <span>{{ item.PlanName }}</span>
      </p>
      <p>
        <span>专业：</span>
        <span>{{ item.Major }}</span>
      </p>
      <p>
        <span>计划执行时间：</span>
        <span>{{ item.ExecuteTime }}</span>
      </p>
      <p>
        <span>站址编码：</span>
        <span>{{ item.SiteCode }}</span>
      </p>
      <p>
        <span>站址名称：</span>
        <span>{{ item.SiteName }}</span>
      </p>
      <p>
        <span>状态：</span>
        <span>{{ item.Status }}</span>
      </p>
      <van-row gutter="10">
        <van-col span="12">
          <van-button
            block
            plain
            hairline
            size="small"
            color="#01a7f0"
            @click="handleResolve(item)"
          >
            工单处理
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button
            block
            plain
            hairline
            size="small"
            color="#01a7f0"
            @click="transResolve(item)"
          >
            工单转派
          </van-button></van-col
        >
      </van-row>
    </div>

    <HandleOrder ref="handleRef" />
    <TransOrder ref="transRef" />
  </div>
</template>

<script>
import { ref, inject, toRefs } from "vue";
import HandleOrder from "../handleOrder/HandleOrder.vue";
import TransOrder from "../transOrder/TransOrder.vue";

export default {
  components: {
    HandleOrder,
    TransOrder,
  },
  setup() {
    const data = inject("dataSource");
    const handleRef = ref();
    const handleResolve = (item) => {
      handleRef.value.openPop(item, "/Wo/App/WeChatWo/SaveData_Wo_Son_Check");
    };

    const transRef = ref();
    const transResolve = () => {
      transRef.value.openPop('巡检');
    };

    return {
      ...toRefs(data),
      handleResolve,
      handleRef,
      transRef,
      transResolve,
    };
  },
};
</script>

<style scope>
.li-item1 {
  background: #fff;
  padding: 8px;
  margin: 8px 0;
  border-radius: 4px;
  margin-bottom: 5px;
}

.li-item1 p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
