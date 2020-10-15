/*
 * @Author: SongYijie
 * @Date: 2020-06-09 11:30:43
 * @LastEditors: SongYijie
 */ 
export function pageResponseVoSuccess(current, pageSize, total, data) {
  return {
    code: 200,
    current,
    pageSize,
    total,
    data
  };
}

export function responseVoSuccess(data = 'success') {
  return {
    code: 200,
    data
  };
}

export function responseVoFail(message = 'fail', code = 201) {
  return {
    code,
    message
  };
}
