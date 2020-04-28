/*
* @Author: 王宸
* @Date:   2019-12-23 23:11:05
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-20 08:37:47
*/

import { UPLOAD_CHANGE } from './actionTypes';

const defaultState = {
  upload: {
    kindId: 0,
    title: '',
    introduction: '',
    coverUrl: '',
    videoUrl: '',
  }
};


const typesCommands = {
    
   [UPLOAD_CHANGE](state, action) {
      return Object.assign({}, state, {
        upload: {
          ...state.upload,
          ...action.payload
        }
  	  });
   },
};

export default function home(state = defaultState, action) {
   const actionResponse = typesCommands[action.type];
   return actionResponse ? actionResponse(state, action) : state;
}