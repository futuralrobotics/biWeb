import { Interceptors } from './interceptors';
// import store from '@/store';
export class HttpService {
  public axios: any;

  constructor() {
    // 获取axios实例
    this.axios = new Interceptors().getInterceptors();
  }

  /*
   * get请求
   * @param params  参数
   * @param operation     接口
   * @param {any} options 配置
   */
  private request(url: string, method: string, params: any, {
    analysis = true,
    errorTis = true,
    formData = false
  }: any) {
    let headers = {};
    if (formData) {
      analysis = false;
      params = this.transformRequest(params);
      headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
    }
    return new Promise((resolve, reject) => {
      this.axios({
        headers,
        // responseType,
        url,
        method,
        timeout: -1,
        // cancelToken: cancelToken || "",
        params: method === 'get' || method === 'delete' ? params : null,
        data: method === 'post' || method === 'put' || method === 'patch' ? params : null,
        rejectUnauthorized: false,
        withCredentials: true,
        analysis,
        errorTis,
        // transformRequest: [
        //   function (data: any) {
        //     let ret = ''
        //     for (let it in data) {
        //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //     }
        //     ret = ret.substring(0, ret.lastIndexOf('&'));
        //     return ret
        //   }
        // ]
      }).then((res: any) => {
        if (analysis) {
          const data = JSON.parse(res);
          resolve(data);
        } else {
          resolve(res);
        }
      }, (res: any) => {
        reject(res);
      })
        .catch((err: any) => {
          reject(err.message);
        });
    });

  }

  transformRequest(data: any) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    ret = ret.substring(0, ret.lastIndexOf('&'));
    return ret
  }


  /*
   * GET类型的网络请求
   */
  public httpGet(url: string, params?: any, options?: any) {
    return this.request(url, 'get', params || {}, options || {});
  }

  /*
  * POST类型的网络请求
  */
  public httpPost(url: string, params?: any, options?: any) {
    return this.request(url, 'post', params || {}, options || {});
  }

  /*
  * PUT类型的网络请求
  */
  public httpPut(url: string, params?: any, options?: any) {
    return this.request(url, 'put', params || {}, options || {});
  }

  /*
   * @param url请求路径
   * @param params  参数
   */
  public httpPatch(url: string, params?: any, options?: any) {
    const useOptions = options || {};
    if (useOptions.strategicHeader) {
      const header = useOptions.header || {};
      header["Content-Type"] = "application/strategic-merge-patch+json";
      useOptions.header = header;
    }
    return this.request(url, 'patch', params || {}, useOptions);
  }

  /*
  * DELETE类型的网络请求
  */
  public httpDelete(url: string, params?: any, options?: any) {
    return this.request(url, 'delete', params || {}, options || {});
  }

}

export default new HttpService();
