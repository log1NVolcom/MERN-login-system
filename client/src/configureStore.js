import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';

const initialState = {
  User: {
    loginData: localStorage.getItem('userToken'),
  },
};

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, logger),
);
export default store;
