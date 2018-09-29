import { AxiosRequestConfig } from 'axios';

interface ICrudConfig {
  url: string;
  request: AxiosRequestConfig;
  id: Maybe<string>;
}

class CRUD {
  constructor(config: ICrudConfig) {
    this.config = config;
    this.r = this.config.request;
  }

  public config: ICrudConfig;
  public r: AxiosRequestConfig;
  // get(params: Object) {
  //   return this.r({
  //     method: 'GET',
  //     url: this.config.url,
  //     params,
  //   });
  // }
}

export default CRUD;
