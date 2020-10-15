/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:29:57
 * @LastEditors: SongYijie
 */ 
// Updates an entity cache in response to any action with response.entities.
const initState = {
  users: [],
  usersIds: [],
  goods: [],
  goodsIds: []
};

const entities = (state = initState, action) => {

  if (action.response && action.response.entities) {
    const { result, key } = action.response;
    let data = {
      ...action.response.entities[key]
    };
    let ids = [...state[`${key}Ids`]];

    if (Array.isArray(result)) {
      ids = [...result];
    }
    if (typeof result === 'string') {
      if (ids.indexOf(result) < 0) {
        // add new
        ids = [result, ...ids];
        data = {
          ...data,
          ...state[key]
        };
      } else {
        data = {
          [result]: {
            ...state[key][result],
            ...data[result]
          }
        };
        data = {
          ...state[key],
          ...data
        };
      }
    }

    return {
      ...state,
      [key]: data,
      [`${key}Ids`]: ids
    };
  }

  return state;
};

export default entities;
