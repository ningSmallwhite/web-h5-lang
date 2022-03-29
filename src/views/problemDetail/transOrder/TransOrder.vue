<template>
  <van-popup
    position="bottom"
    closeable
    round
    :style="{ height: '99%' }"
    v-model:show="showPopover"
    @close="close"
  >
    <van-form ref="formRef">
      <van-cell-group inset>
        <van-field
          label="转派人："
          readonly
          name="SendMan"
          placeholder="转派人"
          v-model="formData.SendMan"
        />
        <van-field
          label="受理人："
          readonly
          name="HandleMan"
          placeholder="受理人"
          :rules="[{ required: true, message: '请输入受理人' }]"
          v-model="formData.HandleMan"
          @click="showPicker = true"
        />
        <van-field
          v-model="formData.Remark"
          rows="3"
          autosize
          label="转派原因："
          type="textarea"
          placeholder="转派原因"
          :rules="[{ required: true, message: '请输入转派原因' }]"
        />
      </van-cell-group>
    </van-form>

    <van-popup v-model:show="showPicker" position="bottom">
      <van-field v-model="searchUser" label="用户名" placeholder="请输入用户名">
        <template #button>
          <van-button size="small" type="primary" @click="loadOpt(searchUser)"
            >查找</van-button
          >
        </template>
      </van-field>
      <van-picker
        :columns="columns"
        :columns-field-names="{ text: 'UserName', value: 'UserName' }"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <div class="po-f bot-0 w100">
      <van-button block round color="#01a7f0" @click="onSubmit">
        提交回单
      </van-button>
    </div>
  </van-popup>
</template>

<script>
import { ref, reactive, inject } from "vue";
import { Toast } from "vant";
import { useStore } from "vuex";
import { postAction } from "/@/api/api";
import { formateTime } from "/@utils/utils";

export default {
  setup() {
    const store = useStore();
    const showPopover = ref(false);
    const searchUser = ref("");
    const loadDetail = inject("loadDetail");

    const formData = reactive({
      SendMan: "",
      HandleMan: "",
      Remark: "",
    });

    const showPicker = ref(false);
    const formRef = ref();
    const columns = ref([{ value: "骚浪" }]);
    const onConfirm = (value) => {
      console.log(value);
      formData.HandleMan = value.UserName;
      formData.OpenId = value.OpenId;
      showPicker.value = false;
    };
    const loadOpt = (name) => {
      postAction("/Wo/App/WeChatWo/GetWoHandleMans", {
        UserName: name,
        // Tel: store.state.userInfo.Tel,
      }).then((res) => {
        if (res.Success) {
          columns.value = res.Data;
        }
      });
    };

    const onSubmit = () => {
      formRef.value.validate().then((err) => {
        if (!err) {
          Toast.loading({
            message: "加载中...",
            forbidClick: true,
          });
          let obj = Object.assign({}, formData);
          obj.SendTime = formateTime(Date.now(), "yyyy-MM-dd hh:mm:ss");
          postAction("/Wo/App/WeChatWo/SaveData_Wo_Record", obj).then((res) => {
            if (res.Success) {
              Toast.success(res.Msg);
              loadDetail();
              close()
            } else {
              Toast.fail(res.Msg);
            }
            // Toast.clear();
          });
        }
      });
    };

    const openPop = (WoFrom) => {
      showPopover.value = true;
      formData.SendMan = store.state.userInfo.UserName;
      formData.WoFrom = WoFrom;
    };

    const close = () => {
      formRef.value.resetValidation();
      showPopover.value = false;
      formData.SendMan = "";
      formData.OpenId = "";
      formData.HandleMan = "";
      formData.Remark = "";
    };
    loadOpt();
    return {
      columns,
      onConfirm,
      showPicker,
      formData,
      showPopover,
      formRef,
      onSubmit,
      openPop,
      searchUser,
      loadOpt,
      close
    };
  },
};
</script>

<style scope>
.bot-0 {
  bottom: 0;
}
</style>
