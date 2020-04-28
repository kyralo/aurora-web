import axios from '@utils/axios'

import { 
	put,
	takeLatest,
} from 'redux-saga/effects'

import { 
	VIDEO_INFO_REQ,
	VIDEO_ACTION_REQ,
	VIDEO_AUTHOR_INFO_REQ,
	VIDEO_ACTION_COLLECTION_REQ 
} from './actionTypes'

import {
  videoChange,
  authorInfoChange
} from './actionCreators'

import { history } from '@utils/history';

export default function* videoSaga(){
    yield takeLatest(VIDEO_INFO_REQ, action =>videoInfoReq(action));
    yield takeLatest(VIDEO_AUTHOR_INFO_REQ, action =>videoAuthorInfoReq(action));
    yield takeLatest(VIDEO_ACTION_REQ, action =>videoActionReq(action));
    yield takeLatest(VIDEO_ACTION_COLLECTION_REQ, action =>videoActionCollectionReq(action));
}

function* videoInfoReq(action){

    let token = window.localStorage.getItem('Authorization')
    if (!token || token === 'null'){
        token = ''
    }

	let res = yield axios({
        method: "get",
        url: "/video/id/" + action.id,
        headers: {
            Authorization: token,
        }
    })

	if (res) {
        yield put(videoChange(res))
		let authorRes = yield axios({
                    method: "get",
                    url: "/user/author_id",
                    params: {
                      authorId: res.authorId
                    },
                  })
		if (authorRes) {
			yield put(authorInfoChange(authorRes))
		}
    }
}

function* videoAuthorInfoReq(action){
	let res = yield axios({
                    method: "get",
                    url: "/user/author_id",
                    params: {
                      authorId: action.author_id
                    }
                  });

	if (res) {
		yield put(authorInfoChange(res))
	}
}

function* videoActionReq(action){

    let token = window.localStorage.getItem('Authorization')
    if (token && token !== 'null') {
        let video = action.video
        let res = yield axios({
            method: "put",
            url: "/video/action",
            params: {
                videoId: video.videoId,
                action: video.action,
            },
            headers: { 
                Authorization: token,
            },
        })

        yield videoInfoReq({
            id: video.videoId
        });

    }else{
      history.push('/login')
    }
}

function* videoActionCollectionReq(action){
    let token = window.localStorage.getItem('Authorization')
    // 这个地方非常坑 不管token是null还是有值,都会执行if true方法, 
    // 原因是null被当成“null”字符串了(谷歌浏览器发现有这个问题)
    if (token && token !== 'null') {
        let videoId = action.videoId
        let res = yield axios({
            method: "put",
            url: "/video/collection",
            params: {
                videoId: videoId,
            },
            headers: { 
                Authorization: token,
            },
        })

        yield videoInfoReq({
            id: videoId
        });
    }else{
      history.push('/login')
    }

}

