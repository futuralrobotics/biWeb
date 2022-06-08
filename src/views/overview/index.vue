<template>
  <div class="overview">
    <img class="overview-bg" src="../../assets/world-bg.png" alt="" />
    <div class="title">
      <img src="../../assets/logo-color.png" />
      <span>Futural Robotics 驾驶舱</span>
    </div>
    <div class="midden">
      <ul>
        <li v-for="item in middenData" :key="item.name">
          <div class="midden-item overview-border">
            <h5>{{ item.title }}</h5>
            <div class="midden-item-num">
              <template v-if="item.name === 'workedTime'">
                <span v-for="num in item.num" :key="num.type">
                  {{ num.num }}
                  <span class="midden-item-unit-time">{{ num.type }}</span>
                </span>
              </template>
              <span v-else>{{ item.num }}</span>
            </div>
            <span class="midden-item-unit" v-if="item.unit">{{
              item.unit
            }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div
        class="flex-between flexbox"
        style="position: relative; height: 100%"
      >
        <ul
          class="bottom-box overview-border"
          v-for="box in bottomData"
          :key="box.title"
        >
          <li class="bottom-title">{{ box.title }}</li>
          <li
            v-for="item in box.data"
            :key="item.name"
            class="bottom-item flexbox flex-between"
          >
            <div>{{ item.name }}</div>
            <div class="bottom-item-num">
              <div
                class="bottom-item-num-bg"
                :style="{
                  width: (item.percentage > 5 ? item.percentage : 0) + '%',
                }"
              ></div>
              <span class="bottom-item-num-text">{{
                item.count || "---"
              }}</span>
            </div>
          </li>
        </ul>
        <img class="bottom-world" src="../../assets/world.png" alt="" />
      </div>
    </div>
  </div>
</template>
 
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getLargeScreenData } from "@/api/overview";
import { transformTime } from "@/utils";

@Component
export default class Overview extends Vue {
  middenData: any = [
    {
      name: "activatedCount",
      title: "累计激活",
      unit: "台",
    },
    {
      name: "workedCount",
      title: "累计工作次数",
      unit: "次",
    },
    {
      name: "workedTime",
      title: "累计工作时间",
    },
    {
      name: "todayActivatedCount",
      title: "今日新增激活",
      unit: "台",
    },
  ];
  bottomData = [
    {
      title: "累计激活列表",
      data: [],
    },
    {
      title: "今日工作次数",
      data: [],
    },
  ];
  mounted() {
    this.init();
  }

  async init() {
    const data = await getLargeScreenData();
    this.middenData.forEach((item: any) => {
      if (item.name === "workedTime") {
        item.num = transformTime(data[item.name], true).slice(0, 3);
      } else {
        item.num = data[item.name];
      }
    });
    const deviceTotal = data.deviceList.reduce(
      (a: any, b: any) => b.count + a,
      0
    );
    this.bottomData[0].data = data.deviceList.map((item: any) => ({
      name: item.name,
      percentage: (item.count / deviceTotal) * 100,
      count: item.count,
    }));
    const todayWorkDeviceTotal = data.deviceList.reduce(
      (a: any, b: any) => b.todayWorkCount + a,
      0
    );
    this.bottomData[1].data = data.todayWorkDeviceList.map((item: any) => ({
      name: item.name,
      percentage: (item.todayWorkCount / todayWorkDeviceTotal) * 100,
      count: item.todayWorkCount,
    }));
    console.log(data);
  }
}
</script>
 
<style scoped lang="less">
.overview {
  height: 100vh;
  background-color: #030635;
  display: flex;
  flex-direction: column;
  position: relative;
  &-bg {
    position: absolute;
    height: 80%;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%);
  }
  .title {
    // height: 16%;
    line-height: 2.2;
    text-align: center;
    img {
      vertical-align: middle;
      margin-right: 2vw;
      // margin-top: 10px;
    }
    span {
      font-size: 6.6vh;
      vertical-align: middle;
      color: #ffffff;
      // border: 5px solid rgba(205, 222, 252, 1);
      // border-bottom: 1px solid rgba(205, 222, 252, 1);
      // box-shadow: inset -4px -4px 4px 8px rgba(205, 222, 252, 1);
      // box-shadow: inset 4px 4px 4px 4px rgba(205, 222, 252, 1);
    }
    // .left-s {
    //   width: 0;
    //   height: 0;
    //   border: 50% solid transparent;
    //   border-left-color: red;
    //   ::after {
    //     content: "";
    //     width: 0;
    //     height: 0;
    //     border: 40% solid transparent;
    //     border-left-color: red;
    //   }
    // }
  }
  &-border {
    border: 4px solid rgba(0, 155, 255, 0.99);
    border-radius: 20px;
  }
  .midden {
    ul {
      width: 90vw;
      display: flex;
      margin: 0 auto;
      li {
        flex: 1;
        padding: 2vh;
        .midden-item {
          position: relative;
          text-align: center;
          font-weight: 600;
          h5 {
            font-size: 2vw;
            color: #7fe3f9;
            margin: 0;
          }
          &-num {
            font-size: 2vw;
            color: rgba(0, 155, 255, 0.99);
          }
          &-unit {
            color: #ffffff;
            position: absolute;
            font-size: 1.2vw;
            bottom: 0.4vw;
            right: 1vw;
          }
          &-unit-time {
            font-size: 1.2vw;
            color: #ffffff;
          }
        }
      }
    }
  }
  .bottom {
    flex: 1;
    padding: 3vh 3vw;
    &-world {
      position: absolute;
      width: 50vw;
      left: 50%;
      transform: translate(-50%);
    }
    &-box {
      width: 20vw;
      height: 100%;
      color: #7fe3f9;
      padding: 2vh;
    }
    &-title {
      font-size: 1.3vw;
      text-align: center;
    }
    &-item {
      padding: 3%;
      &-num {
        width: 70%;
        height: 1.3vw;
        position: relative;
        &-bg {
          float: right;
          height: 100%;
          background-color: #11d830;
          transition: width 2s;
        }
        &-text {
          position: absolute;
          right: 0;
          color: #ffffff;
        }
      }
    }
  }
}
</style>