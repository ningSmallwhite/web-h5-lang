<template>
  <div class="h100 of-y">
    <p class="reg-info bg-white pl5">用户信息维护</p>
    <!-- <RegisterInfo /> -->
    <div>
      <p class="base-info">基础信息</p>
      <van-form label-width="7em" ref="formRef">
        <van-cell-group inset>
          <van-field
            label="姓名："
            v-model="formData.UserName"
            :readonly="!isEdit"
            required
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请输入姓名' }]"
          />
          <van-field
            label="手机号码："
            v-model="formData.Tel"
            required
            :readonly="!isEdit"
            placeholder="请输入手机号"
            :rules="[{ validator: vPhone, message: '请输入手机号' }]"
          />

          <p class="base-info">业务信息</p>
          <van-field
            label="所属专业："
            :disabled="!isEdit"
            readonly
            v-model="formData.WoType"
            required
            placeholder="请选择所属专业"
            :rules="[{ required: true, message: '请选择所属专业' }]"
            @click="
              () => {
                isEdit ? (showPickerWoType = true) : '';
              }
            "
          />
          <van-field
            label="分公司类别："
            readonly
            :disabled="!isEdit"
            v-model="formData.City"
            required
            placeholder="请选择分公司类别"
            :rules="[{ required: true, message: '请选择分公司类别' }]"
            @click="
              () => {
                isEdit ? (showPickerCity = true) : '';
              }
            "
          />
          <van-field
            label="区域类别："
            :disabled="!isEdit"
            readonly
            v-model="formData.County"
            required
            placeholder="请选择区域类别"
            :rules="[{ required: true, message: '请选择区域类别' }]"
            @click="
              () => {
                isEdit ? (showPickerCounty = true) : '';
              }
            "
          />
          <van-field
            label="网格类别："
            :disabled="!isEdit"
            readonly
            v-model="formData.Grid"
            required
            placeholder="请选择网格类别"
            :rules="[{ required: true, message: '请选择网格类别' }]"
            @click="
              () => {
                isEdit ? (showPickerGrid = true) : '';
              }
            "
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
          @Fn="showPickerWoType = false"
        />
      </van-popup>
      <!-- 分公司类别 -->
      <van-popup v-model:show="showPickerCity" position="bottom">
        <van-picker
          :columns="columnObj.com"
          :columns-field-names="{ text: 'value', value: 'value' }"
          @confirm="onConfirmCity"
          @Fn="showPickerCity = false"
        />
      </van-popup>
      <!-- 区域 -->
      <van-popup
        :style="{ height: '30%' }"
        v-model:show="showPickerCounty"
        position="bottom"
      >
        <div class='van-picker__toolbar'>
          <button class='van-picker__cancel van-haptics-feedback' @click="showPickerCounty = false">取消</button>
          <button class="van-picker__confirm van-haptics-feedback" @click="onConfirmCounty">确认</button>
        </div>
        <van-checkbox-group v-model="checked">
          <van-cell-group inset>
            <van-cell
              v-for="(item, index) in columnObj.area"
              clickable
              :key="item.value"
              :title="item.value"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  :name="item.value"
                  :ref="(el) => (checkboxRefs[index] = el)"
                  @click.stop
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-popup>
      <!-- 网格 -->
      <van-popup v-model:show="showPickerGrid" position="bottom">
        <van-picker
          :columns="columnObj.grid"
          :columns-field-names="{ text: 'value', value: 'value' }"
          @confirm="onConfirmGrid"
          @Fn="showPickerGrid = false"
        />
      </van-popup>
    </div>

    <div
      style="margin: 16px 0px; position: fixed; bottom: 0; width: 100%"
      v-if="isEdit"
    >
      <van-row gutter="10">
        <van-col span="12">
          <van-button block color="#01a7f0" @click="editSubmit">
            确认修改
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button block color="#01a7f0" @click="cancelFn">
            返回
          </van-button></van-col
        >
      </van-row>
    </div>
    <div
      style="margin: 16px 0px; position: fixed; bottom: 0;left: 0; width: 100%"
      v-else
    >
      <van-row gutter="10">
        <van-col span="12">
          <van-button block round color="#01a7f0" @click="editInfo">
            修改信息
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button block round type="danger" @click="logout">
            注销用户
          </van-button></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { verifyPhone } from "/@utils/toolsValidate";
import { postAction } from "/@api/api";
import { useStore } from "vuex";
import { Session, Local } from "/@utils/storage";

const router = useRouter();
const store = useStore();

const isEdit = ref(false);

let formData = reactive({
  UserName: "",
  Tel: "",
  WoType: "",
  City: "",
  County: "",
  Grid: "",
});
// 区域选择
const checked = ref([]);
const checkboxRefs = ref([]);

const loadUserInfo = () => {
  postAction("/Data_Manage/WeChat_User/GetWeChat_User", {
    openid: store.state.openId,
  }).then(async (res) => {
    if (res.Success) {
      formData.Id = res.Data.Id;
      formData.UserName = res.Data.UserName;
      formData.Tel = res.Data.Tel;
      formData.WoType = res.Data.WoType;
      formData.City = res.Data.City;
      formData.County = res.Data.County;
      // 选择框回显
      checked.value = res.Data.County.split(',')
      formData.Grid = res.Data.Grid;
      Local.set("userInfo", res.Data || {});
      store.dispatch("setUserData", res.Data);
      loadOptR();
    }
  });
};
loadUserInfo();
// 校验函数返回 true 表示校验通过，false 表示不通过
const vPhone = (val) => verifyPhone(val);
// 修改信息
const editInfo = () => {
  isEdit.value = true;
};

const formRef = ref();
// 修改
const editSubmit = (values) => {
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
            loadUserInfo();
            isEdit.value = false;
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
const cancelFn = () => {
  isEdit.value = false
  loadUserInfo()
}
// 注销
const logout = () => {
  formRef.value.validate().then((err) => {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    if (!err) {
      // 提交
      const obj = {};
      obj.id = formData.Id;
      obj.openId = store.state.openId;
      postAction(
        "/Data_Manage/WeChat_User/CancelWeChat_User" +
          `?id=${formData.Id}&openId=${store.state.openId}`,
        obj
      )
        .then((res) => {
          if (res.Success) {
            Toast.success(res.Msg);
            Session.clear();
            Local.clear();
            router.replace("/logOut");
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
    checked.value = []
    checkboxRefs.value = []
    columnObj.area = []
    columnObj.grid = []
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
    checked.value = []
    checkboxRefs.value = []
    columnObj.grid = []
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
const toggle = (index) => {
  checkboxRefs.value[index].toggle();
};

const showPickerCounty = ref(false);
const onConfirmCounty = () => {
  if (checked.value.length == 0) {
    return Toast('请选择区域')
  }
  const val = checked.value.join(',')
  if (val != formData.County) {
    formData.Grid = "";
  }
  formData.County = val;
  showPickerCounty.value = false;
  loadOpt(
    {
      level: 3,
      Line: formData.WoType,
      CompanyType: formData.City,
      AreaType: val,
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

const loadOptR = () => {
  loadOpt(
    {
      level: 0,
      Line: "",
      CompanyType: "",
      AreaType: "",
    },
    "line"
  );
  loadOpt(
    {
      level: 1,
      Line: formData.WoType,
      CompanyType: "",
      AreaType: "",
    },
    "com"
  );
  loadOpt(
    {
      level: 2,
      Line: formData.WoType,
      CompanyType: formData.City,
      AreaType: "",
    },
    "area"
  );
  loadOpt(
    {
      level: 3,
      Line: formData.WoType,
      CompanyType: formData.City,
      AreaType: formData.County,
    },
    "grid"
  );
};
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
