import HttpService from '../request';
import store from "@/store";

export function getDeviceAnalyzeData(params: any): Promise<any> {
  const send: any = { ...params, "userId": store.state.userId };
  return HttpService.httpPost("/bi/getDeviceAnalyzeData", send);
}

export function getTaskAnalyzeData(params: any): Promise<any> {
  const send: any = { ...params, "userId": store.state.userId };
  return HttpService.httpPost("/bi/getTaskAnalyzeData", send);
}