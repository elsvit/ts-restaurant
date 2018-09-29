import { ReqType } from '..';
import Api from '../base/api';

class RestaurantsAPI extends Api {
  public get() {
    return this.r({
      method: 'GET',
      url: '/restaurants',
    });
  }

  public getById(id: string) {
    return this.r({
      method: 'GET',
      url: `/restaurants/${id}`,
    });
  }
}

export default function(request: ReqType): RestaurantsAPI {
  return new RestaurantsAPI(request);
}
