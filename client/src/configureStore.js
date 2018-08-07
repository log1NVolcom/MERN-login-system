import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";

const configureStore = () => {
  const midlewares = [thunkMiddleware, logger];
  const store = createStore(rootReducer, applyMiddleware(...midlewares));

  return store;
};
export default configureStore;

/*const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;*/
