/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:29:57
 * @LastEditors: SongYijie
 */
import { UPDATE_FILTER } from '@/constants/actionTypes';

const DEFAULT_FILTER = {
  users: {},
  goods: {}
};

const filter = (state = DEFAULT_FILTER, {
  type, key, payload
}) => {
  if (type === UPDATE_FILTER && [...Object.keys(state)].indexOf(key) > -1) {
    switch (key) {
      default:
        return {
          ...state,
          [key]: {
            ...DEFAULT_FILTER[key],
            ...payload
          }
        };
    }
  }

  return state;
};

export default filter;
