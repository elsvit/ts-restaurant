import { ReqType } from '..';

class Api {
  constructor(request: ReqType) {
    this.r = request;
  }

  public r: ReqType;
}

export default Api;
