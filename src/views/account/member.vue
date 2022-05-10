<template>
  <list :automaticMaxHeight="true" :data="data">
    <div slot="topbar">
      <add-member class="right" @ok="refresh"></add-member>
    </div>
    <el-table-column prop="userName" label="账户"> </el-table-column>
    <el-table-column prop="rosSn" label="身份" :formatter="formatter">
    </el-table-column>
    <el-table-column label="操作" width="120">
      <template slot-scope="scope">
        <add-member :data="scope.row" @ok="refresh"></add-member>
      </template>
    </el-table-column>
  </list>
</template>
 
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import List from "@/components/List.vue";
import AddMember from "./components/AddMember.vue";
import { getUserList } from "@/api/user";

@Component({
  components: {
    List,
    AddMember,
  },
})
export default class Member extends Vue {
  data: Array<any> = [];
  mounted() {
    this.init();
  }

  get roles() {
    return this.$store.state.role;
  }

  async init() {
    this.data = await getUserList();
    this.data.reverse();
  }

  formatter(row: any) {
    return this.roles.find(
      (item: { id: string; name: string }) => item.id === row.roleId
    )?.name;
  }

  refresh() {
    this.init();
  }
}
</script>
 
<style scoped lang="less">
</style>