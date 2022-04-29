<template>
  <div class="sidebar">
    <div class="sidebar-left">
      <div class="sidebar-left-logo">
        <img src="../../assets/logo.png" />
      </div>
      <ul class="menu">
        <li
          v-for="item in menu"
          :key="item.path"
          :class="{ active: active === item.path }"
          @click="gotoMenu(item)"
        >
          <i :class="item.icon"></i>
          <div>{{ item.title }}</div>
        </li>
      </ul>
    </div>
    <div class="sidebar-right">
      <div class="current-title">{{ currentMenuObj.title }}</div>
      <ul class="current-menu">
        <li
          v-for="item in currentMenuObj.children"
          :key="item.path"
          :class="{ active: currentMenu === item.path }"
          @click="gotoRoute(item.path)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface MenuItem {
  path: string;
  title: string;
  icon: string;
  children?: {
    path: string;
    title: string;
  }[];
}

@Component
export default class Sidebar extends Vue {
  active = "account";

  currentMenu: any = "";

  currentMenuObj: MenuItem | null = null;

  get menu() {
    const menu = [
      {
        path: "equipment",
        title: "设备管理",
        icon: "el-icon-box",
        children: [
          {
            path: "/equipment/overview",
            title: "设备总览",
          },
          {
            path: "/equipment/detail",
            title: "设备详情",
          },
          {
            path: "/equipment/task",
            title: "任务记录",
          },
        ],
      },
      {
        path: "dataAnalysis",
        title: "数据分析",
        icon: "el-icon-data-analysis",
        children: [
          {
            path: "/dataAnalysis/equipment",
            title: "设备数据",
          },
          {
            path: "/dataAnalysis/task",
            title: "任务数据",
          },
        ],
      },
    ];

    const account = {
      path: "account",
      title: "帐号管理",
      icon: "el-icon-coordinate",
      children: [
        {
          path: "/account/member",
          title: "帐号成员",
        },
      ],
    };
    return this.$store.state.roleId < 3 ? [...menu, account] : menu;
  }

  created() {
    this.currentMenu = this.$route.path;
    this.active = this.currentMenu.split("/")[1];

    this.setCurrentMenu();
  }

  setCurrentMenu(replace?: boolean) {
    this.currentMenuObj = this.menu.find(
      (item) => item.path === this.active
    ) as MenuItem;
    if (!this.currentMenu || replace) {
      // this.currentMenu = this.currentMenuObj?.children?.[0].path;
      const path = this.currentMenuObj?.children?.[0].path;
      if (path) {
        this.gotoRoute(path);
      }
    }
  }

  gotoMenu(menu: MenuItem): void {
    if (this.active === menu.path) {
      return;
    }
    this.active = menu.path;
    this.setCurrentMenu(true);
  }

  gotoRoute(path: string) {
    if (this.$route.path === path) {
      return;
    }
    this.currentMenu = path;
    this.$router.push(path);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.sidebar {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  bottom: 0;
  &-left {
    text-align: center;
    float: left;
    width: 100px;
    height: 100%;
    background: #469dff;
    &-logo {
      padding: 20px;
      img {
        width: 48px;
      }
    }
    .menu {
      color: #ffffff;
      li {
        opacity: 0.5;
        padding: @spacing 0;
        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      }
      .active {
        opacity: 1;
      }
    }
  }
  &-right {
    margin-left: 100px;
    width: 140px;
    height: 100%;
    background: #fcfcfc;
    .current-title {
      height: 82px;
      line-height: 82px;
      padding-left: 20px;
      font-size: 18px;
      color: #333333;
    }
    .current-menu {
      li {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
      }
      li:hover,
      .active {
        cursor: pointer;
        background: #f5f5f5;
        color: @active-color;
      }
    }
  }
}
</style>
