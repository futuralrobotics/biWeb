<template>
  <div style="padding: 0 12px">
    <el-table size="mini" :data="tableData" max-height="250" border>
      <el-table-column prop="pointName" label="点位"> </el-table-column>
      <el-table-column prop="type" label="任务类型" :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        :formatter="formatterTime"
      >
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        :formatter="formatterTime"
      >
      </el-table-column>
      <el-table-column
        prop="result"
        label="执行结果"
        :formatter="formatterResult"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { taskType } from "@/constant";
import moment from "moment";

@Component
export default class DetailLogs extends Vue {
  @Prop({ default: [] }) tableData!: Array<any>;
  mounted() {
    console.log("ahhahahahdsdhdhs", this.tableData);
  }

  formatter(row: any) {
    return taskType[row.type - 1];
  }

  formatterTime(row: any, column: any, cellValue: number) {
    return moment(cellValue).format();
  }

  formatterResult(row: any) {
    return row.result === 0 ? "完成" : row.comment;
  }
}
</script>
 
<style scoped lang="less">
</style>