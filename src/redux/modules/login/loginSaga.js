import axios from '@utils/axios'

import { push } from 'react-router-redux';

import { history } from '@utils/history';

import { 
	put,
	takeLatest,
    takeEvery
} from 'redux-saga/effects'

import { 
	LOGIN_REQ,
	REGISTER_REQ,
    LOGOUT_REQ,
    CODE_REQ 
} from './actionTypes'

import {
    userInfoChange,
} from '@store/user/actionCreators'

import {
  message,
} from 'antd';



function* login(action){
	let user = action.user
    let res = yield axios({
    	method: "post",
    	url: "/user/login",
    	params: {
    		email: user.email,
			password: user.password,
    	}
    });
    if (res) {
        yield put(userInfoChange(res))
        message.success('Login success !')
        history.replace("/")
    }else{
        message.error('Login failed !')
    }
}


function* register(action){
    // 为了保持code接收验证在同一个session下, 
    // 这里code和注册共同调用一个接口,后端根据参数不同做处理
	let user = action.user

    let promise =  axios({
    	method: "post",
    	url: "/user/register",
    	data: user
    })

    promise
        .then( response => {
            if (response === 'register success') {
                message.success('Register success !')
                history.replace('/login')
            }
        }).catch( error => {
               message.error('Failed! something went wrong, try again!')
        })
}

function* logout(action){
    yield put(userInfoChange(action.user_info))
    message.success('Logout success !')
    history.replace('/')
}

export default function* loginSaga(){
    yield takeLatest(LOGIN_REQ , action => login(action));
    yield takeLatest(REGISTER_REQ , action => register(action));
    yield takeLatest(LOGOUT_REQ , action => logout(action));
    yield takeLatest(CODE_REQ , action => codeGet(action));
}