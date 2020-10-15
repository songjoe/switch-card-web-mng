/*
 * @Author: SongYijie
 * @Date: 2020-06-09 11:31:53
 * @LastEditors: SongYijie
 */ 
import express from 'express';
import faker from 'faker';

import { pageResponseVoSuccess } from '../utils';
import { getUserPageList } from './../schema/users';

const router = express.Router();

router.get('/', (req, res) => {
  const { current = 1, pageSize = 10 } = req.query;
  res.json(pageResponseVoSuccess(
    +current,
    +pageSize,
    faker.random.number({ min: 50, max: 500 }),
    getUserPageList(+pageSize)
  ));
});

export default router;
