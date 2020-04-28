/*
* @Author: 王宸
* @Date:   2019-12-26 08:58:10
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-24 11:18:11
*/
import React, {
	useState,
} from 'react';

import {
  withRouter,
} from "react-router-dom";

import {
  videoActionReq,
  videoActionCollectionReq,
} from '@store/video/actionCreators'

import { connect } from 'react-redux';

import { Icon, Tooltip, Avatar, Collapse} from 'antd';

import './style.css'

const { Panel } = Collapse;

const Player = (props) => {
	
	const like = () => {		
		props.putVideoAction({
    		videoId: props.video.id,
    		action: 2,
    	});
	}

	const dislike = () => {
		props.putVideoAction({
    		videoId: props.video.id,
    		action: 1,
    	});
	}

	const collection = () => {
		props.putVideoActionCollection(props.video.id);
	}

	const actions = [
      <span key="video-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={props.video.action === 2 ? 'filled' : 'outlined'}
            onClick={() => like()}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{props.video.likes}</span>
      </span>,
      <span key=' key="video-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={props.video.action === 1 ? 'filled' : 'outlined'}
            onClick={() => dislike()}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{props.video.dislikes}</span>
      </span>,
      <span key="video-basic-collection">
        <Tooltip title="Collection">
          <Icon
            type="star"
            theme={props.video.collected ? 'filled' : 'outlined'}
            onClick={() => collection()}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{props.video.collections}</span>
      </span>,
    ];

	return (
		<div>
			<div className="mainContainer">
			    <div>
			        <div className="video-container">
			            <div>
			                <video 
			                	name="videoElement"
			                 	className="centeredVideo" 
			                 	// src="https://media.w3.org/2010/05/sintel/trailer.mp4"
			                 	src={props.video.videoUrl}
			                 	controls
			                 	>
			                    Your browser is too old which doesn't support HTML5 video.
			                </video>
			            </div>
			        </div>
			    </div>
				<div style={{
					backgroundColor: '#fff',
					marginTop: '20px',
					height: '80px',
					padding: '0px 20px 5px',
					// border: '2px dotted rgb(0,0,0,0.6)',
				}}>
					<h1 style={{
						fontSize: '1.5em',
						textTransform: 'uppercase',
					}}>{props.video.title}</h1>
					<div style={{
						float: 'left'
					}}>
						Time: {props.video.createTime}
					</div>
					<div className="_video_info" style={{
						float: 'right',
						padding: '0px 30px 2px',
					}}>
						{actions}
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        ...state.video,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        putVideoAction(video){
            const action = videoActionReq(video);
            dispatch(action);
        },
        putVideoActionCollection(video_id){
            const action = videoActionCollectionReq(video_id);
            dispatch(action);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
