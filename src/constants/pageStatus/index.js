/*
 * @Author: SongYijie
 * @Date: 2020-06-12 10:04:33
 * @LastEditors: SongYijie
 */
import React from 'react';
import { Select } from 'antd';

import { errInfo } from './exception';
import { UserCardType } from './user';
import { GoodsState } from './goods';

const{ Option } = Select;

/**
 * @description: 根据 map 获取 lable
 * @param map 词典
 * @param value 值
 * @return: 对应的值或者 无
 */
export const getLabel = (map, value, noneInfo = '无') => map[value] || noneInfo;

/**
 * @description: 根据 map 生成 Option
 * @param map 词典
 * @return: <Option></Option>
 */
export const getOption = map => (
  Object.entries(map).map((state) => (
    <Option value={state[0]} key={state[0]}>{state[1]}</Option>
  ))
)

export {
  errInfo,
  UserCardType,
  GoodsState
}