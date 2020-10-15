/*
 * @Author: SongYijie
 * @Date: 2020-06-19 13:53:00
 * @LastEditors: SongYijie
 */ 

/**
 * @desc 数据类型检测
 * @param obj 待检测的数据
 * @return {String} 类型字符串
 */
export function type (obj) {
  return typeof obj !== "object" ? typeof obj : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * @desc 是否是 Undefined 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
export function isUndefined(obj) {
  return obj === void 0;
}

/**
* @desc 是否是 Null 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isNull(obj) {
  return obj === null;
}

/**
* @desc 是否是 Boolean 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isBoolean(obj) {
  return typeof(obj) === 'boolean';
}

/**
* @desc 是否是 Number 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isNumber(obj) {
  return typeof(obj) === 'number';
}

/**
* @desc 是否是 String 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isString(obj) {
  return typeof(obj) === 'string';
}

/**
* @desc 是否是 Object 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
* @desc 是否是 Array 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isArray(obj){
  return Array.isArray?Array.isArray(obj):Object.prototype.toString.call(obj) === '[object Array]';
}

/**
* @desc 是否是 Function 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isFunction(obj){
  return typeof(obj) === 'function';
}

/**
* @desc 是否是 Date 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isDate(obj){
  return Object.prototype.toString.call(obj) === '[object Date]';
}

/**
* @desc 是否是 RegExp 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isRegExp(obj){
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

/**
* @desc 是否是 Error 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isError(obj){
  return Object.prototype.toString.call(obj) === '[object Error]';
}

/**
* @desc 是否是 Arguments 类型检测
* @param obj 待检测的数据
* @return {Boolean} 布尔值
*/
export function isArguments(obj){
  return Object.prototype.toString.call(obj) === '[object Arguments]';
}