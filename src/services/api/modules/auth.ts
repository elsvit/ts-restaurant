import { ReqType } from '..';
import Api from '../base/api';

class RestaurantsAPI extends Api {
  public get() {
    return this.r({
      method: 'GET',
      url: '/auth',
    });
  }
}

export default function(request: ReqType): RestaurantsAPI {
  return new RestaurantsAPI(request);
}
