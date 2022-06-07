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
    <el-table-column prop="workCountPerMonth" label="累计工作次数（月）">
    </el-table-column>
    <el-table-column
      prop="workTimePerMonth"
      label="累计工作时间（月）"
      :formatter="formatterWorkTimePerMonth"
    ></el-table-column>
    <el-table-column
      label="平均工作时间（次）"
      :formatter="averageWorkTimeEveryTime"
    >
    </el-table-column>
    <el-table-column
      label="平均工作时间（日）"
      :formatter="averageWorkTimeEveryDay"
    >
    </el-table-column>
    <el-table-column label="任务成功率" :formatter="successPercent">
    </el-table-column>
    <el-table-column label="任务失败率" :formatter="failPercent">
    </el-table-column>
  </list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getTaskAnalyzeData } from "@/api/dataAnalysis";
import RobotType from "@/components/select/RobotType.vue";
import CountryCode from "@/components/select/CountryCode.vue";
import List from "@/components/List.vue";
import { transformTime } from "@/utils";

@Component({
  components: {
    RobotType,
    CountryCode,
    List,
  },
})
export default class TaskAnalysis extends Vue {
  $refs: any;
  $moment: any;
  type = 0;
  country = "all";

  async init(pageNum: number, pageSize: number) {
    return await getTaskAnalyzeData({
      pageNum,
      pageSize,
      type: this.type,
      countryCode: this.country,
    });
  }

  formatterWorkTimePerMonth(row: any) {
    return transformTime(row.workTimePerMonth);
  }

  averageWorkTimeEveryTime(row: any) {
    return transformTime(
      Math.round(row.workTimePerMonth / row.workCountPerMonth)
    );
  }
  averageWorkTimeEveryDay(row: any) {
    return transformTime(
      Math.round(row.workTimePerMonth / this.$moment().daysInMonth())
    );
  }
  successPercent(row: any) {
    return (
      Math.round((row.successCount / row.workCountPerMonth) * 10000) / 100 + "%"
    );
  }
  failPercent(row: any) {
    return (
      Math.round((row.failCount / row.workCountPerMonth) * 10000) / 100 + "%"
    );
  }
  clickSearch() {
    this.$refs.myList.refresh();
  }
}
</script>