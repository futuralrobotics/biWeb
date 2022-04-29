<template>
  <div class="inline-block">
    <span>型号：</span>
    <el-select v-model="type" placeholder="请选择" @change="change">
      <el-option label="全部" value="-1"></el-option>
      <el-option
        v-for="item in types"
        :key="item.id"
        :label="item.name"
        :value="item.model"
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

  get types() {
    return this.$store.state.robotType;
  }

  change(value: boolean | string | number) {
    this.$emit("change", value);
    this.$emit("input", value);
  }
}
</script>