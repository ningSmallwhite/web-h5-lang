<template>
  <van-popup
    position="bottom"
    closeable
    round
    :style="{ height: '99%' }"
    v-model:show="showPopover"
    @close="close"
  >
    <van-form>
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
    </van-form>
    <p class="base-info">拍照上传</p>
    <van-row align="center" gutter="10">
      <van-uploader
        class="mt10"
        v-model="fileList"
        multiple
        :after-read="afterRead"
        :before-delete="beforeDelete"
      />
    </van-row>
    <div class="po-f bot-0 w100">
      <van-button block round color="#01a7f0" @click="onSubmit"> 提交 </van-button>
    </div>
  </van-popup>
</template>

<script>
import { ref, inject } from "vue";
import { Toast } from "vant";
import { postAction } from "/@api/api";

export default {
  setup() {
    const message = ref("");
    let pData = {};
    const showPopover = ref(false);
    const fileList = ref([]);
    let urlArr = [];
    let handleUrl = ref("");
    const loadDetail = inject("loadDetail");

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
      if (!message.value) {
        return Toast("请输入故障说明");
      }
      if (urlArr.length == 0) {
        return Toast("请上传图片");
      }
      const obj = Object.assign({}, pData);
      obj.FaultRemark = message.value;
      obj.ImgURL = urlArr.join(",");
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      postAction(handleUrl.value, obj).then((res) => {
        if (res.Success) {
          loadDetail();
          Toast.success(res.Msg);
          close();
          // 重新请求列表
        } else {
          Toast.fail(res.Msg);
        }
        // Toast.clear();
      });
    };

    const openPop = (row, url) => {
      pData = row;
      handleUrl.value = url;
      showPopover.value = true;
    };

    const close = () => {
      message.value = "";
      urlArr = [];
      fileList.value = [];
      showPopover.value = false;
    };

    return {
      message,
      showPopover,
      openPop,
      fileList,
      onSubmit,
      afterRead,
      beforeDelete,
      close,
    };
  },
};
</script>

<style scope>
.base-info {
  height: 36px;
  font-size: 15px;
  padding: 0 5px;
  background: #d3d3d3;
  display: flex;
  align-items: center;
  color: #fff;
}

.bot-0 {
  bottom: 0;
}
</style>
