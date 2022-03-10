<template>
  <div class="h100 of-y">
    <van-row align="center" gutter="">
      <van-col span="12" class="tx-c">
        <van-button block :type="btnNum == 0 ?'primary' : 'default'" size="normal" class="font-b" @click="btnNum = 0">TOP-N等级 </van-button>
      </van-col>
      <van-col span="12" class="tx-c">
        <van-button block size="normal" :type="btnNum == 1 ?'primary' : 'default'" class="font-b"  @click="btnNum = 1">派单时间 </van-button>
      </van-col>
    </van-row>

    <div class="mt5">
      <van-list
        :loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="li-item" v-for="item in list" :key="item" >
          <p>
            <span class="dot red"></span>
            <span>区县：</span>
            <span>广西南宁</span>
          </p>
          <p>
            <span class="dot orange"></span>
            <span>网格：</span>
            <span>反对法</span>
          </p>
          <p>
            <span class="dot yellow"></span>
            <span>班组人员：</span>
            <span>广西南宁</span>
          </p>
          <p>
            <span class="dot green"></span>
            <span>站址名称：</span>
            <span>广西南宁</span>
          </p>
          <p>
            <span class="dot blue"></span>
            <span>站址编码：</span>
            <span>广西南宁</span>
          </p>
          <p>
            <span class="dot black"></span>
            <span>故障原因：</span>
            <span>广西南宁</span>
          </p>
          <p>
            <span class="dot purple"></span>
            <span>基站等级：</span>
            <span>广西南宁</span>
          </p>
          <p>
            <span class="dot grey"></span>
            <span>权重值：</span>
            <span>广西南宁</span>
          </p>
          <p>
            <span class="dot green1"></span>
            <span>故障数量：</span>
            <span>广西南宁</span>
          </p>
          <p v-if="btnNum == 0">
            <span class="dot green1"></span>
            <span>故障数量：</span>
            <span>43454</span>
          </p>
          <p v-else>
            <span class="dot green1"></span>
            <span>派单时间：</span>
            <span>2020-11-11 02:22:12</span>
          </p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const btnNum = ref(0);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    return {
      list,
      onLoad,
      loading,
      finished,
      btnNum
    };
  }
};
</script>

<style scope>
.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 3px;
  vertical-align: super;
  margin: 0 8px;
}
.li-item {
  background: #fff;
  padding: 8px 0;
  border-radius: 4px;
  margin-bottom: 5px;
}

.li-item p {
  margin: 5px 0;
  font-size: 0.9rem;
}

.li-item p span:last-child {
  color: #7f7f7f;
}

.green1 {
  color: #44f956;
}

.font-b {
  font-size: 1.0rem
}
</style>
