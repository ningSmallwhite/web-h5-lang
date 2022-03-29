<template>
  <div class="h100 of-y">
    <p class="base-info">基础信息</p>
    <van-form ref="formRef">
      <van-cell-group inset>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          label="基站名称："
          v-model="formData.SiteName"
          name="SiteName"
          required
          placeholder="请输入基站名称"
          :rules="[{ required: true, message: '请输入基站名称' }]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          label="专业类型："
          v-model="formData.MojorType"
          name="MojorType"
          required
          placeholder="请输入专业类型"
          :rules="[{ required: true, message: '请输入专业类型' }]"
        />
        <van-field
          label="隐患类型："
          v-model="formData.FaultType"
          name="FaultType"
          placeholder="请输入隐患类型"
          required
          :rules="[{ required: true, message: '请输入隐患类型' }]"
        />
        <van-field
          v-model="formData.FaultRemark"
          rows="3"
          autosize
          label="隐患说明："
          type="textarea"
          placeholder="请输入隐患说明"
          required
          :rules="[{ required: true, message: '请输入隐患说明' }]"
        />
      </van-cell-group>
    </van-form>
    <p class="base-info">拍照上传</p>
    <van-row align="center" gutter="10">
      <van-uploader
        class="mt10"
        :after-read="afterRead"
        :before-delete="beforeDelete"
        v-model="fileList"
        multiple
      />
    </van-row>
    <div class="mt20">
      <van-button block color="#01a7f0" @click="onSubmit"> 提交 </van-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, unref } from "vue";
import { Toast } from "vant";
import { postAction } from "/@api/api";
import { useStore } from "vuex";

export default {
  setup() {
    const formData = reactive({
      SiteName: "",
      MojorType: "",
      FaultType: "",
      FaultRemark: "",
    });
    const store = useStore();
    const formRef = ref();

    const fileList = ref([]);
    let urlArr = [];
    const afterRead = (file) => {
      let fd = new FormData();
      fd.append("formFile", file.file);
      Toast.loading({
        forbidClick: true,
        duration: 0,
        message: "上传中...",
      });

      postAction("/Wo/App/WeChatWo/UploadFileByForm", fd)
        .then((res) => {
          file.status = res.status;

          if (res.status == "done") {
            urlArr.push(res.url);
          }
          Toast.clear();
        })
        .catch(() => {
          Toast.clear();
        });
    };

    const beforeDelete = (file, index) => {
      urlArr.splice(index, 1);
      return true;
    };

    const onSubmit = () => {
      formRef.value.validate().then((err) => {
        if (urlArr.length == 0) {
          return Toast.fail("请上传图片");
        }
        const obj = Object.assign({}, formData);
        obj.County = store.state.userInfo.County;
        obj.Grid = store.state.userInfo.Grid;
        obj.ImgURL = urlArr.join(",");
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        postAction("/Data_Manage/Data_ProPools/SaveData_ProPools", obj).then(
          (res) => {
            if (res.Success) {
              Toast.success(res.Msg);
              formData.SiteName = "";
              formData.MojorType = "";
              formData.FaultType = "";
              formData.FaultRemark = "";
              urlArr = [];
              fileList.value = [];
            } else {
              Toast.fail(res.Msg);
            }
            // Toast.clear();
          }
        );
      });
    };

    return {
      formRef,
      fileList,
      onSubmit,
      afterRead,
      formData,
      beforeDelete,
    };
  },
};
</script>

<style scope>
.base-info {
  height: 2rem;
  line-height: 2rem;
  font-size: 0.9rem;
  padding: 0 5px;
  background: rgb(1 167 240);
}
</style>
