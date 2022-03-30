<template>
  <div class="h100 of-y">
    <p class="reg-info bg-w pl5">用户注册</p>
    <!-- <RegisterInfo /> -->
    <div>
      <div class="base-info">基础信息</div>
      <van-form label-width="7em" ref="formRef">
        <van-cell-group inset>
          <van-field
            label="姓名："
            v-model="formData.UserName"
            required
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请输入姓名' }]"
          />
          <van-field
            label="手机号码："
            v-model="formData.Tel"
            required
            placeholder="请输入手机号"
            :rules="[{ validator: vPhone, message: '请输入手机号' }]"
          />

          <p class="base-info">业务信息</p>
          <van-field
            label="所属专业："
            readonly
            v-model="formData.WoType"
            required
            placeholder="请选择所属专业"
            :rules="[{ required: true, message: '请选择所属专业' }]"
            @click="showPickerWoType = true"
          />
          <van-field
            label="分公司类别："
            readonly
            v-model="formData.City"
            required
            placeholder="请选择分公司类别"
            :rules="[{ required: true, message: '请选择分公司类别' }]"
            @click="showPickerCity = true"
          />
          <van-field
            label="区域类别："
            readonly
            v-model="formData.County"
            required
            placeholder="请选择区域类别"
            :rules="[{ required: true, message: '请选择区域类别' }]"
            @click="showPickerCounty = true"
          />
          <van-field
            label="网格类别："
            readonly
            v-model="formData.Grid"
            required
            placeholder="请选择网格类别"
            :rules="[{ required: true, message: '请选择网格类别' }]"
            @click="showPickerGrid = true"
          />
          <!-- <van-field
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
          </van-field> -->
        </van-cell-group>
      </van-form>
      <!-- 所属专业 -->
      <van-popup v-model:show="showPickerWoType" position="bottom">
        <van-picker
          :columns="columnObj.line"
          :columns-field-names="{ text: 'value', value: 'value' }"
          @confirm="onConfirmWoType"
          @cancel="showPickerWoType = false"
        />
      </van-popup>
      <!-- 分公司类别 -->
      <van-popup v-model:show="showPickerCity" position="bottom">
        <van-picker
          :columns="columnObj.com"
          :columns-field-names="{ text: 'value', value: 'value' }"
          @confirm="onConfirmCity"
          @cancel="showPickerCity = false"
        />
      </van-popup>
      <!-- 区域 -->
      <van-popup v-model:show="showPickerCounty" position="bottom">
        <van-picker
          :columns="columnObj.area"
          :columns-field-names="{ text: 'value', value: 'value' }"
          @confirm="onConfirmCounty"
          @cancel="showPickerCounty = false"
        />
      </van-popup>
      <!-- 网格 -->
      <van-popup v-model:show="showPickerGrid" position="bottom">
        <van-picker
          :columns="columnObj.grid"
          :columns-field-names="{ text: 'value', value: 'value' }"
          @confirm="onConfirmGrid"
          @cancel="showPickerGrid = false"
        />
      </van-popup>
    </div>
    <div
      style="margin: 16px 0px; position: fixed; bottom: 0; left: 0; width: 100%"
    >
      <van-button block round color="#01a7f0" @click="submitRegist">
        确认注册
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, toRefs } from "vue";
import { Toast } from "vant";
import { useRoute, useRouter } from "vue-router";
import { verifyPhone } from "/@utils/toolsValidate";
import { postAction } from "../api/api";
import { useStore } from "vuex";
import { Local } from "/@utils/storage";

const route = useRoute();
const router = useRouter();
const store = useStore();

const isEdit = ref(false);

const formData = reactive({
  UserName: "",
  Tel: "",
  WoType: "",
  City: "",
  County: "",
  Grid: "",
});

// 校验函数返回 true 表示校验通过，false 表示不通过
const vPhone = (val) => verifyPhone(val);
// 修改信息

const formRef = ref();
// 注册
const submitRegist = (values) => {
  formRef.value.validate().then((err) => {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    if (!err) {
      // 提交
      const obj = Object.assign({}, formData);
      obj.OpenId = store.state.openId;
      postAction("/Data_Manage/WeChat_User/SaveWeChat_User", obj)
        .then((res) => {
          if (res.Success) {
            Toast.success(res.Msg);
            Local.set("userInfo", obj);
            router.replace("/userInfo");
          } else {
            Toast.fail(res.Msg);
          }
          // Toast.clear();
        })
        .catch(() => {
          // Toast.clear();
        });
    }
  });
};

const columnObj = reactive({
  line: [],
  com: [],
  area: [],
  grid: [],
});
// 专业
const showPickerWoType = ref(false);
const onConfirmWoType = (value) => {
  if (value.value != formData.WoType) {
    formData.City = "";
    formData.County = "";
    formData.Grid = "";
  }
  formData.WoType = value.value;
  loadOpt(
    {
      level: 1,
      Line: value.value,
      CompanyType: "",
      AreaType: "",
    },
    "com"
  );
  showPickerWoType.value = false;
};

// 公司
const showPickerCity = ref(false);
const onConfirmCity = (value) => {
  if (value.value != formData.City) {
    formData.County = "";
    formData.Grid = "";
  }
  formData.City = value.value;
  showPickerCity.value = false;
  loadOpt(
    {
      level: 2,
      Line: formData.WoType,
      CompanyType: value.value,
      AreaType: "",
    },
    "area"
  );
};
// 区域
const showPickerCounty = ref(false);
const onConfirmCounty = (value) => {
  if (value.value != formData.County) {
    formData.Grid = "";
  }
  formData.County = value.value;
  showPickerCounty.value = false;
  loadOpt(
    {
      level: 3,
      Line: formData.WoType,
      CompanyType: formData.City,
      AreaType: value.value,
    },
    "grid"
  );
};
// 网格
const showPickerGrid = ref(false);
const onConfirmGrid = (value) => {
  formData.Grid = value.value;
  showPickerGrid.value = false;
};

const loadOpt = (param, name) => {
  postAction("/Data_Manage/Base_SelectBox/GetBase_SelectBoxList", param).then(
    (res) => {
      if (res.Success) {
        columnObj[name] = res.Data;
      }
    }
  );
};

loadOpt(
  {
    level: 0,
    Line: "",
    CompanyType: "",
    AreaType: "",
  },
  "line"
);
</script>

<style scoped>
.reg-info {
  padding: 10px 5px;
  font-size: 17px;
}

.base-info {
  height: 36px;
  font-size: 15px;
  padding: 0 5px;
  background: rgb(1 167 240);
  display: flex;
  align-items: center;
  color: #fff;
}
</style>
