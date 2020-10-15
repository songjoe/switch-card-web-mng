/*
 * @Author: SongYijie
 * @Date: 2020-06-10 17:15:07
 * @LastEditors: SongYijie
 */ 
import { schema } from 'normalizr';

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.id
});

const goodsSchema = new schema.Entity('goods', {}, {
  idAttribute: good => good.id
});

// Schemas= for API responses.
const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  GOOD: goodsSchema,
  GOOD_ARRAY: [goodsSchema]
};

export default Schemas
