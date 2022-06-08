<template>
  <div class="inline-block">
    <span>国家或地区：</span>
    <el-select v-model="type" placeholder="请选择" @change="change">
      <el-option label="全部" value="all"></el-option>
      <el-option
        v-for="item in countrys"
        :key="item.id"
        :label="item.comment"
        :value="item.cc"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class RobotType extends Vue {
  @Prop() value!: number | string;
  type: number | string = "";

  @Watch("value", {
    immediate: true,
  })
  watchValue(val: number | string) {
    this.type = val;
  }

  get countrys() {
    return this.$store.state.countryCode;
  }

  change(value: boolean | string | number) {
    this.$emit("change", value);
    this.$emit("input", value);
  }
}
</script>