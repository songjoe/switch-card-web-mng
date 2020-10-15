/*
 * @Author: SongYijie
 * @Date: 2020-06-18 11:22:45
 * @LastEditors: SongYijie
 */ 

/* eslint-disable */
export const defaultValidateMessages = {
  default: '${label}不符合要求',
  required: '${label}不能为空',
  whitespace: '${label}不能是空白字符',
  enum: '${label}必须是其中一个 [${enum}]',
  date: {
    format: '${label}不是正确的时间格式',
    parse: '${label}不能被解析为时间格式',
    invalid: '${label}不是时间格式'
  },
  types: {
    string: '${label}必须是 字符',
    method: '${label}必须是 方法',
    array: '${label}必须是 数组',
    object: '${label}必须是 对象',
    number: '${label}必须是 数字',
    date: '${label}必须是 时间格式',
    boolean: '${label}必须是 布尔类型',
    integer: '${label}必须是 整数',
    float: '${label}必须是 小数',
    regexp: '${label}必须是 正则表达式',
    email: '${label}必须是 邮箱格式',
    url: '${label}必须是 链接类型',
    hex: '${label}必须是 颜色类型'
  },
  string: {
    len: '${label}必须是${len}个字符',
    min: '${label}必须不少于${min}个字符',
    max: '${label}不能不大于${max}个字符',
    range: '${label}字符数需要在${min}和${max}之间'
  },
  number: {
    len: '${label}必须是${len}',
    min: '${label}必须不小于${min}',
    max: '${label}必须不大于${max}',
    range: '${label}必须在${min}和${max}之间'
  },
  array: {
    len: '${label}数组长度必须是${len}',
    min: '${label}数组长度不小于${min}',
    max: '${label}数组长度不大于${max}',
    range: '${label}数组长度必须在${min}和${max}之间'
  },
  pattern: {
    mismatch: '${label}不符合改正则表达式:${pattern}'
  }
};