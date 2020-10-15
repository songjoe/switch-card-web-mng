/*
 * @Author: SongYijie
 * @Date: 2020-06-10 15:17:49
 * @LastEditors: SongYijie
 */ 
import { TOGGLE_COLLAPSED } from '@/constants/actionTypes';
const system = (
  state = {
    isLoading: false,
    collapsed: false
  },
  action
) => {
  const {
    type, isLoading
  } = action;

  if (typeof isLoading === 'boolean') {
    state.isLoading = isLoading;
  }
  switch (type) {
    case TOGGLE_COLLAPSED: 
      return {
        ...state,
        collapsed: !state.collapsed,
      }
    default:
      return {
        ...state
      };
  }
};

export default system;
