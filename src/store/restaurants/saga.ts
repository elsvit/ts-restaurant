import { put, takeEvery } from 'redux-saga/effects';

import api from 'src/services/api';
import {
  GET_RESTAURANT,
  GET_RESTAURANTS,
  getRestaurantSuccess,
  getRestaurantsSuccess,
} from '.';

import { setError, setLoading } from '../common';

function* sagaGetRestaurants() {
  try {
    put(setLoading({ actionType: GET_RESTAURANTS, loading: true }));
    const res = yield api().restaurants.get();
    const data = res.data;
    if (data) {
      yield put(getRestaurantsSuccess(data));
    }
  } catch (err) {
    yield put(setError({ actionType: GET_RESTAURANTS, message: err.message }));
  }
  put(setLoading({ actionType: GET_RESTAURANTS, loading: false }));
}

function* sagaGetRestaurant({ id, type }: {id: string, type: typeof GET_RESTAURANT}) {
  console.log('sagaGetRestaurant id', id, 'type', type);
  try {
    put(setLoading({ actionType: type, loading: true }));
    const res = yield api().restaurants.getById(id);
    const data = res.data;
    if (data) {
      yield put(getRestaurantSuccess(data));
    }
  } catch (err) {
    console.log('saga error:', err);
    yield put(setError({ actionType: type, message: err.message }));
  }
  put(setLoading({ actionType: type, loading: false }));
}

export default function*(): Generator {
  yield takeEvery(GET_RESTAURANT, sagaGetRestaurant);
  yield takeEvery(GET_RESTAURANTS, sagaGetRestaurants);
}
