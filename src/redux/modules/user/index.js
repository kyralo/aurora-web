/*
* @Author: 王宸
* @Date:   2019-12-28 15:45:09
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-21 08:47:57
*/

// 将 action type 提取出来作为常量，防止编写错误
import { 
    USER_INFO_CHANGE, 
    USER_COLLECTION_LIST_CHANGE,
    USER_INFO_UPDATE,
    USER_COMMENT_LEVEL1_CHANGE,
    USER_COMMENT_LEVEL2_CHANGE
} from './actionTypes';

const defaultState = {
    user_info: {
      avatarUrl: '',
      id: '',
      name: '',
      mail: '',
      sex: 0,
      sign: '',
      fettle: '',
      createTime: ''
    },
    user_collection_list: [
      // {
      //   authorAvatar: "",
      //   authorId: "",
      //   authorName: "",
      //   createTime: "",
      //   fettle: "0",
      //   id: "",
      //   introduction: "",
      //   kindId: 0,
      //   title: "",
      //   coverUrl: '',
      //   videoUrl: "",
      // },
    ],
    comments: [
      // {
      //   id: '',
      //   videoId: '',
      //   sendId: '',
      //   sendAvatarUrl: '',
      //   sendName: '',
      //   commentContent: '',
      //   commentImageUrl: '',
      //   createTime: '',
      //   answerId: '',
      //   answerCommentContent: '',
      //   answerCommentImageUrl: '',
      //   answerSendId: '',
      //   answerAvatarUrl: '',
      //   answerName: '',
      //   level2CommentList: []
      // },
    ],
    level2CommentList: []
};

const typesCommands = {
   
  [USER_INFO_CHANGE](state, action) {
    return Object.assign({}, state, { 
       user_info: action.user_info
    });
  },
  [USER_COLLECTION_LIST_CHANGE](state, action) {
    return Object.assign({}, state, { 
        user_collection_list: action.user_collection_list
    });
  },
  [USER_INFO_UPDATE](state, action) {
    return Object.assign({}, state, { 
        user_info: {
          ...state.user_info,
          avatarUrl: action.user_info.avatarUrl
        }
    });
  },
  [USER_COMMENT_LEVEL1_CHANGE](state, action) {
    return Object.assign({}, state, { 
        comments: action.comment_level1_list
    });
  },
  [USER_COMMENT_LEVEL2_CHANGE](state, action) {
    return Object.assign({}, state, { 
        level2CommentList: action.comment_level2.comment_level2_list
    });
  }
};

export default function user(state = defaultState, action) {

   const actionResponse = typesCommands[action.type];

   return actionResponse ? actionResponse(state, action) : state;
}