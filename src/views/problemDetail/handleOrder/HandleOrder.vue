<template>
  <van-popup position="bottom" closeable round :style="{ height: '99%' }" v-model:show="showPopover">
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
      <van-uploader class="mt10" v-model="fileList" multiple />
    </van-row>
    <div class="po-f bot-0 w100">
      <van-button block color="#01a7f0" @click="onSubmit">
        提交
      </van-button>
    </div>
  </van-popup>
</template>

<script>
import { ref } from "vue";
import { Toast } from "vant";

export default {
  setup() {
    const message = ref("");

    const showPopover = ref(false);
    const fileList = ref([
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      { url: 'https://cloud-image', isImage: true },
    ]);

    const onSubmit = () => {
      if (!message.value) {
        Toast('请输入故障说明')
      }
    }
    return {
      message,
      showPopover,
      fileList,
      onSubmit
    };
  }
};
</script>

<style scope>
.base-info {
  height: 2rem;
  line-height: 2rem;
  padding: 0 5px;
  background: #d3d3d3;
}

.bot-0 {
  bottom: 0;
}
</style>
