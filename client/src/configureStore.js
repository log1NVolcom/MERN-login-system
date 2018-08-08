import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from "./reducers";


const logger = createLogger();

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, 
    logger 
  )
)
 
export default store;