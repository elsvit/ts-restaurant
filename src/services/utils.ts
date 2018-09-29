import flattenDeep from 'lodash-es/flattenDeep';
import get from 'lodash-es/get';
import { IRestaurant } from '../store/restaurants';

export const filterRestaurants = (restaurants: IRestaurant[], value: string) => {
  if (value === '' || value === null || value === undefined) {
    return restaurants;
  }
  if (!restaurants) {
    return [];
  }
  const filteredRestaurants = restaurants.filter((restaurant: IRestaurant) => {
    const arrKeys = Object.keys(restaurant).map(val => restaurant[val]);
    const arr = arrKeys.map(o1 => {
      if (typeof o1 === 'object' && o1 !== null) {
        return Object.keys(o1).map(o2 => o1[o2]);
      }
      return o1;
    });
    const res = flattenDeep(arr).some(el => String(el).toLowerCase().includes(value.toLowerCase()));
    return res;
  });
  return filteredRestaurants;
};

export const sortRestaurants = (restaurantsIn: IRestaurant[], value: string) => {
  if (value === '' || value === null || value === undefined) {
    return restaurantsIn;
  }
  if (!restaurantsIn) {
    return [];
  }
  const restaurants = restaurantsIn;
  restaurants.sort((a: IRestaurant, b: IRestaurant) => {
    const aValue = get(a, value, '');
    const bValue = get(b, value, '');
    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }
    return 0;
  });
  return restaurants;
};
