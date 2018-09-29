export const GET_RESTAURANTS: 'restaurants/GET' = 'restaurants/GET';
export const GET_RESTAURANTS_SUCCESS: 'restaurants/GET_SUCCESS' = 'restaurants/GET_SUCCESS';
export const GET_RESTAURANT: 'restaurants/GET_RESTAURANT' = 'restaurants/GET_RESTAURANT';
export const GET_RESTAURANT_SUCCESS: 'restaurants/GET_RESTAURANT_SUCCESS' = 'restaurants/GET_RESTAURANT_SUCCESS';

export type RestaurantsApiT =
  | typeof GET_RESTAURANTS
  | typeof GET_RESTAURANTS_SUCCESS
  | typeof GET_RESTAURANT
  | typeof GET_RESTAURANT_SUCCESS
  ;

export interface IRestaurant {
  id: string;
  general?: {
    name?: string;
    open?: boolean;
    reachable?: boolean;
    categories?: string[];
    online?: boolean;
    tags?: string[];
    logo_uri?: string;
  };
  address: {
    latitude?: number;
    longitude?: number;
    zipcode?: string;
    street_name?: string;
    street_number?: string;
    city?: string;
    city_slug?: string;
    state?: string;
    country?: string;
    etage?: string;
    door?: string;
    tags?: string[];
    comments?: string;
    company?: string;
    name?: string;
    lastname?: string;
  };
  rating: {
    average?: number;
    star1?: number;
    star2?: number;
    star3?: number;
    star4?: number;
    star5?: number;
  };
  min_order_value?: number;
}

export interface IRestaurantsPagination {
  total_items?: number;
  total_pages?: number;
  limit?: number;
  page?: number;
  offset?: number;
}

export interface IRestaurantAll {
  info: {
    name: string;
    logoUri: string;
    tags: string[];
    categories: string[];
  };
  general: {
    owner: string;
    managingDirectors: string;
    companyName: string;
    description: string;
    invoiceAddress: string;
  };
  offers: {};
  sections: {
    id: number;
    name: string;
    items: {
      id: number;
      name: string;
      price: number;
      description: string;
      picture: string;
    }[];
  }[];
  rating: {
    [key: string]: number;
  };
  status: string;
  openingTimes: {
    start: string;
    end: string;
  }[];
  minOrderValue: number;
  delivery: {
    status: string;
    fee: {
      threshold: number;
      amount: number;
      applyAlways: boolean;
    };
  };
  paymentMethods: {
    id: string;
    name: string;
  }[];
  address: {
    citySlug: string;
    zipcodeSlug: string;
    streetName: string;
    zipcode: string;
    phone: string;
    city: string;
    district: string;
    streetNumber: string;
    country: string;
    districtSlug: string;
    longitude: number;
    latitude: number;
    state: string;
  };
  timezone: string;
  popularItemSection: {
    id: string;
    description: string;
    imageUrl: string;
    name: string;
    items: [];
  };
}

export interface IRestaurantsState {
  data: Maybe<IRestaurant>[];
  pagination: Maybe<IRestaurantsPagination>;
  restaurant: Maybe<IRestaurantAll>;
}

export type RestaurantsStateT = Readonly<IRestaurantsState>;

export type GetRestaurantsResponseT = Partial<IRestaurantsState>;
export type GetRestaurantResponseT = Partial<IRestaurantsState>;

interface GetRestaurantsAction {
  type: typeof GET_RESTAURANTS;
}

interface GetRestaurantsSuccessAction {
  type: typeof GET_RESTAURANTS_SUCCESS;
  restaurants: GetRestaurantsResponseT;
}

interface GetRestaurantAction {
  type: typeof GET_RESTAURANT;
}

interface GetRestaurantSuccessAction {
  type: typeof GET_RESTAURANT_SUCCESS;
  restaurant: GetRestaurantResponseT;
}

type RestaurantsActions =
  | GetRestaurantsAction
  | GetRestaurantsSuccessAction
  | GetRestaurantAction
  | GetRestaurantSuccessAction
  ;

const initialState: IRestaurantsState = {
  data: [],
  pagination: null,
  restaurant: null,
};

export default function reducer(state = initialState, action: RestaurantsActions) {
  switch (action.type) {
    case GET_RESTAURANTS_SUCCESS:
      return {
        ...state,
        data: action.restaurants.data,
        pagination: action.restaurants.pagination,
      };

    case GET_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurant: action.restaurant,
      };

    default:
      return state;
  }
}

export const getRestaurants = () => ({ type: GET_RESTAURANTS });

export const getRestaurantsSuccess = (restaurants: GetRestaurantsResponseT) => ({
  restaurants,
  type: GET_RESTAURANTS_SUCCESS,
});

export const getRestaurant = (id: string) => ({ type: GET_RESTAURANT, id });

export const getRestaurantSuccess = (restaurant: GetRestaurantResponseT) => ({
  restaurant,
  type: GET_RESTAURANT_SUCCESS,
});
