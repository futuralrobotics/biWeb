<template>
  <div>
    <div class="search">
      SN：
      <el-input
        class="search-input"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search"
      >
      </el-input>
      <el-button type="primary" @click="clickSearch">查询</el-button>
    </div>
    <p class="error-color">{{ error }}</p>
    <ul class="field-list">
      <li class="field flexbox" v-for="(item, index) in dataList" :key="index">
        <div class="field-title">{{ item.title }}</div>
        <div class="field-value">{{ item.value }}</div>
      </li>
    </ul>
  </div>
</template>
 
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getDeviceInfo, getDeviceStatisticInfo } from "@/api/equipment";
import { getDataType, transformTime } from "@/utils";
import { basicData, otherData } from "./data";
// import moment from "moment";

interface DataMap {
  title: string;
  value: string;
}

@Component
export default class EquipmentDetail extends Vue {
  $moment: any;
  search: any = "";

  error: string = "";

  dataList: Array<DataMap> = [];

  created() {
    this.search = this.$route.query.id;
    this.init();
  }

  async init() {
    this.error = "";
    this.dataList = [];
    if (!this.search) {
      return;
    }
    try {
      const result: any = await Promise.allSettled([
        getDeviceInfo(this.search),
        getDeviceStatisticInfo(this.search),
      ]);
      if (result[0].status === "rejected") {
        this.error = "SN输入有误！！";
        return;
      }
      let statistic = false;
      let data = result[0].value;
      if (result[1].status !== "rejected") {
        statistic = true;
        data = Object.assign(result[1].value, data);
      }
      console.log(data);
      const fields = Object.assign(basicData, otherData[data.model] || {});
      console.log("===============", data.model);
      Object.keys(fields).forEach((item) => {
        let field = fields[item];
        let title = "";
        let format = null;
        if (getDataType(field) === "Object") {
          title = field.title;
          format = field.format;
        } else {
          title = field;
        }
        if (statistic && item === "lampWorkTimes") {
          for (let i = 1; i <= 6; i++) {
            const num = transformTime(data["lamp" + i + "WorkTime"]);

            this.dataList.push({
              title: i === 1 ? title : "",
              value: "灯管" + i + "：" + num,
            });
          }
        } else {
          let value = data[item];
          if (value && format) {
            if (format === "time") {
              value = this.$moment(value).format();
            } else {
              value = format(data[item]);
            }
          }
          this.dataList.push({
            title,
            value: value || "N/A",
          });
        }
      });
    } catch (error) {
      this.dataList = [];
      console.log(error);
    }
  }

  clickSearch() {
    if (!this.search) {
      this.error = "请先输入SN";
      return;
    }
    this.init();
  }

  mounted() {
    console.log("mounted");
  }
}
</script>
 
<style scoped lang="less">
.field-list {
  width: 100%;
  display: table;
  .field:first-child {
    .field-title,
    .field-value {
      border-top: 1px solid #e8e8e8;
    }
  }
  .field {
    display: table-row;
    &-title {
      width: 25%;
      background: #f7f9fc;
    }
    &-title,
    &-value {
      display: table-cell;
      border-bottom: 1px solid #e8e8e8;
      padding: 15px;
      // padding: 15px 0;
      // width: 25%;
    }
  }
}

.search {
  padding: 12px 0;
  &-input {
    width: 240px;
    margin-right: 20px;
  }
}
</style>