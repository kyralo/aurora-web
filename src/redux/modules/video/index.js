/*
* @Author: 王宸
* @Date:   2019-12-23 23:11:05
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-14 12:39:12
*/
// 将 action type 提取出来作为常量，防止编写错误
import * as actionTypes from './actionTypes';
// state 初始化数据
//默认数据
const defaultState = {
	video: {
	 //  	authorAvatar: "",
		// authorId: "",
		// authorName: "",
		// createTime: "",
		// fettle: "0",
		// id: "",
		// introduction: "",
		// kindId: 0,
		// title: "",
		// coverUrl: '',
		// videoUrl: "",
	},
	// video_list: [
	// 	// {
	// 	// 	authorAvatar: "",
	// 	// 	authorId: "",
	// 	// 	authorName: "",
	// 	// 	createTime: "",
	// 	// 	fettle: "0",
	// 	// 	id: "",
	// 	// 	introduction: "",
	// 	// 	kindId: 0,
	// 	// 	title: "",
	// 	// 	coverUrl: '',
	// 	// 	videoUrl: "",
	// 	// },
	// ],
	video_kind: [
		// {
		// 	id: 0,
		// 	name: '',
		// 	info: '',
		// 	createTime: ''
		// },
	],

	author_info: {
      avatarUrl: '',
      id: '',
      name: '',
      mail: '',
      sex: 0,
      sign: '',
      fettle: '',
      createTime: ''
	},

	video_hot_videos: {
		video_list: [
			// {
			// 	authorAvatar: "",
			// 	authorId: "",
			// 	authorName: "",
			// 	createTime: "",
			// 	fettle: "0",
			// 	id: "",
			// 	introduction: "",
			// 	kindId: 0,
			// 	title: "",
			// 	coverUrl: '',
			// 	videoUrl: "",
			// },
		],
	},
	video_kind_videos: {
		video_list: [
			// {
			// 	authorAvatar: "",
			// 	authorId: "",
			// 	authorName: "",
			// 	createTime: "",
			// 	fettle: "0",
			// 	id: "",
			// 	introduction: "",
			// 	kindId: 0,
			// 	title: "",
			// 	coverUrl: '',
			// 	videoUrl: "",
			// },
		],
	},

	video_recommend_videos: {
		video_list: [
			// {
			// 	authorAvatar: "",
			// 	authorId: "",
			// 	authorName: "",
			// 	createTime: "",
			// 	fettle: "0",
			// 	id: "",
			// 	introduction: "",
			// 	kindId: 0,
			// 	title: "",
			// 	coverUrl: '',
			// 	videoUrl: "",
			// },
		],
	}


};

const typesCommands = {

   [actionTypes.VIDEO_LIST_CHANGE](state, action) {
      return Object.assign({}, state, { 
        video_list: action.video_list
      });
   },
   [actionTypes.HOT_VIDEO_LIST_CHANGE](state, action) {
      return Object.assign({}, state, { 
        video_hot_videos: action.video_hot_videos
      });
   },
   [actionTypes.RECOMMEND_VIDEO_LIST_CHANGE](state, action) {
      return Object.assign({}, state, { 
        video_recommend_videos: action.video_recommend_videos
      });
   },
   [actionTypes.KIND_VIDEO_LIST_CHANGE](state, action) {
      return Object.assign({}, state, { 
        video_kind_videos: action.video_kind_videos
      });
   },
   [actionTypes.VIDEO_CHANGE](state, action) {
      return Object.assign({}, state, { 
        video: action.video
      });
   },
   [actionTypes.VIDEO_KIND_CHANGE](state, action) {
      return Object.assign({}, state, { 
        video_kind: action.video_kind
      });
   },
  [actionTypes.AUTHOR_INFO_CHANGE](state, action) {
	  return Object.assign({}, state, { 
	    ...state,
	    author_info: action.author_info
	  });
	},
};


export default function home(state = defaultState, action) {
   const actionResponse = typesCommands[action.type];

   return actionResponse ? actionResponse(state, action) : state;
}