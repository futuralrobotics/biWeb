import HttpService from "../request";
import { Md5 } from 'ts-md5/dist/md5';
import store from "@/store";

export function getUserList(): Promise<any> {
  return HttpService.httpGet(`/bi/users/${store.state.userId}`);
}

export function getroleList(): Promise<any> {
  return HttpService.httpGet("/bi/roles");
}
interface UserParams {
  userName: string;
  password: string;
  roleId: number;
  userId?: string;
  id?: number;
}
export function createUser(params: UserParams): Promise<any> {
  const send = { ...params };
  send.userId = store.state.userId;
  send.password = Md5.hashStr(params.password)
  return HttpService.httpPost("/bi/user", send, { formData: true });
}
export function updateUser(params: any): Promise<any> {
  const send = { ...params };
  send.userId = store.state.userId;
  if (send.password) {
    send.password = Md5.hashStr(params.password)
  }
  return HttpService.httpPut("/bi/user", send, { formData: true });
}