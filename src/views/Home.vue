<template>
  <div>
    <sidebar></sidebar>
    <div class="layout-right">
      <top></top>
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidebar from "@/components/layout/sidebar.vue";
import Top from "@/components/layout/top.vue";
import { getRobotTypeList, getCountryCodeList } from "@/api/equipment";
import { getroleList } from "@/api/user";

@Component({
  components: {
    Sidebar,
    Top,
  },
})
export default class Home extends Vue {
  created() {
    this.init();
  }

  async init() {
    const data = await Promise.all([
      getRobotTypeList(),
      getCountryCodeList(),
      getroleList(),
    ]);
    this.$store.commit("SET_ROBOT_TYPE", data[0]);
    this.$store.commit("SET_COUNTRY_CODE", data[1]);
    this.$store.commit("SET_ROLE", data[2]);
  }
}
</script>
<style lang="less">
.layout-right {
  padding-left: 240px;
  .container {
    height: calc(100vh - 82px);
    overflow: auto;
    padding: 12px;
  }
}
</style>
