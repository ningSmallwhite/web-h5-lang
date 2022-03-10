<template>
  <div class='h100 of-y'>
    <p class="reg-info">用户注册</p>
    <RegisterInfo />
  </div>
</template>

<script setup>
import RegisterInfo from '/@comp/registerInfo/RegisterInfo.vue'
</script>
<style scoped>
.reg-info{
  padding: 0.5rem 0;
  font-size: 1rem;
}
</style>