import {
	LOGIN_REQ,
	REGISTER_REQ,
	LOGOUT_REQ,
	CODE_REQ
} from './actionTypes'

/** 登录 */
export const loginReq = user =>({
	type: LOGIN_REQ,
	user
});

/** 注册 */
export const registerReq = user =>({
	type: REGISTER_REQ,
	user
});

/** 注销 */
export const logoutReq = user_info =>({
	type: LOGOUT_REQ,
	user_info
});

export const codeReq = (mail) => ({
	type: CODE_REQ,
	mail
});