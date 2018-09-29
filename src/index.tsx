import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';
import configApi from './constants/api';
// import registerServiceWorker from './registerServiceWorker';
import configureApi from './services/api';
import store from './store';

configureApi(`${configApi.baseURL}${configApi.apiPath}`);

ReactDOM.render(
  (
    <Provider store={store}>
      <App/>
    </Provider>
  ),
  document.getElementById('root') as HTMLElement,
);
// registerServiceWorker();
