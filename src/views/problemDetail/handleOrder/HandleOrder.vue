<template>
  <van-action-sheet style="height: 100%;" v-model:show="showPopover">
    <!-- <p class="base-info">基础信息</p> -->
    <van-form @failed="onFailed">
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="3"
          autosize
          label="故障说明："
          type="textarea"
          placeholder="请输入"
        />
      </van-cell-group>
      <!-- <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div> -->
    </van-form>
    <div class="mt10 mb10">
      <van-button class="mt5" type="default">拍照上传</van-button>
    </div>
    <van-row align="center" gutter="10">
      <van-col span="12" class="tx-c">
        <van-image
          width="8rem"
          height="6rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
      <van-col span="12" class="tx-c">
        <van-image
          width="8rem"
          height="6rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
    </van-row>
    <div class="mt20">
      <van-button block color="#01a7f0" native-type="submit">
        提交
      </van-button>
    </div>
  </van-action-sheet>
</template>

<script>
import { ref } from "vue";
import { Toast } from "vant";

export default {
  setup() {
    const value1 = ref("");
    const value2 = ref("");
    const value3 = ref("");
    const value4 = ref("");
    const message = ref("");
    const pattern = /\d{6}/;

    // 校验函数返回 true 表示校验通过，false 表示不通过
    const validator = val => /1\d{10}/.test(val);

    // 校验函数可以直接返回一段错误提示
    const validatorMessage = val => `${val} 不合法，请重新输入`;

    // 校验函数可以返回 Promise，实现异步校验
    const asyncValidator = val =>
      new Promise(resolve => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });

    const onFailed = errorInfo => {
      console.log("failed", errorInfo);
    };

    const showPopover = ref(false);

    return {
      value1,
      value2,
      value3,
      value4,
      pattern,
      onFailed,
      validator,
      message,
      asyncValidator,
      showPopover
    };
  }
};
</script>

<style scope>
.base-info {
  height: 2rem;
  line-height: 2rem;
  padding: 0 5px;
  background: rgb(1 167 240);
}
</style>
