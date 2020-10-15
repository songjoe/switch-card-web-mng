/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:30:40
 * @LastEditors: SongYijie
 */ 
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from '@/reducers';
import api from '@/middleware/api';
import error from '@/middleware/error';
import filter from '@/middleware/filter';
import history from './history';

const composeEnhancers = window.__RhistoryEDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const isDev = process.env.NODE_ENV === 'development';
const loggerMiddleware = isDev ? [createLogger()] : [];

const configureStore = () => {
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), thunk, api, error, filter, ...loggerMiddleware)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
