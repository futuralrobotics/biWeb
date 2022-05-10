<template>
  <div class="double-list">
    <slot style="margin-bottom: 12px" name="topbar">
      <el-button type="primary" @click="clickSearch">查询</el-button>
    </slot>
    <el-table
      :max-height="maxHeight ? maxHeight : null"
      ref="myTable"
      :data="tableData"
      class="double-list-table"
      :style="$slots.topbar ? 'padding-top: 12px;' : null"
      style="width: 100%"
    >
      <slot></slot>
    </el-table>
    <el-pagination
      class="double-list-page"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNo"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      v-if="total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// import { getAllDeviceInfo } from "@/api/equipment";

@Component
export default class List extends Vue {
  $refs: any;
  @Prop() getData?: Function;
  @Prop() automaticMaxHeight?: boolean;
  @Prop({ default: true }) autoInit?: boolean;
  @Prop({ default: () => [] }) data?: Array<any>;

  tableData: Array<any> = [];

  allData: Array<any> = [];

  total = 0;

  pageSize = 10;

  pageNo = 1;

  maxHeight = 0;

  @Watch("data", {
    immediate: true,
  })
  dataChange(val: any) {
    this.pageNo = 1;
    if (val && val.length > 0) {
      this.allData = val;
      this.total = val.length;
      this.tableData = this.allData.slice(0, this.pageSize);
    } else {
      this.tableData = this.allData = [];
    }
  }

  created() {
    if (this.automaticMaxHeight) {
      this.$nextTick(() => {
        this.maxHeight = this.$refs.myTable.$el.offsetHeight;
      });
    }
    this.autoInit && this.init();
  }

  async init(pageNo?: number) {
    if (this.getData) {
      const data = await this.getData(pageNo || this.pageNo, this.pageSize);
      if (data) {
        this.tableData = data.list;
        this.total = data.total;
        console.log(data);
      }
    } else {
      pageNo &&
        (this.tableData = this.allData.slice(
          (pageNo - 1) * this.pageSize,
          this.pageSize * pageNo
        ));
    }
  }

  getPage() {
    return this.pageNo;
  }

  async handleCurrentChange(pageNo: number) {
    debugger;
    this.init(pageNo);
  }

  refresh() {
    this.init(1);
  }

  setTargetPage(pageNo: number) {
    const myPageNo = Number(pageNo);
    this.pageNo = myPageNo;
    this.init(myPageNo);
  }
}
</script>

<style lang="less" scoped>
.double-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-table {
    flex: 1;
  }
  &-page {
    text-align: center;
    padding: 12px 0 0;
  }
}
</style>