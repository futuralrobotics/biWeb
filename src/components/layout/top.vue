<template>
  <div class="top">
    <el-popover trigger="hover">
      <el-link @click="gotoLogin" type="primary">退出登录</el-link>
      <div slot="reference" class="user">
        <i class="el-icon-user"></i>
      </div>
    </el-popover>
    <div class="screen" @click="gotoOverview">
      <router-link target="_blank" :to="{ path: '/overview' }"
        ><i class="el-icon-data-line"></i> 我的大屏</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Top extends Vue {
  gotoLogin() {
    this.$store.commit("SET_TOKEN", "");
    this.$router.push("/login");
  }

  gotoOverview() {
    this.$router.resolve("/overview");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.top {
  height: 82px;
  border-bottom: 1px solid #e8e8e8;
  .user {
    float: right;
    cursor: pointer;
    width: 34px;
    height: 34px;
    background: #e3f0ff;
    color: #469dff;
    border-radius: 50%;
    text-align: center;
    line-height: 34px;
    margin-top: 24px;
    margin-right: 32px;
    i {
      font-size: 14px;
      font-weight: bolder;
    }
  }
  .screen {
    float: right;
    margin-top: 32px;
    margin-right: 32px;
    cursor: pointer;
    i {
      float: left;
      margin-top: -2px;
      font-size: 20px;
      color: #469dff;
      margin-right: 10px;
    }
  }
}
</style>