/*
 * @Author: SongYijie
 * @Date: 2020-06-09 11:31:53
 * @LastEditors: SongYijie
 */ 
import express from 'express';
import faker from 'faker';

import { pageResponseVoSuccess, responseVoSuccess } from '../utils';
import { getGoodsPageList, getGoodsCommentsPageList, getGoodsLogistics } from './../schema/goods';

const router = express.Router();

router.get('/', (req, res) => {
  const { current = 1, pageSize = 10 } = req.query;
  res.json(pageResponseVoSuccess(
    +current,
    +pageSize,
    faker.random.number({ min: 50, max: 500 }),
    getGoodsPageList(+pageSize)
  ));
});

router.post('/closeOrder', (_, res) => {
  res.json(responseVoSuccess());
});

router.get('/comments', (req, res) => {
  const { current = 1, pageSize = 10 } = req.query;
  res.json(pageResponseVoSuccess(
    +current,
    +pageSize,
    faker.random.number({ min: 50, max: 500 }),
    getGoodsCommentsPageList(+pageSize)
  ));
});

router.get('/logistics', (_, res) => {
  res.json(responseVoSuccess(getGoodsLogistics()));
});

router.post('/comments/check', (_, res) => {
  res.json(responseVoSuccess());
});

export default router;
