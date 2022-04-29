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
    <el-table-column
      width="80"
      prop="type"
      label="月份"
      :formatter="formatterType"
    >
    </el-table-column>
    <el-table-column prop="rosSn" label="累计激活设备数"> </el-table-column>
    <el-table-column label="新增激活设备数"></el-table-column>
    <el-table-column prop="lastReportTime" label="设备MAU"> </el-table-column>
    <el-table-column label="月活跃率"> </el-table-column>
  </list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getDeviceAnalyzeData } from "@/api/dataAnalysis";
import RobotType from "@/components/select/RobotType.vue";
import CountryCode from "@/components/select/CountryCode.vue";
import List from "@/components/List.vue";
import { robotStatus } from "@/constant";
import moment from "moment";

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
  country = "-1";

  async init(pageNum: number, pageSize: number) {
    return await getDeviceAnalyzeData({
      pageNum,
      pageSize,
      type: this.type,
      countryCode: this.country,
    });
  }

  formatterType(row: any) {
    const type = this.$store.state.robotType.find(
      (item: any) => item.model === Number(row.type)
    );
    return (type && type.name) || row.type;
  }
  formatterCountry(row: any) {
    const country = this.$store.state.countryCode.find(
      (item: any) => item.cc === row.countryCode
    );
    return (country && country.comment) || row.countryCode;
  }
  formatterTime(row: any, column: any, cellValue: number) {
    return moment(cellValue).format("YYYY-MM-DD hh:mm");
  }
  formatterStatus(row: any) {
    return robotStatus[row.status];
  }
  clickSearch() {
    this.$refs.myList.refresh();
  }
}
</script>