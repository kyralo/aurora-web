/*
* @Author: 王宸
* @Date:   2019-12-28 15:44:24
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-16 11:21:18
*/

import { 
	SEARCH_INFO_CHANGE,
	SEARCH_INFO_GET
} from './actionTypes'

export const searchInfoChange = (payload) => ({
	type: SEARCH_INFO_CHANGE,
	payload
});

export const searchInfoGet = (word) => ({
	type: SEARCH_INFO_GET,
	word
});

