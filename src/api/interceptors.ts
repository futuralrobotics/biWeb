import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Notification } from 'element-ui';
import store from "@/store";

const errorCode: any = {
  "3": "设备已经被其他用户绑定",
  "2": "无此机器人识别码",
  "1": "用户未激活",
  "-2": "用户不存在",
  "-3": "密码错误",
  "-4": "邮箱已存在",
  "-5": "邮箱不存在",
  "-6": "设备不存在",
  "-7": "获取设备信息出错",
  "-8": "获取用户信息出错",
  "-9": "暂无统计信息"
}
type AxiosResponseFill<T, K extends keyof T, P> = {
  [key in keyof T]: key extends K ? T[K] & P : T[K];
}
interface AxiosResponseFillConfig {
  analysis?: boolean;
  errorTis?: boolean;
}
type NewAxiosResponse = AxiosResponseFill<AxiosResponse, "config", AxiosResponseFillConfig>
export class Interceptors {
  public instance: AxiosInstance;

  constructor() {
    // 创建axios实例
    this.instance = axios.create({ timeout: 1000 * 12 });
    // 初始化拦截器
    this.initInterceptors();
  }

  // 为了让http.ts中获取初始化好的axios实例
  public getInterceptors() {
    return this.instance;
  }


  // 初始化拦截器
  public initInterceptors() {
    // 设置post请求头
    // this.instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    /**
      * 请求拦截器
      * * 每次请求前，如果存在token则在请求头中携带token
    */
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // if (config)
        // config.data = qs.stringify(config.data) // 转为formdata数据格式
        // let userSessionId = window.sessionStorage.getItem("user_session_id");
        // let token = window.sessionStorage.getItem("token");
        // if (config.url && config.url.indexOf('/test/') < 0) {
        // config.withCredentials = true;
        // config.headers.Authorization = "Basic a3ViZWNvbmZpZy11c2VyLXhjeGw2OnZ6djg3cmg4ZzU5emZqcWNxeGJ6em5id3p2OTZ2a2x4eGh2OW5ydzhiZHR6c3M1NDQ0dzQ2dw==";
        // }
        if (config.headers && store.state.token) {
          config.headers["Authorization"] = "Bearer " + store.state.token;
        }
        return config;
      },
      (error) => {
        console.log(error);
      }
    );


    // 响应拦截器
    this.instance.interceptors.response.use(
      // 请求成功
      (res: AxiosResponse) => {
        const result = res as NewAxiosResponse;
        if (res.status >= 200 && res.status < 300) {
          const { resultCode, resultMsg } = res.data;
          if (resultCode !== 0) {
            result.config.errorTis && this.errorResultCodeHandle(resultCode, resultMsg);
            return Promise.reject(res.data);
          }
          return result.config.analysis ? Promise.resolve(resultMsg) : Promise.resolve(res.data);
        } else {
          this.errorHandle(res, res.config);
          return Promise.reject(res.data);
        }
      },
      // 请求失败
      (error) => {
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          this.errorHandle(response, error.config);
          return Promise.reject(response.data);
        } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
          Notification.error({ title: "错误", message: "网络连接异常,请稍后再试!" });
        }
      });
  }


  /*
   * http握手错误
   * @param res  响应回调,根据不同响应进行不同操作
   */
  private errorHandle(res: any, config: any) {
    switch (res.status) {
      case 400:
        Notification.error(res.data.error);
        break;
      case 401:
        store.commit("SET_TOKEN", "");
        location.href = "/login";
        Notification.error({ title: "错误", message: res.data.error });
        break;
      case 403:
        Notification.error(res.data.error);
        break;
      case 404:
        Notification.error(res.data.error);
        break;
      default:
        Notification.error(res.data.error);
    }
  }

  errorResultCodeHandle(resultCode: string, resultMsg: string) {
    let msg = errorCode[resultCode] || resultMsg;
    Notification.error(msg);
  }
}
