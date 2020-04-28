/*
* @Author: 王宸
* @Date:   2019-12-28 15:44:24
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-21 11:59:38
*/

import {
	USER_INFO_UPDATE,
	USER_INFO_REQ,
	USER_INFO_CHANGE,
	USER_COLLECTION_LIST_CHANGE,

	USER_COMMENT_LEVEL1_ADD,
	USER_COMMENT_LEVEL1_REQ,
	USER_COMMENT_LEVEL1_CHANGE,
	USER_COMMENT_LEVEL2_ADD,
	USER_COMMENT_LEVEL2_REQ,
	USER_COMMENT_LEVEL2_CHANGE,
	USER_COMMENT_PUT,
} from './actionTypes'


export const userInfoUpdate = (user_info) => ({
	type: USER_INFO_UPDATE,
	user_info
});

export const userInfoChange = (user_info) =>({
	type: USER_INFO_CHANGE,
	user_info
});


export const userInfoReq = () => ({
	type: USER_INFO_REQ
});

export const userCollectionListChange = (user_collection_list) => ({
	type: USER_COLLECTION_LIST_CHANGE,
	user_collection_list
});

export const userCommentLevel1Change = (comment_level1_list) => ({
	type: USER_COMMENT_LEVEL1_CHANGE,
	comment_level1_list
});

export const userCommentLevel1Add = (user_comment) => ({
	type: USER_COMMENT_LEVEL1_ADD,
	user_comment
});

export const userCommentLevel1Req = (video_id) => ({
	type: USER_COMMENT_LEVEL1_REQ,
	video_id
});

export const userCommentLevel2Change = (comment_level2) => ({
	type: USER_COMMENT_LEVEL2_CHANGE,
	comment_level2: {
        index: comment_level2.index,
        comment_level2_list: comment_level2.comment_level2_list,
	}
});

export const userCommentLevel2Add = (user_comment) => ({
	type: USER_COMMENT_LEVEL2_ADD,
	user_comment
});

export const userCommentLevel2Req = (user_comment) => ({
	type: USER_COMMENT_LEVEL2_REQ,
	user_comment: {
		index: user_comment.index,
		ancestry_id: user_comment.ancestry_id,
		video_id: user_comment.video_id,
	}
});

export const userCommentPut = (user_comment) => ({
	type: USER_COMMENT_PUT,
	user_comment: {
		id: user_comment.id,
		action: user_comment.action,
		videoId: user_comment.video_id,
		ancestryId: user_comment.ancestry_id,
	}
});