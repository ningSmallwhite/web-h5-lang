<template>
  <van-popup position="bottom" closeable round :style="{ height: '99%' }" v-model:show="showPopover">
    <!-- <p class="base-info">基础信息</p> -->
    <van-form ref=formRef>
      <van-cell-group inset>
        <van-field
          label="转派人："
          name="person"
          placeholder="转派人"
          :rules="[{ required: true, message: '请输入转派人' }]"
          v-model="person"
        />
        <van-field
          label="受理人："
          name="recive"
          placeholder="受理人"
          :rules="[{  required: true, message: '请输入受理人' }]"
          v-model="recive"
        />
        <van-field
          v-model="message"
          rows="3"
          autosize
          label="转派原因："
          type="textarea"
          placeholder="转派原因"
          :rules="[{  required: true, message: '请输入转派原因' }]"
        />
      </van-cell-group>
    </van-form>
    
    <div class="po-f bot-0 w100">
      <van-button block color="#01a7f0" @click="onSubmit">
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
    const person = ref("");
    const recive = ref("");
    const message = ref("");
    const showPopover = ref(false);

    const formRef = ref ()

    const onSubmit = () => {
      formRef.value.validate().then(err => {
        console.log(err)
      })
    }

    return {
      person,
      recive,
      message,
      showPopover,
      formRef,
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

.bot-0 {
  bottom: 0;
}
</style>
