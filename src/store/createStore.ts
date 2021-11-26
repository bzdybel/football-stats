import { combineReducers, createStore } from 'redux';
import general from './reducers/general';

export const store = createStore(
  combineReducers({
    general: general || (() => null),
  }),
);
