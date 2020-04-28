/*
* @Author: 王宸
* @Date:   2019-12-28 15:46:49
* @Last Modified by:   王宸
* @Last Modified time: 2020-01-04 12:05:25
*/

import { combineReducers } from 'redux';

import user from '@store/user';
import video from '@store/video';
import home from '@store/home'
import fileup from '@store/fileup'
import search from '@store/search'

// 合并到主reducer
// combineReducers() 函数用于将分离的 reducer 合并为一个 reducer
const reducers = {
   user,
   video,
   home,
   fileup,
   search
};


export default combineReducers(reducers);
