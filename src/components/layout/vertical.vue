<template>
  <div class="vertical-layout">
    <div class="vertical-layout-top" v-if="$slots.top">
      <slot name="top"></slot>
    </div>
    <div
      class="vertical-layout-body"
      :style="$slots.top ? '' : 'padding-top: 12px;'"
    >
      <div
        class="vertical-layout-body-content"
        :style="`backgroundColor: ${noBodyBg ? '' : '#fff'} `"
        ref="content"
      >
        <slot name="content"></slot>
      </div>
    </div>
    <div class="vertical-layout-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class OLayout extends Vue {
  $ref: any;
  @Prop({ default: false }) noBodyBg?: boolean;
}
</script>


<style lang="less" scoped>
.vertical-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-body {
    // padding: 0 12px 12px;
    flex: 1;
    overflow: hidden;
    &-content {
      height: 100%;
      overflow: auto;
    }
  }
  &-footer {
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 0px 4px 1px rgba(223, 236, 255, 1);
    padding: 14px 50px;
    text-align: right;
    // 用于footer内部元素定位
    position: relative;
  }
}
</style>
