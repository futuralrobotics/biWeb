import HttpService from '../request';
import store from "@/store";

export function getDeviceAnalyzeData(params: any): Promise<any> {
  return HttpService.httpPost("/bi/getDeviceAnalyzeData", {
    ...params,
    "userId": store.state.userId
  });
}

export function getTaskAnalyzeData(params: any): Promise<any> {
  return HttpService.httpPost("/bi/getTaskAnalyzeData", {
    ...params,
    "userId": store.state.userId
  });
}