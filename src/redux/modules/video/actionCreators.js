import * as actionTypes from './actionTypes'

export const videoListChange = (video_list) => ({
	type: actionTypes.VIDEO_LIST_CHANGE,
	video_list
});

export const hotVideoListChange = (video_list) => ({
	type: actionTypes.HOT_VIDEO_LIST_CHANGE,
	video_hot_videos: {
		video_list
	}
});

export const recommendVideoListChange = (video_list) => ({
	type: actionTypes.RECOMMEND_VIDEO_LIST_CHANGE,
	video_recommend_videos: {
		video_list
	}
});

export const kindVideoListChange = (video_list) => ({
	type: actionTypes.KIND_VIDEO_LIST_CHANGE,
	video_kind_videos: {
		video_list
	}
});

export const videoChange = (video) =>({
	type: actionTypes.VIDEO_CHANGE,
	video
});

export const videoKindChange = (video_kind) =>({
	type: actionTypes.VIDEO_KIND_CHANGE,
	video_kind
});

export const authorInfoChange = (author_info) => ({
	type: actionTypes.AUTHOR_INFO_CHANGE,
	author_info
});



export const videoInfoReq = (video_id) => ({
	type: actionTypes.VIDEO_INFO_REQ,
	id: video_id
});

export const videoActionReq = (video) => ({
	type: actionTypes.VIDEO_ACTION_REQ,
	video
});

export const videoAuthorInfoReq = (author_id) => ({
	type: actionTypes.VIDEO_AUTHOR_INFO_REQ,
	author_id
});

export const videoActionCollectionReq = (videoId) => ({
	type: actionTypes.VIDEO_ACTION_COLLECTION_REQ,
	videoId
});
