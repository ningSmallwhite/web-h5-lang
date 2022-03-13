<template>
  <div class="h100 of-y">
    <p class="base-info">基础信息</p>
    <van-form ref='formRef'>
      <van-cell-group inset>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          label="基站名称："
          v-model="name"
          name="name"
          required
          placeholder="请输入基站名称"
          :rules="[{ required: true, message: '请输入基站名称' }]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          label="专业类型："
          v-model="type"
          name="type"
          required
          placeholder="请输入专业类型"
          :rules="[{ required: true, message: '请输入专业类型' }]"
        />
        <van-field
          label="隐患类型："
          v-model="protype"
          name="protype"
          placeholder="请输入隐患类型"
          required
          :rules="[{ required: true, message: '请输入隐患类型' }]"
        />
        <van-field
          v-model="message"
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
      <van-uploader class="mt10" v-model="fileList" multiple />
    </van-row>
    <div class="mt20">
      <van-button block color="#01a7f0" @click="onSubmit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Toast } from "vant";

export default {
  setup() {
    const name = ref("");
    const type = ref("");
    const protype = ref("");
    const message = ref("");

    const formRef = ref()

    const fileList = ref([
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      { url: 'https://cloud-image', isImage: true },
    ]);

    const onSubmit = () => {
      formRef.value.validate().then(err => {
        console.log(err)
      })
    }

    return {
      name,
      type,
      protype,
      formRef,
      message,
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
  background: rgb(1 167 240);
}
</style>
