<template>
  <div>
    <van-empty
      v-if="data.Data_Wo_Son_WuXianlist&&data.Data_Wo_Son_WuXianlist.length == 0"
      description="暂无数据"
    />
    <div
      class="li-item1"
      v-for="item in data.Data_Wo_Son_WuXianlist"
      :key="item.Id"
    >
      <p>
        <span>告警名称：</span>
        <span>{{ item.AlarmName }}</span>
      </p>
      <p>
        <span>小区名：</span>
        <span>{{ item.AreaName }}</span>
      </p>
      <p>
        <span>基站名：</span>
        <span>{{ item.SiteName }}</span>
      </p>
      <p>
        <span>派单时间：</span>
        <span>{{ item.SendTime }}</span>
      </p>
      <p>
        <span>受理专业：</span>
        <span>{{ item.HandleMajor }}</span>
      </p>
      <p>
        <span>恢复时间：</span>
        <span>{{ item.RecoveryTime }}</span>
      </p>
      <p>
        <span>最新回复内容：</span>
        <span>{{ item.LatestMsg }}</span>
      </p>
      <p>
        <span>优化片区：</span>
        <span>{{ item.OptimizeArea }}</span>
      </p>
      <p>
        <span>网格组长：</span>
        <span>{{ item.GridLeader }}</span>
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
import { postAction } from "../../../api/api";
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
      handleRef.value.openPop(item, "/Wo/App/WeChatWo/SaveData_Wo_Son_WuXian");
    };

    const transRef = ref();
    const transResolve = ({Id}) => {
      transRef.value.openPop('无线', Id);
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
