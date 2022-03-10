<template>
  <div>
    <div class="li-item">
      <p>
        <span>通报类型：</span>
        <span>广西南宁</span>
      </p>
      <p>
        <span>基站名：</span>
        <span>反对法</span>
      </p>
      <p>
        <span>小区名：</span>
        <span>广西南宁</span>
      </p>
      <p>
        <span>告警名称：</span>
        <span>广西南宁</span>
      </p>
      <p>
        <span>告警时间：</span>
        <span>广西南宁</span>
      </p>
      <p>
        <span>恢复时间：</span>
        <span>广西南宁</span>
      </p>
    </div>

    <div style="margin: 16px 0;">
      <van-row gutter="10">
        <van-col span="12">
          <van-button block color="#01a7f0" @click="handleResolve">
            工单处理
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button block color="#01a7f0">
            工单转派
          </van-button></van-col
        >
      </van-row>
    </div>

    <HandleOrder ref="handleRef" />
  </div>
</template>

<script>
import { ref } from "vue";
import HandleOrder from "../handleOrder/HandleOrder.vue";
export default {
  components: {
    HandleOrder
  },
  setup() {
    const handleRef = ref();

    const handleResolve = () => {
      console.log(handleRef);
      handleRef.value.showPopover = true;
    };

    return {
      handleResolve,
      handleRef
    }
  }
};
</script>

<style scope>
.li-item {
  background: #fff;
  padding: 8px;
  margin: 8px 0;
  border-radius: 4px;
  margin-bottom: 5px;
}

.li-item p {
  margin: 5px 0;
  font-size: 0.9rem;
}
</style>
