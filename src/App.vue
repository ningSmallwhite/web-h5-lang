<template>
  <div>
    <!-- <Header /> -->
    <van-nav-bar
      left-arrow
      title="润建股份网络运营服务平台"
      @click-left="onClickLeft"
    />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
// import Header from "/@comp/public/Header.vue";
import { useRouter } from "vue-router";
import { getUrlKey } from "/@utils/utils";
import { onBeforeUnmount } from "vue";
import { Session, Local } from "/@utils/storage";
import { useStore } from "vuex";
import { getAction, postAction } from "/@api/api";
import { Toast } from "vant";

const router = useRouter();
const onClickLeft = () => {
  router.go(-1);
};
const store = useStore();
const openId = Session.get("openId");
// 有openId通行  否则获取code登录
const hadOpenId = () => {
  if (openId) {
    loadUserInfo();
  } else {
    const code = Local.get("wxCode");
    code && loadOpenId(code);
  }
};

const loadOpenId = (code) => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
  });
  getAction("/Data_Manage/WeChat_User/GetAccessTokenByCode", {
    code,
  })
    .then((res) => {
      if (res.Success) {
        Session.set("openId", res.Data.openid);
        store.dispatch("setOpenId", res.Data.openid);
        // 用户信息
        loadUserInfo();
      }
      Toast.clear();
    })
    .catch((err) => {
      Toast.clear();
    });
};

const loadUserInfo = () => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
  });
  postAction("/Data_Manage/WeChat_User/GetWeChat_User", {
    openid: store.state.openId,
  }).then(async (res) => {
    if (res.Success) {
      await Local.set("userInfo", res.Data);
      await store.dispatch("setUserData", res.Data);
      if (!res.Data.Id) {
        // 没有用户信息 跳到注册页面
        // router.replace("/register");
      }
    }
    Toast.clear();
  });
};

// 进入就运行
hadOpenId();
</script>

<style></style>
