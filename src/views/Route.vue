<template>
  <div>
    <router-link class='mr10' to="/register">注册</router-link>
    <router-link class='mr10' to="/userInfo">用户信息</router-link>
    <router-link class='mr10' to="/logOut">logOut</router-link>
    <router-link class='mr10' to="/problemReport">ProblemReport</router-link>
    <router-link class='mr10' to="/problemOrder">problemOrder</router-link>
    <router-link class='mr10' to="/problemDetail">ProblemDetail</router-link>
    <p @click="close">ddd</p>
  </div>
</template>
<script setup>
const close = () => {
  WeixinJSBridge.call('closeWindow');
}
</script>

<style scope>
</style>
