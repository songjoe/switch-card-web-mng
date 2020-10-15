/*
 * @Author: SongYijie
 * @Date: 2020-06-09 15:03:08
 * @LastEditors: SongYijie
 */

import querystring from "querystring";
import moment from "moment";

import { isString } from "./typeTest";

export const queryToString = (query = {}) => {
  const filteredObj = Object.keys(query)
    .filter(
      (key) =>
        typeof query[key] !== "undefined" &&
        query[key] !== "" &&
        query[key] !== null
    )
    .reduce((obj, key) => {
      const trimValue = trim(query[key], 2);
      return {
        ...obj,
        [key]: trimValue,
      };
    }, {});
  return querystring.stringify(filteredObj);
};

export function urlToList(url) {
  const urllist = url.split("/").filter((i) => i);
  return urllist.map((_, index) => {
    return `/${urllist.slice(0, index + 1).join("/")}`;
  });
}

/**
 * @desc 时间戳转化为时间格式
 * @param time 时间戳
 * @param format 时间格式
 * @return {String} 时间格式 或者无
 */
export const getTimeFormat = (time, format = "YYYY-MM-DD HH:mm:ss") =>
  time ? moment(time).format(format) : "无";

/**
 * @desc 去除多余空格
 * @param { string } str 待处理字符串
 * @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
 * @return { string } 去除指定位置空格的字符串
 */
export function trim(str, type = 1) {
  if (!isString(str)) {
    return str;
  }
  switch (type) {
    case 1:
      return str.replace(/\s/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
  }
}
