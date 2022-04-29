<template>
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="年份">
      <el-select v-model="searchForm.year" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="国家或地区">
      <el-select v-model="searchForm.countryCode" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="型号">
      <el-select v-model="searchForm.type" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  searchForm = {
    year: 2020,
    countryCode: "",
    type: "",
  };
}
</script>