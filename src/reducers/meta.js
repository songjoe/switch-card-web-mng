/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:29:57
 * @LastEditors: SongYijie
 */ 
const meta = (
  state = {
    users: {},
    goods: {}
  },
  action
) => {
  const { meta: actionMeta, key, method, isOk } = action;

  if (actionMeta && Object.keys(actionMeta).length > 0 && key) {
    return {
      ...state,
      [key]: {
        ...actionMeta
      }
    };
  } else if (isOk && method === 'POST' && action.response && action.response.entities) {
    const { result, entities } = action.response;
    if (key && result && entities[key]) {
      // post add new
      let { total } = state[key];
      if (total) {
        total += 1;
        return {
          ...state,
          [key]: {
            ...state[key],
            total
          }
        };
      }
    }
  }

  return state;
};

export default meta;
