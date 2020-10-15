/*
 * @Author: SongYijie
 * @Date: 2020-06-09 11:31:53
 * @LastEditors: SongYijie
 */ 
import express from 'express';
import faker from 'faker';

import { responseVoSuccess } from '../utils';

const router = express.Router();

router.post('/', (req, res) => {
  const { userName } = req.body;
  const token = faker.random.uuid();

  res.json(responseVoSuccess({
    token: `${userName}_${token}`,
    userName,
    role: 'admin'
  }));
});

export default router;
