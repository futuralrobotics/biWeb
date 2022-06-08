<template>
  <list ref="myList" :automaticMaxHeight="true" :getData="init">
    <div slot="topbar">
      <country-code
        class="spacing-large-right"
        v-model="country"
      ></country-code>
      <robot-type class="spacing-large-right" v-model="type"></robot-type>
      <el-button type="primary" @click="clickSearch">查询</el-button>
    </div>
    <el-table-column width="80" prop="yearAndMonth" label="月份">
    </el-table-column>
    <el-table-column prop="activatedCount" label="累计激活设备数">
    </el-table-column>
    <el-table-column
      prop="newActivatedCountCurrentMonth"
      label="新增激活设备数"
    ></el-table-column>
    <el-table-column prop="mauCount" label="设备MAU"> </el-table-column>
    <el-table-column prop="percentage" label="月活跃率" :formatter="formatter">
    </el-table-column>
  </list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getDeviceAnalyzeData } from "@/api/dataAnalysis";
import RobotType from "@/components/select/RobotType.vue";
import CountryCode from "@/components/select/CountryCode.vue";
import List from "@/components/List.vue";

@Component({
  components: {
    RobotType,
    CountryCode,
    List,
  },
})
export default class EquipmentAnalysis extends Vue {
  $refs: any;
  type = 0;
  country = "all";

  async init(pageNum: number, pageSize: number) {
    return await getDeviceAnalyzeData({
      pageNum,
      pageSize,
      type: this.type,
      countryCode: this.country,
    });
  }

  formatter(row: any) {
    return Math.round((row.mauCount / row.activatedCount) * 10000) / 100 + "%";
  }

  clickSearch() {
    this.$refs.myList.refresh();
  }
}
</script>