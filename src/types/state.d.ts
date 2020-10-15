/*
 * @Author: SongYijie
 * @Date: 2020-05-29 16:29:27
 * @LastEditors: SongYijie
 */ 

import { IMeta } from './table';
export interface IState {
  entities: {
    users: Array[object];
    usersIds: Array[string];
    goods: Array[object];
    goodsIds: Array[string];
  };
  filter: {
    users: object;
    goods: object;
  };
  index: object;
  meta: {
    users: IMeta;
    goods: IMeta
  };
  system: {
    isLoading: boolean,
    collapsed: boolean
  };
}