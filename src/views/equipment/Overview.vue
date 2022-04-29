<template>
  <list ref="myList" :automaticMaxHeight="true" :getData="init">
    <div slot="topbar">
      <country-code
        class="spacing-large-right"
        v-model="country"
      ></country-code>
      <robot-type class="spacing-large-right" v-model="type"></robot-type>
      <el-button type="primary" @click="clickSearch">查询</el-button>
      <el-button class="right" type="primary" @click="add"
        >添加新设备</el-button
      >
    </div>
    <el-table-column
      width="80"
      prop="type"
      label="型号"
      :formatter="formatterType"
    >
    </el-table-column>
    <el-table-column prop="rosSn" label="SN"> </el-table-column>
    <el-table-column
      label="地区"
      :formatter="formatterCountry"
    ></el-table-column>
    <el-table-column
      prop="lastReportTime"
      label="上次上线时间"
      :formatter="formatterTime"
    >
    </el-table-column>
    <el-table-column label="设备状态" :formatter="formatterStatus">
    </el-table-column>
    <el-table-column label="设备详情" width="80">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="goto('detail', scope.row.androidSn)"
          type="text"
          size="small"
        >
          查看
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="任务记录" width="80">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="goto('task', scope.row.androidSn)"
          type="text"
          size="small"
        >
          查看
        </el-button>
      </template>
    </el-table-column>
  </list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAllDeviceInfo, addDevice } from "@/api/equipment";
import RobotType from "@/components/select/RobotType.vue";
import CountryCode from "@/components/select/CountryCode.vue";
import List from "@/components/List.vue";
import { robotStatus } from "@/constant";
import { formatCountryCode, formatType } from "./data";
// import moment from "moment";

@Component({
  components: {
    RobotType,
    CountryCode,
    List,
  },
})
export default class EquipmentOverview extends Vue {
  $moment: any;
  $refs: any;
  type = "-1";
  country = "-1";

  async init(pageNum: number, pageSize: number) {
    return await getAllDeviceInfo({
      pageNum,
      pageSize,
      type: this.type,
      countryCode: this.country,
    });
  }

  formatterType(row: any) {
    return formatType(row.type);
  }
  formatterCountry(row: any) {
    return formatCountryCode(row.countryCode);
  }
  formatterTime(row: any, column: any, cellValue: number) {
    return this.$moment(cellValue).format();
  }
  formatterStatus(row: any) {
    return robotStatus[row.status];
  }
  clickSearch() {
    this.$refs.myList.refresh();
  }

  async add() {
    try {
      const data: any = await this.$prompt(
        "请输入设备序列号进行添加",
        "添加设备",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValidator: (value) => {
            return !!value;
          },
          inputErrorMessage: "序列号必填",
        }
      );
      if (data?.value) {
        await addDevice(data?.value);
      }
      this.$message.success("添加成功");
    } catch (error) {
      console.log(error);
    }
  }

  goto(path: string, id: string) {
    this.$router.push({
      path: "/equipment/" + path,
      query: {
        id,
      },
    });
  }
}
</script>