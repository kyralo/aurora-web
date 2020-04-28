/*
* @Author: 王宸
* @Date:   2019-12-28 15:46:23
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-27 00:15:56
*/

/**
 * put : saga -> reducer
 * take... : 监听action
 */


import { 
	put,
	takeLatest,
} from 'redux-saga/effects'

import { 
	USER_INFO_UPDATE,
	USER_INFO_CHANGE,
	USER_INFO_REQ,

    USER_COMMENT_LEVEL1_ADD,
    USER_COMMENT_LEVEL1_REQ,
    USER_COMMENT_LEVEL2_ADD,
    USER_COMMENT_LEVEL2_REQ,
    USER_COMMENT_PUT
} from './actionTypes'

import {
	userInfoChange,
    userCommentLevel1Change,
    userCommentLevel2Change,
    userCommentLevel1Add,
    userCommentLevel2Add,
    userCommentPut,
} from './actionCreators'

import axios from '@utils/axios'

import { history } from '@utils/history';

import {
  message,
} from 'antd';


export default function* userSaga(){
    yield takeLatest(USER_INFO_REQ , action => infoReq(action));
    yield takeLatest(USER_INFO_UPDATE, action => userInfoUpdateReq(action));

    yield takeLatest(USER_COMMENT_LEVEL1_ADD, action => commentLevel1Add(action));
    yield takeLatest(USER_COMMENT_LEVEL1_REQ, action => commentLevel1Req(action));
    yield takeLatest(USER_COMMENT_LEVEL2_ADD, action => commentLevel2Add(action));
    yield takeLatest(USER_COMMENT_LEVEL2_REQ, action => commentLevel2Req(action));
    yield takeLatest(USER_COMMENT_PUT, action => commentActionPut(action));
}

function* infoReq(action){

    let Authorization =  window.localStorage.getItem('Authorization')
    if (!Authorization || Authorization === 'null') {
        history.replace('/login')
        return
    }

    let res = yield axios({
    	method: "get",
    	url: "/user",
        headers: { 
            'Authorization': Authorization,
        },
    })
    if (res) {
        yield put(userInfoChange(res))
    }else{
        
    }
}

function* userInfoUpdateReq(action){

    let Authorization =  window.localStorage.getItem('Authorization')
    if (!Authorization || Authorization === 'null') {
        history.replace('/login')
        return
    }
    
    let user_info = action.user_info 
    let res = yield axios({
    	method: "put",
    	url: "/user",
    	data: user_info,
        headers: { 
            Authorization: Authorization,
        },
    })

}

function* commentLevel1Req(action){

    let res = yield axios({
        method: "get",
        url: "/user_comment/level1/" + action.video_id,
        headers: { 
            Authorization: window.localStorage.getItem('Authorization'),
        },
    });

    if (res) {
        yield put(userCommentLevel1Change(res))
    }else{
        
    }
}

function* commentLevel1Add(action){
    let Authorization =  window.localStorage.getItem('Authorization')
    if (!Authorization || Authorization === 'null') {
        history.replace('/login')
        return
    }

    let res = yield axios({
        method: "post",
        url: "/user_comment",
        data: {
            videoId: action.user_comment.video_id,
            commentContent: action.user_comment.comment_content,
        },
        headers: {
            Authorization: Authorization
        }
    });

    yield commentLevel1Req({
        video_id: action.user_comment.video_id
    });
}

function* commentLevel2Req(action){

    let res = yield axios({
        method: "get",
        url: "/user_comment/level2/" + action.user_comment.video_id,
        params: {
            ancestryId: action.user_comment.ancestry_id,
        },
        headers: { 
            Authorization: window.localStorage.getItem('Authorization'),
        },
    });    

    if (res) {
        yield put(userCommentLevel2Change({
            index: action.user_comment.index,
            comment_level2_list: res,
        }))
    }else{
        
    }
}

function* commentLevel2Add(action){

    let Authorization =  window.localStorage.getItem('Authorization')
    if (!Authorization || Authorization === 'null') {
        history.replace('/login')
        return
    }

    let index = action.user_comment.index;

    let res = yield axios({
        method: "post",
        url: "/user_comment",
        data: {
            ancestryId: action.user_comment.ancestryId,
            answerId: action.user_comment.answerId,
            videoId: action.user_comment.videoId,
            commentContent: action.user_comment.commentContent,
        },
        headers: {
            Authorization: Authorization
        }
    });
    
    yield commentLevel2Req({
        user_comment: {
            index: index,
            ancestry_id: action.user_comment.ancestryId,
            video_id: action.user_comment.videoId,
        }
    });
}

function* commentActionPut(action){

    let Authorization =  window.localStorage.getItem('Authorization')
    if (!Authorization || Authorization === 'null') {
        history.replace('/login')
        return
    }

    let id = action.user_comment.id
    let ancestryId = action.user_comment.ancestryId
    let videoId = action.user_comment.videoId

    let res = yield axios({
        method: "put",
        url: "/user_comment/action",
        params: {
            id: id,
            action: action.user_comment.action
        },
        headers: {
            Authorization: Authorization
        }
    });

    if (ancestryId == null || ancestryId === '') {
        yield commentLevel1Req({
            video_id: videoId
        })
    }else{
        yield commentLevel2Req({
            user_comment: {
                video_id: videoId,
                ancestry_id: ancestryId
            }
        })
    }

}
