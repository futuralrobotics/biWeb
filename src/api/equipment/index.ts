import HttpService from "../request";
import store from "@/store";

interface GetDeviceListParams {
  pageNum: number;
  pageSize: number;
  type: number;
  countryCode?: string;
  startTime?: any;
  endTime?: any;
}

export type GetDeviceParams = GetDeviceListParams & {
  sn: string;
};

export function getRobotTypeList(): Promise<any> {
  return HttpService.httpPost("/bi/getRobotTypeList");
}

export function getCountryCodeList(): Promise<any> {
  return HttpService.httpPost("/bi/getCountryCodeList");
}

export function getAllDeviceInfo(params: GetDeviceListParams): Promise<any> {
  const send: any = { ...params };
  // if (send.countryCode === "-1") {
  //   delete send.countryCode;
  // }
  send.userId = store.state.userId;
  // send.userEmail = "zhuangzi200323@163.com";
  return HttpService.httpPost("/bi/getAllDeviceInfo", send);
}

export function getDeviceStatisticInfo(sn: string): Promise<any> {
  return HttpService.httpPost("/bi/getStatisticInfo", {
    "userId": store.state.userId,
    sn
  }, {
    errorTis: false
  });
}


export function getDeviceInfo(sn: string): Promise<any> {
  return HttpService.httpPost("/bi/getDeviceInfo", {
    "userId": store.state.userId,
    sn
  });
}

export function getAllDisinfectRecord(params: GetDeviceParams): Promise<any> {
  return HttpService.httpPost("/bi/getAllDisinfectRecord", {
    "userId": store.state.userId,
    ...params
  });
}

export function addDevice(sn: string): Promise<any> {
  return HttpService.httpPost("/bi/devices", {
    "userId": store.state.userId,
    sn
  });
}