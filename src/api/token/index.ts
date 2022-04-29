import HttpService from '../request';

export function getToken(): Promise<any> {
  return HttpService.httpPost("/oauth/token ", {
    "client_id": "sq_bi_client", "client_secret": "Deservice#*2021", "grant_type": "password", "username": "bi", "password": "Deservice#*2021"
  });
}