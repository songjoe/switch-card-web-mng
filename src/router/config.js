/*
 * @Author: SongYijie
 * @Date: 2020-05-29 11:31:06
 * @LastEditors: SongYijie
 */ 
/* eslint-disable import/extensions */
import { lazy } from 'react';

import BlankLayout from '@/layouts/BlankLayout';

const config = [
  {
    path: '/',
    component: BlankLayout, // 空白页布局
    childRoutes: [
      // 子菜单路由
      {
        path: '/login', // 路由路径
        name: '登录', // 菜单名称 (不设置,则不展示在菜单栏中）
        component: lazy(() => import('@/pages/Login')), // 懒加载 路由组件
      },
    ],
  },
];

export default config;
