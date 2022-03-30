<template>
  <div>
    <van-empty
      v-if="data.Data_Wo_Son_Faultlist.length == 0"
      description="暂无数据"
    />
    <div
      class="li-item1"
      v-for="item in data.Data_Wo_Son_Faultlist"
      :key="item.Id"
    >
      <p>
        <span>处理人/部门：</span>
        <span>{{ item.HandleMan }}</span>
      </p>
      <p>
        <span>处理人电话：</span>
        <span>{{ item.Tel }}</span>
      </p>
      <p>
        <span>派单时间：</span>
        <span>{{ item.SendTime }}</span>
      </p>
      <p>
        <span>时限（分钟）：</span>
        <span>{{ item.TimeLimit }}</span>
      </p>
      <p>
        <span>故障设备类型：</span>
        <span>{{ item.FalutType }}</span>
      </p>
      <p>
        <span>告警状态：</span>
        <span>{{ item.WoStatus }}</span>
      </p>
      <p>
        <span>告警描述：</span>
        <span>{{ item.FaultRemark }}</span>
      </p>
      <p>
        <span>站址运维ID：</span>
        <span>{{ item.OperationID }}</span>
      </p>
      <p>
        <span>站址名称：</span>
        <span>{{ item.SiteName }}</span>
      </p>
      <p>
        <span>工单历时（分钟）：</span>
        <span>{{ item.TimeTake }}</span>
      </p>
      <p>
        <span>告警时间：</span>
        <span>{{ item.AlarmTime }}</span>
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
      handleRef.value.openPop(item, "/Wo/App/WeChatWo/SaveData_Wo_Son_Fault");
    };

    const transRef = ref();
    const transResolve = () => {
      transRef.value.openPop(data.data.WoType);
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
