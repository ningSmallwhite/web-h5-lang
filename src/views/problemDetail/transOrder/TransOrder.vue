<template>
  <van-popup position="bottom" closeable round :style="{ height: '99%' }" v-model:show="showPopover">
    <!-- <p class="base-info">基础信息</p> -->
    <van-form @failed="onFailed">
      <van-cell-group inset>
        <van-field
          label="转派人："
          name="pattern"
          placeholder="转派人"
          :rules="[{ pattern, message: '请输入正确内容' }]"
          v-model="value1"
        />
        <van-field
          label="受理人："
          name="pattern"
          placeholder="受理人"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="message"
          rows="3"
          autosize
          label="转派原因："
          type="textarea"
          placeholder="转派原因"
        />
      </van-cell-group>
    </van-form>
    
    <div class="po-f bot-0 w100">
      <van-button block color="#01a7f0" native-type="submit">
        提交回单
      </van-button>
    </div>
  </van-popup>
</template>

<script>
import { ref } from "vue";
import { Toast } from "vant";

export default {
  setup(props) {
    console.log("props",props);
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

.bot-0 {
  bottom: 0;
}
</style>
