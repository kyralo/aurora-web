/*
* @Author: 王宸
* @Date:   2019-12-26 09:03:45
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-24 18:44:37
*/
import React, {
  useEffect,
  lazy,
  Suspense
} from 'react';

import Player from '@comp/Player'
import UserCard from '@comp/UserCard'

import { 
  Comment, 
  Tooltip, 
  List,
  Avatar,
} from 'antd';


import {
  videoInfoReq,
} from '@store/video/actionCreators'

import { 
  userCommentLevel1Add,
  userCommentLevel1Req,
} from '@store/user/actionCreators'

import { connect } from 'react-redux';
import axios from '@utils/axios'

import CommentText from '@comp/CommentText'
import Loading from '@comp/Loading'

const UserComment = lazy(() => import('@comp/UserComment'));


const Video = (props) => {

  useEffect(() => {
    let video_id = props.match.params.id
    initFunc(video_id)
  }, []);

  const initFunc = (video_id) => {
    props.getVideoInfo(video_id);
    props.commentLevel1Req(video_id);
  }

  const commentUpdate = (user_comment) => {
    props.commentLevel1Add(user_comment)
    props.commentLevel1Req(video_id);
  }
  
  const video_id = props.match.params.id;
  const user_card_props = props.author_info;
  const user_info = props.user_info;
  const comments = props.comments;

  return (
        <div style={{
          maxWidth: '95%',
          minWidth: '1236px'
        }}>
          <Player initFunc={initFunc}/>
          <div style={{
            marginLeft: '40px',
            marginRight : '40px',
            maxWidth: '95%',
          }}>
            <UserCard {...user_card_props}/>
          </div>
          <div style={{
            marginLeft: '40px'
          }}>

          <h2 style={{
            marginTop: '50px',
            textTransform: 'uppercase',
          }}>评论</h2>
          <hr style={{
            maxWidth: '100%',
            marginRight: '40px',
            marginBottom: '20px'
          }}/>
        
          {
            user_info.id === ''?
            null
            :
            <CommentText user_info={user_info} video_id={video_id} commentUpdate={commentUpdate}/>
          }

          <Suspense fallback={<Loading/>}>

          {
            comments.length == 0 
            ?
            null
            :
            comments.map((i,index) => (
                <UserComment 
                  super_comment={{
                    comment: i,
                    super_index: index,
                  }} 
                  level2CommentList={i.level2CommentList}
                  key={index}  
                />
              ))
          }

          </Suspense>

          </div>
        </div>
  )
}

const mapStateToProps = (state) => {
    return {
        ...state.video,
        ...state.user
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        getVideoInfo(video_id){
            const action = videoInfoReq(video_id);
            dispatch(action);
        },
        putVideoAction(video){
            const action = videoActionReq(video);
            dispatch(action);
        },
        putVideoActionCollection(video_id){
            const action = videoActionCollectionReq(video_id);
            dispatch(action);
        },
        commentLevel1Req(video_id){
          const action = userCommentLevel1Req(video_id);
          dispatch(action);
        },
        commentLevel1Add(user_comment){
          const action = userCommentLevel1Add(user_comment);
          dispatch(action);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
