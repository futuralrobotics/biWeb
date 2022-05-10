<template>
  <list ref="myList" :automaticMaxHeight="true" :getData="init">
    <div slot="topbar" class="search">
      SN：
      <el-input
        class="search-input"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="sn"
      >
      </el-input>
      时间：
      <el-date-picker
        class="search-time"
        v-model="time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
      <el-button type="primary" @click="clickSearch">查询</el-button>
    </div>
    <el-table-column type="expand">
      <template slot-scope="props">
        <detail-logs :tableData="props.row.detailLogs"></detail-logs>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="任务ID"> </el-table-column>
    <el-table-column prop="type" label="任务类型" :formatter="formatter">
    </el-table-column>
    <el-table-column prop="name" label="任务名称"> </el-table-column>
    <el-table-column prop="time" label="任务时间" :formatter="showTime">
    </el-table-column>
    <!-- <el-table-column prop="needTime" label="耗时"> </el-table-column> -->
    <el-table-column prop="powerConsume" label="耗电"> </el-table-column>
    <el-table-column prop="repeatCount" label="循环次数"> </el-table-column>
    <el-table-column prop="pointsCount" label="点位数"> </el-table-column>
    <el-table-column prop="status" label="任务状态" :formatter="formatter">
    </el-table-column>
  </list>
</template>
 
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAllDisinfectRecord } from "@/api/equipment";
import DetailLogs from "./components/DetailLogs.vue";
import Vertical from "@/components/layout/vertical.vue";
import List from "@/components/List.vue";
import { transformTime } from "@/utils";

const status = {
  "-1": "启动任务",
  "0": "任务执行完成",
  "1": "任务被取消",
};

@Component({
  components: {
    DetailLogs,
    Vertical,
    List,
  },
})
export default class Default extends Vue {
  $refs: any;
  $moment: any;
  sn: any = "";
  time = [
    new Date(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000),
    new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1),
  ];

  pickerOptions = {
    shortcuts: [
      {
        text: "最近一周",
        onClick(picker: any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: "最近一个月",
        onClick(picker: any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: "最近三个月",
        onClick(picker: any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit("pick", [start, end]);
        },
      },
    ],
  };
  created() {
    this.sn = this.$route.query.id;
  }

  async init(pageNum: number, pageSize: number) {
    console.log(this.time);
    if (!this.sn) {
      return [];
    }
    const search: any = {
      sn: this.sn,
      startTime: 0,
      endTime: new Date().getTime(),
      pageNum,
      pageSize,
    };
    if (this.time && this.time.length) {
      search.startTime = (this.time[0] as Date).getTime();
      search.endTime = (this.time[1] as Date).getTime();
    }
    const data = await getAllDisinfectRecord(search);
    return {
      ...data,
      list: data.list.map((item: any) => {
        item.detailLogs = JSON.parse(item.detailLogs);
        // const diffTime = item.endTime - item.startTime;
        // item.needTime = diffTime > 0 ? transformTime(diffTime) : "";
        return item;
      }),
    };
  }

  showTime(row: any) {
    return (
      this.$moment(row.startTime).format() +
      " - " +
      this.$moment(row.endTime).format()
    );
  }

  formatter(row: any, column: any, cellValue: number) {
    let result = "";
    switch (column.property) {
      case "type":
        result = cellValue ? "定时任务" : "立即任务";
        break;
      case "status":
        result = status[(cellValue + "") as keyof typeof status];
        break;
    }
    return result;
  }

  clickSearch() {
    this.$refs.myList.refresh();
  }
}
</script>
 
<style scoped lang="less">
.search {
  > div {
    margin-right: 20px;
  }
  &-input {
    width: 240px;
  }
  &-time {
    width: 350px;
  }
}
</style>