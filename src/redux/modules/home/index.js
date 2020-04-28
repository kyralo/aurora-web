/*
* @Author: 王宸
* @Date:   2019-12-23 23:11:05
* @Last Modified by:   王宸
* @Last Modified time: 2020-01-03 10:03:34
*/
// 将 action type 提取出来作为常量，防止编写错误
import { HOT_LIST_CHANGE } from './actionTypes';

const defaultState = {
   hot_list: [
      {
        authorAvatar: "",
        authorId: "",
        authorName: "",
        createTime: "",
        fettle: "0",
        id: "",
        introduction: "",
        kindId: 0,
        title: "",
        coverUrl: '',
        videoUrl: "",
      },
   ] 
};


const typesCommands = {

   [HOT_LIST_CHANGE]: (state, action) => {
      return Object.assign({}, state, { 
         hot_list: action.hot_list
      });
   }
};

export default function home(state = defaultState, action) {
   const actionResponse = typesCommands[action.type];

   return actionResponse ? actionResponse(state, action) : state;
}