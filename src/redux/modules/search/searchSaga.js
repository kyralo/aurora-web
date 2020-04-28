/*
* @Author: 王宸
* @Date:   2019-12-28 15:46:23
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-24 09:54:03
*/

/**
 * put : saga -> reducer
 * take... : 监听action
 */


import { 
	put,
    takeEvery,
	takeLatest
} from 'redux-saga/effects'

// import { history } from 'react-router-redux';


import { 
    SEARCH_INFO_GET
} from './actionTypes'

import {
	searchInfoChange
} from './actionCreators'

import { history } from '@utils/history';

import axios from '@utils/axios'

import {
  message,
} from 'antd';

export default function* searchSaga(){
    yield takeLatest(SEARCH_INFO_GET, action => searchInfoGet(action));
}

function* searchInfoGet(action){

    if (action.word === '') {
        let payload = {
            users: [],
            videos: [],
            word: ''
        }

        yield put(searchInfoChange(payload))
    }else{
        let word = action.word
        let res = yield axios({
            method: "get",
            url: "/search/mulities",
            params: {
                word: word
            }
        })

        if (res) {
            yield put(searchInfoChange(res))
        }
    }

    history.replace('/aurora/search')
}

