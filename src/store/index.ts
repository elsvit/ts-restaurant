import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';

import auth, { AuthStateT } from './auth';
import common, { CommonStateT } from './common';
import restaurants, { RestaurantsStateT } from './restaurants';

const reducers = combineReducers({
  auth,
  common,
  restaurants,
});

export interface IAppState {
  auth: AuthStateT;
  common: CommonStateT;
  restaurants: RestaurantsStateT;
}

const sagaMiddleware = createSagaMiddleware();
//tslint:disable:max-line-length
//tslint:enable:max-line-length
const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagas.forEach((saga: any) => sagaMiddleware.run(saga));

export default store;
