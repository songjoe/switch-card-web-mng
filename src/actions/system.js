/*
 * @Author: SongYijie
 * @Date: 2020-06-11 15:31:52
 * @LastEditors: SongYijie
 */ 
import { TOGGLE_COLLAPSED } from '../constants/actionTypes';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';

import { CALL_API } from '@/middleware/api';
import { SIGNIN } from '@/constants/actionTypes';

export const onToggleCollapsed = () => ({ // eslint-disable-line
  type: TOGGLE_COLLAPSED
});

// sign in request
export const signInReq = payload => ({
  [CALL_API]: {
    type: SIGNIN,
    endpoint: '/login',
    method: 'POST',
    payload
  }
});

export const signIn = payload => async dispatch => {
  const { code, response: { token, userName, role } } = await dispatch(signInReq(payload));

  if (code === 200) {
    const expireDays = payload.remember ? 365 : 1;
    let account = {userName, role};
    account = JSON.stringify(account);
  
    if (token) {
      Cookies.set('token', token, {
        expires: expireDays
      });
      Cookies.set('account', account, { expires: payload.remember ? 365 : 1 });
    }
    dispatch(replace('/home'));
  }
};

