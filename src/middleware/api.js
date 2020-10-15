import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';

import { queryToString, trim } from '@/utils';
import { API_URL } from '@/config/apiUrl';
import { NETWORK_TIMEOUT_MS } from '@/config';
import { message } from 'antd';

const formatUrl = (action = {}) => {
  const {
    endpoint, options = {}
  } = action;
  options.total !== undefined && delete options.total;
  const query = queryToString(options);
  const apiUrl = API_URL;
  let url = endpoint;

  if (endpoint.indexOf('http') < 0) {
    url = `${apiUrl}${endpoint}`;
  }

  if (query) {
    url = `${url}?${query}`;
  }
  return url;
};

function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      message.error('请求超时')
    }, ms);

    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

const textFetch = async url => {
  try {
    const response = await timeoutPromise(NETWORK_TIMEOUT_MS, fetch(url));
    const isError = !response.ok;

    if (isError) {
      const error = {
        code: response.status,
        mesage: response.statusText
      };

      throw error;
    }

    const text = await response.text();

    return {
      code: 200,
      data: text
    };
  } catch (err) {
    const error = typeof err === 'string'
      ? {
        code: 600,
        messgae: err
      }
      : err;

    return Promise.reject(error);
  }
};

const jsonFetch = async (url, config, schema) => {
  try {
    const response = await timeoutPromise(NETWORK_TIMEOUT_MS, fetch(url, config));
    let json = {};

    if (response.ok) {
      json = await response.json();

      if (json.code && json.code !== 200) {
        const error = {
          message: json.message,
          code: json.code
        };

        throw error;
      }
    } else {
      const error = {
        code: response.status,
        message: response.statusText
      };

      throw error;
    }

    const camelizedJson = camelizeKeys(json);
    const {
      current = 1, pageSize = 10, data, total
    } = camelizedJson;
    let pageData = data === false ? false : (data || {});
    const meta = {
      current,
      pageSize,
      total
    };

    Object.keys(meta).forEach(k => {
      if (meta[k] === undefined) {
        delete meta[k];
      }
    });

    return schema
      ? {
        key: Array.isArray(schema) ? schema[0]._key : schema._key,
        meta,
        data: {
          key: Array.isArray(schema) ? schema[0]._key : schema._key,
          ...normalize(pageData, schema)
        },
        method: config.method
      }
      : {
        key: '',
        meta,
        data: pageData,
        method: config.method
      };
  } catch (err) {
    const error = typeof err === 'string'
      ? {
        code: 600,
        message: err
      }
      : err;

    return Promise.reject(error);
  }
};

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache'
};
let callsNum = 0;

// Fetches an API response.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (action, schema, store) => {
  const {
    endpoint, method, fetchType = 'json', payload, formData
  } = action;

  if (fetchType === 'text') {
    return textFetch(endpoint);
  }
  if (payload) {
    payload.total !== undefined && delete payload.total;
    for ( let value in payload) {
      payload[value] = trim(payload[value], 2);
    }
  }

  const token = Cookies.get('token');
  if (!token && endpoint !== '/login') {
    message.error('请登录')
    store.dispatch(replace('/login'));
  }
  const url = formatUrl(action);
  const config = {
    headers: {
      ...(formData ? {} : DEFAULT_HEADERS),
      ...(token ? { token } : {})
    },
    method: method || 'GET',
    body: formData || JSON.stringify(payload)
  };

  if (config.method === 'GET' || config.method === 'DELETE') {
    delete config.body;
  }

  return jsonFetch(url, config, schema);
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => async action => {

  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const {
    schema, type, suppressError, suppressPrompt, suppressLoading
  } = callAPI;
  const types = [type, `${type}_SUCCESS`, `${type}_FAILURE`];

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;

  if (!suppressLoading) {
    callsNum += 1;
  }

  next(actionWith({ type: requestType, isLoading: callsNum > 0 }));

  try {
    const response = await callApi(callAPI, schema, store);
    const { meta, data, key, method } = response;

    if (!suppressLoading) {
      callsNum -= 1;
    }

    const nextAction = {
      code: 200,
      isOk: true,
      suppressPrompt,
      key,
      response: data,
      type: successType,
      method,
      isLoading: callsNum > 0
    };

    if (meta && Object.keys(meta).length > 0) {
      nextAction.meta = meta;
    }

    return next(actionWith(nextAction));
  } catch (error) {
    if (!suppressLoading) {
      callsNum -= 1;
    }

    const nextAction = {
      isOk: false,
      suppressError,
      type: failureType,
      message: error.message || '网络错误',
      code: error.code,
      isLoading: callsNum > 0
    };

    return next(actionWith(nextAction));
  }
};
