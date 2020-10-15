/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:37:12
 * @LastEditors: SongYijie
 */ 
import { CALL_API } from '@/middleware/api';
import { GET_USER_PAGELIST } from '@/constants/actionTypes';
import Schemas from '@/constants/entities';

export const getUserPageList = options => dispatch => (
  dispatch({
    [CALL_API]: {
      type: GET_USER_PAGELIST,
      schema: Schemas.USER_ARRAY,
      endpoint: '/users',
      options
    }
  })
)
