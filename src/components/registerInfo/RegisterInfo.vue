<template>
  <div>
    <p class="base-info">基础信息</p>
    <van-form @failed="onFailed">
      <van-cell-group inset>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          label="姓    名："
          v-model="value1"
          name="pattern"
          placeholder="正则校验"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          label="手机号码："
          v-model="value2"
          name="validator"
          placeholder="函数校验"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
      </van-cell-group>
      <!-- <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div> -->
    </van-form>

    <p class="base-info">业务信息</p>
    <van-form @failed="onFailed">
      <van-cell-group inset>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          label="所属专业："
          v-model="value1"
          name="pattern"
          placeholder="正则校验"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          label="分公司类别："
          v-model="value2"
          name="validator"
          placeholder="函数校验"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          label="区域类别："
          v-model="value2"
          name="validator"
          placeholder="函数校验"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          label="网格类别："
          v-model="value2"
          name="validator"
          placeholder="函数校验"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button size="small" color="#01a7f0">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </van-form>

    <div style="margin: 16px 0;">
      <van-button block color="#01a7f0" native-type="submit">
        确认注册
      </van-button>
    </div>
    <div style="margin: 16px 0;">
      <van-row gutter="10">
        <van-col span="12">
          <van-button block color="#01a7f0">
            修改信息
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button block color="#EC808D">
            注销用户
          </van-button></van-col
        >
      </van-row>
    </div>
    <div style="margin: 16px 0;">
      <van-row gutter="10">
        <van-col span="12">
          <van-button block color="#01a7f0">
            确认修改
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button block color="#01a7f0" >
            返回
          </van-button></van-col
        >
      </van-row>
    </div>
  </div>
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
    const sms = ref("");
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

    return {
      value1,
      value2,
      value3,
      value4,
      pattern,
      onFailed,
      validator,
      sms,
      asyncValidator
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
