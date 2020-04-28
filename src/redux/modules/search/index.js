/*
* @Author: 王宸
* @Date:   2019-12-28 15:45:09
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-16 12:21:07
*/

// 将 action type 提取出来作为常量，防止编写错误
import { SEARCH_INFO_CHANGE } from './actionTypes';

const defaultState = {
    users: [
      // {
      //   avatarUrl: '',
      //   id: '',
      //   name: '',
      //   mail: '',
      //   sex: 0,
      //   sign: '',
      //   fettle: '',
      //   createTime: ''
      // }
    ],
    videos: [
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
    word: ''
};

const typesCommands = {
   
  [SEARCH_INFO_CHANGE](state, action) {
    return Object.assign({}, state, { 
       ...action.payload
    });
  }
};

export default function search(state = defaultState, action) {

   const actionResponse = typesCommands[action.type];

   return actionResponse ? actionResponse(state, action) : state;
}