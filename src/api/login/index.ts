import HttpService from '../request';
// import { LoginMap } from "./interface";
import { Md5 } from 'ts-md5/dist/md5';
import store from "@/store";

export const login = (username: string, password: string) => new Promise((reslove, reject) => {
  HttpService.httpPost("bi/loginByNameOrEmail", {
    // userEmail: "zhuangzi200323@163.com",
    userName: username,
    password: Md5.hashStr(password)
  }, { analysis: false }).then((data: any) => {
    store.commit("SET_USERNAME", username);
    store.commit("SET_TOKEN", data.accessToken);
    store.commit("SET_USERID", data.userId);
    store.commit("SET_ROLEID", data.roleId);
    reslove(data);
  }, (data) => {
    reject(data);
  });
});