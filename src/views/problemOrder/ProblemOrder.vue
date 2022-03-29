<template>
  <div class="">
    <van-row align="center" gutter="">
      <van-col span="12" class="tx-c">
        <van-button
          block
          :type="btnNum == 0 ? 'primary' : 'default'"
          size="normal"
          class="font-b"
          @click="btnNumTOP"
          >TOP-N等级
        </van-button>
      </van-col>
      <van-col span="12" class="tx-c">
        <van-button
          block
          size="normal"
          :type="btnNum == 1 ? 'primary' : 'default'"
          class="font-b"
          @click="btnNumTime"
          >派单时间
        </van-button>
      </van-col>
    </van-row>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="li-item"
          v-for="item in list"
          :key="item.Id"
          @click="toDetial(item)"
        >
          <p>
            <span class="dot red"></span>
            <span>区县：</span>
            <span>{{ item.County }}</span>
          </p>
          <p>
            <span class="dot orange"></span>
            <span>网格：</span>
            <span>{{ item.Grid }}</span>
          </p>
          <!-- <p>
            <span class="dot yellow"></span>
            <span>班组人员：</span>
            <span>{{ item.TeamName }}</span>
          </p> -->
          <p>
            <span class="dot green"></span>
            <span>站址名称：</span>
            <span>{{ item.SiteName }}</span>
          </p>
          <p>
            <span class="dot blue"></span>
            <span>站址编码：</span>
            <span>{{ item.SiteCode }}</span>
          </p>
          <!-- <p>
            <span class="dot black"></span>
            <span>故障原因：</span>
            <span>{{ item.FaultCause }}</span>
          </p> -->
          <p>
            <span class="dot purple"></span>
            <span>基站等级：</span>
            <span>{{ item.SiteLelvel }}</span>
          </p>
          <p>
            <span class="dot grey"></span>
            <span>权重值：</span>
            <span>{{ item.Weight }}</span>
          </p>
          <p v-if="btnNum == 0">
            <span class="dot green1"></span>
            <span>故障数量：</span>
            <span>{{ item.FaultNum }}</span>
          </p>
          <p v-else>
            <span class="dot green1"></span>
            <span>派单时间：</span>
            <span>{{ item.UpdateTime }}</span>
          </p>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { ref } from "vue";
import { postAction } from "/@api/api";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);
    const btnNum = ref(0);
    const store = useStore();
    const PageIndex = ref(1);
    const onLoad = () => {
      if (refreshing.value) {
        list.value = [];
        refreshing.value = false;
      }
      const obj = {
        PageIndex: PageIndex.value,
        PageRows: 10,
        SortField: btnNum.value == 0 ? "FaultNum" : "UpdateTime",
        SortType: btnNum.value == 0 ? "desc" : "asc",
        Search: {
          City: store.state.userInfo.City,
          County: store.state.userInfo.County,
          // SiteName: store.state.userInfo.SiteName,
          // SiteCode: store.state.userInfo.SiteCode,
          Grid: store.state.userInfo.Grid,
          // TeamName: store.state.userInfo.TeamName,
          WoType: store.state.userInfo.WoType,
        },
      };
      postAction("/Wo/App/WeChatWo/GetData_WoList", obj).then((res) => {
        if (res.Success) {
          PageIndex.value++;
          list.value = list.value.concat(res.Data);
          console.log(list.value.length);
          if (list.value.length == res.Total) {
            finished.value = true;
          }
        }
        loading.value = false;
      });
    };

    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;
      PageIndex.value = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };

    const btnNumTOP = () => {
      btnNum.value = 0;
      refreshing.value = true;
      onRefresh();
    };
    const btnNumTime = () => {
      btnNum.value = 1;
      refreshing.value = true;
      onRefresh();
    };
    const router = useRouter();
    const toDetial = (row) => {
      router.push({ path: "/problemDetail", query: { id: row.Id } });
    };

    return {
      btnNum,
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      btnNumTOP,
      btnNumTime,
      toDetial,
    };
  },
};
</script>

<style scope>
.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 3px;
  vertical-align: super;
  margin: 0 8px;
}
.li-item {
  background: #fff;
  padding: 8px 0;
  border-radius: 4px;
  margin-bottom: 5px;
}

.li-item p {
  margin: 5px 0;
  font-size: 0.32rem;
}

.li-item p span:last-child {
  color: #7f7f7f;
}

.green1 {
  color: #44f956;
}

.font-b {
  font-size: 0.35rem;
}
</style>
