<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getToken } from "@/api/token";

@Component
export default class App extends Vue {
  created() {
    // this.init();
  }

  async init() {
    await getToken();
  }
}
</script>
