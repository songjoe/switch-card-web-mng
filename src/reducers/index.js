/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:29:57
 * @LastEditors: SongYijie
 */ 
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import filter from './filter';
import meta from './meta';
import entities from './entities';
import system from './system';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  filter,
  meta,
  entities,
  system
});

export default createRootReducer
