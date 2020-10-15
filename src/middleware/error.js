/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:26:48
 * @LastEditors: SongYijie
 */ 
import { message as messaegAntd } from 'antd';
import { replace } from 'connected-react-router';

const codeMessage = {
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行操作',
  401: '登录超时',
  403: '用户未得到授权',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
  600: '未知错误'
};

const getMsgFromStatus = code => {
  
  const message = codeMessage[code];

  return message;
};

export default store => next => action => {
  const { suppressError, code, message } = action;
  const { router = {} } = store.getState();
  const { pathname } = (router && router.location) || {};
  const isNotLogin = [401, 403, 5001].indexOf(code) > -1;

  if (isNotLogin && pathname !== '/logout' && pathname !== '/login') {
    messaegAntd.error('登录超时, 请登录');
    store.dispatch(replace('/login'));
  } else if (code !== 200 && message && !suppressError) {
    const msg = getMsgFromStatus(code) || message;
    messaegAntd.error(msg);
  }
  return next(action);
};
