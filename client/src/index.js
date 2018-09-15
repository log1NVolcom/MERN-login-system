import React from 'react';
import ReactDOM from 'react-dom';
import store from './configureStore';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import Routes from './Routes';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
