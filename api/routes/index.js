/*
 * @Author: SongYijie
 * @Date: 2020-06-09 11:26:28
 * @LastEditors: SongYijie
 */ 
import express from 'express';
import login from './login';
import users from './users';
import goods from './goods';

const router = express.Router();

router.use((req, res, next) => {
  // if (
  //   req.path !== '/login') {
  //   return res.status(403).send({
  //     result: {
  //       message: '登录超时,请重新登录'
  //     }
  //   });
  // }

  return next();
});

router.use('/login', login);
router.use('/users', users);
router.use('/goods', goods);

export default router;
