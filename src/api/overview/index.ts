import HttpService from '../request';
import store from "@/store";

export function getLargeScreenData(): Promise<any> {
  return HttpService.httpPost("bi/getLargeScreenData", {
    "userId": store.state.userId,
  });
}