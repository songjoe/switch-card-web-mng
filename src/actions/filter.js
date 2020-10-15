/*
 * @Author: SongYijie
 * @Date: 2020-06-10 14:32:25
 * @LastEditors: SongYijie
 */ 
import { UPDATE_FILTER } from '@/constants/actionTypes';

export const updateFilter = (key, payload, reserved) => ({ // eslint-disable-line
  type: UPDATE_FILTER,
  key,
  payload,
  reserved
});
