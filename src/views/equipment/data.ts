import { robotStatus } from "@/constant";
import store from "@/store";
import moment from "moment";
import { transformTime } from "@/utils";

export const formatCountryCode = (value: string) => {
  const country = store.state.countryCode.find(
    (item: any) => item.cc === value
  );
  return (country && country.comment) || value;
}
export const formatType = (value: string) => {
  const type = store.state.robotType.find(
    (item: any) => item.model === Number(value)
  );
  return (type && type.name) || value;
}

export const basicData = {
  model: {
    title: "型号",
    format: (value: string) => {
      return formatType(value);
    }
  },
  androidSn: "SN",
  countryCode: {
    title: "地区",
    format: (value: string) => {
      return formatCountryCode(value);
    }
  },
  firstReportTime: {
    title: "激活时间",
    format: "time"
  },
  lastReportTime: {
    title: "上次上线时间",
    format: "time"
  },
  status: {
    title: "设备状态",
    format: (value: string) => {
      return robotStatus[value];
    }
  },
  androidMac: "MAC",
  appVer: "机器人端软件版本",
  rosVer: "工控软件版本",
  gatherBoardVer: "嵌入式软件版本",
  count: "累计任务次数",
  totalTime: {
    title: "累计任务时间",
    format: (value: number) => {
      // const time = moment.duration(value, "seconds");
      // const hours = time.hours();
      // const minutes = time.minutes();
      // const days = time.days();
      // console.log(hours, minutes, days)
      return transformTime(value);
      // return days?`${days}days ` + hours ? hours + "hrs " : moment({ d: days, h: hours, m: minutes }).format('ddays hhrs mins');
    }
  }
}

export const otherData: any = {
  "0": {
    failCount: "任务异常次数",
    lampWorkTimes: "灯管消毒时间",
  },
  "2": {
    failCount: "任务异常次数",
  },
  "6": {
    uvAirTime: "紫外线空气消毒次数",
    sparyTime: "喷雾消毒次数",
    plasmaTime: "等离子灭菌次数",
    airCleanTime: "空气净化次数字段"
  }
}