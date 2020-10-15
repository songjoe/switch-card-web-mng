/*
 * @Author: SongYijie
 * @Date: 2020-05-29 11:31:06
 * @LastEditors: SongYijie
 */ 
/* eslint-disable import/extensions */
import React, { lazy } from 'react';
import  { HomeOutlined, TeamOutlined, ShoppingOutlined, FileExcelOutlined } from '@ant-design/icons';

import BlankLayout from '@/layouts/BlankLayout';
import BasicLayout from '@/layouts/BasicLayout';

const handleIcon = type => (
  React.createElement(
    type,
    {
      style:{ fontSize: '16px' }
    }
  )
)

const config = [
  {
    path: '/',
    component: BlankLayout, // 空白页布局
    childRoutes: [
      // 子菜单路由
      {
        path: '/login', // 路由路径
        name: '登录', // 菜单名称 (不设置,则不展示在菜单栏中）
        component: lazy(() => import('@/pages/Login')) // 懒加载 路由组件
      },
      {
        path: '/',
        component: BasicLayout, // 基本布局
        childRoutes: [
          {
            path: '/home',
            name: '首页',
            icon: handleIcon(HomeOutlined),
            component: lazy(() => import('@/pages/Home'))
          },
          {
            path: '/user',
            name: '用户中心',
            icon: handleIcon(TeamOutlined),
            exact: true,
            component: lazy(() => import('@/pages/User'))
          },
          {
            path: '/user/detail/:userInfo',
            name: '用户详情',
            hideInMenu: true,
            exact: true,
            component: lazy(() => import('@/pages/User/Detail'))
          },
          {
            path: '/goods',
            name: '商品中心',
            icon: handleIcon(ShoppingOutlined),
            exact: true,
            component: lazy(() => import('@/pages/Goods'))
          },
          {
            path: '/goods/detail/:goodsInfo',
            name: '商品详情',
            hideInMenu: true,
            exact: true,
            component: lazy(() => import('@/pages/Goods/Detail'))
          },
          {
            path: '/js-xlsx',
            name: 'js-xlsx',
            icon: handleIcon(FileExcelOutlined),
            exact: true,
            component: lazy(() => import('@/pages/JsXlsx/index.js'))
          },
          {
            path: '/exception/:errCode',
            name: '异常',
            hideInMenu: true,
            component: lazy(() => import('@/pages/Exception'))
          },
          { path: '/', exact: true, redirect: '/home' },
          { path: '*', exact: true, redirect: '/exception/404' }
        ]
      }
    ]
  }
];

export default config;
