/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:26:48
 * @LastEditors: SongYijie
 */ 

export default store => next => action => {
  const newAction = {};

  return next({
    ...action,
    ...newAction
  });
};
