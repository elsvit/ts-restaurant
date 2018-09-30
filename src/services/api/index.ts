import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

import auth from './modules/auth';
import restaurants from './modules/restaurants';

export type ReqType = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

class Client {
  constructor(baseURL: Maybe<string>) {
    const reqHeaderURL = {
      baseURL: baseURL || '',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    this.req = axios.create(reqHeaderURL);

    this.req.interceptors.request.use((config: AxiosRequestConfig) => {
      if (!this.token) {
        return config;
      }

      config.headers = Object.assign({}, config.headers, {
        'token': this.token,
      });
      return config;
    });

    this.auth = auth(this.req);
    this.restaurants = restaurants(this.req);
  }

  public token: Maybe<string>;
  public req: AxiosInstance & ReqType;
  public auth: any;
  public restaurants: any;

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): Maybe<string> {
    return this.token;
  }
}

let instance: any;
export default function api(url?: string) {
  if (!instance) {
    instance = new Client(url);
  }
  return instance;
}
