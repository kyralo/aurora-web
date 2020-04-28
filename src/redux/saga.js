/*
* @Author: 王宸
* @Date:   2019-12-28 15:46:58
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-18 14:37:49
*/
import { fork } from 'redux-saga/effects'


import userSaga from '@store/user/userSaga'
import loginSaga from '@store/login/loginSaga'
import searchSaga from '@store/search/searchSaga'
import videoSaga from '@store/video/videoSaga'




export default function* Saga() {
  yield fork(userSaga);
  yield fork(loginSaga);
  yield fork(searchSaga);
  yield fork(videoSaga);
}