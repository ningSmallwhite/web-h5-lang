<template>
  <div class="h100 of-y">
    <p v-if="isRegister" class="reg-info bg-white pl5">用户注册</p>
    <p v-else class="reg-info bg-white pl5">用户信息维护</p>
    <!-- <RegisterInfo /> -->
    <div>
      <p class="base-info">基础信息</p>
      <van-form label-width="7em" ref="formRef">
        <van-cell-group inset>
          <van-field
            label="姓名："
            v-model="username"
            required
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请输入姓名' }]"
          />
          <van-field
            label="手机号码："
            v-model="phone"
            required
            placeholder="请输入手机号"
            :rules="[{ validator: vPhone, message: '请输入手机号' }]"
          />

          <p class="base-info">业务信息</p>
          <van-field
            label="所属专业："
            v-model="major"
            required
            placeholder="请输入所属专业"
            :rules="[{ required: true, message: '请输入所属专业' }]"
          />
          <van-field
            label="分公司类别："
            v-model="company"
            required
            placeholder="请输入分公司类别："
            :rules="[{ required: true, message: '请输入分公司类别' }]"
          />
          <van-field
            label="区域类别："
            v-model="region"
            required
            placeholder="请输入区域类别"
            :rules="[{ required: true, message: '请输入区域类别' }]"
          />
          <van-field
            label="网格类别："
            v-model="gridding"
            required
            placeholder="请输入网格类别"
            :rules="[{ required: true, message: '请输入网格类别' }]"
          />
          <van-field
            v-model="sms"
            center
            clearable
            required
            label="短信验证码"
            placeholder="请输入短信验证码"
            :rules="[{ required: true, message: '请输入短信验证码' }]"
          >
            <template #button>
              <van-button
                size="small"
                color="#01a7f0"
                :loading="loadMsg"
                @click="getMessage"
                >发送验证码 <span>({{ megCount }})</span></van-button
              >
            </template>
          </van-field>
        </van-cell-group>
      </van-form>

      <div style="margin: 16px 0;" v-if="isRegister">
        <van-button block color="#01a7f0" @click="submit">
          确认注册
        </van-button>
      </div>
      <template v-else>
        <div style="margin: 16px 0;" v-if="isEdit">
          <van-row gutter="10">
            <van-col span="12">
              <van-button block color="#01a7f0" @click="editSubmit">
                确认修改
              </van-button>
            </van-col>
            <van-col span="12">
              <van-button block color="#01a7f0" @click="isEdit = false">
                返回
              </van-button></van-col
            >
          </van-row>
        </div>
        <div style="margin: 16px 0;" v-else>
          <van-row gutter="10">
            <van-col span="12">
              <van-button block color="#01a7f0" @click="editInfo">
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
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { Toast } from "vant";
import { useRoute, useRouter } from "vue-router";
import { verifyPhone } from "/@utils/toolsValidate";
import { getAction } from "/@api/api";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    // 控制显示注册还是用户信息
    const isRegister = computed(() => {
      return route.fullPath == "/register" ? true : false;
    });

    const isEdit = ref(false);

    const username = ref("");
    const phone = ref("");
    const major = ref("");
    const company = ref("");
    const region = ref("");
    const gridding = ref("");
    const sms = ref("");
    const loadMsg = ref(false);
    const megCount = ref(30);
    // 获取短信验证码
    const getMessage = () => {
      loadMsg.value = true;
      getAction("/message", { a: 1 })
        .then(res => {
          if (res.success) {
          }
        })
        .catch(err => {
          setTimeout(() => {
            loadMsg.value = false;
          }, 500);
        });
    };

    // 校验函数返回 true 表示校验通过，false 表示不通过
    const vPhone = val => verifyPhone(val);
    // 修改信息
    const editInfo = () => {
      console.log(isEdit);
      isEdit.value = true;
    };
    // 确认修改
    const editSubmit = () => {
      // isEdit.value = false
      console.log("formRef", formRef);
      formRef.value.validate().then(err => {
        console.log(err);
        if (!err) {
          // 提交
          Toast.success('修改成功')
        }
      });
    };

    const formRef = ref();

    const submit = values => {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });

      console.log("values", values);
      setTimeout(() => {
        Toast.clear();
      }, 500);
    };

    return {
      isRegister,
      isEdit,
      username,
      phone,
      vPhone,
      major,
      company,
      region,
      gridding,
      sms,
      submit,
      editInfo,
      editSubmit,
      formRef,
      getMessage,
      loadMsg,
      megCount
    };
  }
};
</script>

<style scoped>
.reg-info {
  padding: 0.5rem 0;
  font-size: 0.9rem;
}

.base-info {
  height: 2rem;
  line-height: 2rem;
  padding: 0 5px;
  background: rgb(1 167 240);
}
</style>
