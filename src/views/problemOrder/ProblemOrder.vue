<template>
  <div class="">
    <van-sticky>
      <van-row>
        <van-col span="24">
          <van-search
            class="van-hairline--bottom"
            label="TOP-等级："
            left-icon=""
            readonly
            placeholder="TOP-等级"
            v-model="SortFieldName"
            @click="showPicker = true"
          />
        </van-col>
        <van-col span="24" class="van-hairline--bottom">
          <van-search
            v-model="SiteName"
            show-action
            placeholder="输入基站名称查询"
            @search="onReset"
          >
            <template #action>
              <div>
                <span class="mr5" @click="onReset">查询</span>
                <span @click="onReset(1)">重置</span>
              </div>
            </template>
          </van-search>
        </van-col>
      </van-row>
    </van-sticky>

    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="[
          { text: '权重', value: 'Weight' },
          { text: '故障数量', value: 'FaultNum' },
          { text: '受理时间', value: 'UpdateTime' },
        ]"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

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
          <p>
            <span class="dot yellow"></span>
            <span>告警名称：</span>
            <span>{{ item.AlertName }}</span>
          </p>
          <p>
            <span class="dot green1"></span>
            <span>故障数量：</span>
            <span>{{ item.FaultNum }}</span>
          </p>
          <p>
            <span class="dot black"></span>
            <span>派单时间：</span>
            <span>{{
              formateTime(item.UpdateTime, "YYYY-MM-DD HH:mm:ss")
            }}</span>
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
import { formateTime } from "/@utils/utils";

export default {
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);
    const store = useStore();
    const PageIndex = ref(1);

    const SiteName = ref("");
    const SortField = ref("Weight");
    const SortFieldName = ref("权重");

    const onLoad = () => {
      if (refreshing.value) {
        list.value = [];
        refreshing.value = false;
      }
      const obj = {
        PageIndex: PageIndex.value,
        PageRows: 10,
        SortField: SortField.value,
        SortType: SortField.value == "UpdateTime" ? "asc" : "desc",
        Search: {
          City: store.state.userInfo.City,
          County: store.state.userInfo.County,
          SiteName: SiteName.value,
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


    const router = useRouter();
    const toDetial = (row) => {
      router.push({ path: "/problemDetail", query: { id: row.Id } });
    };

    const showPicker = ref(false);
    const onConfirm = (value) => {
      SortField.value = value.value;
      SortFieldName.value = value.text;
      showPicker.value = false;
    };

    const onReset = (val) => {
      if (val === 1) {
        SortField.value = "Weight";
        SortFieldName.value = "权重";
        SiteName.value = "";
      }

      list.value = [];
      onRefresh();
    };
    return {
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      toDetial,
      onConfirm,
      onReset,
      showPicker,
      SortField,
      SortFieldName,
      SiteName,
      formateTime,
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
  font-size: 14px;
}

.li-item p span:last-child {
  color: #7f7f7f;
}

.green1 {
  color: #44f956;
}

.yellow {
  color: #ffd900;
}
</style>
