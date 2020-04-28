/*
* @Author: 王宸
* @Date:   2020-04-24 10:04:10
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-24 18:42:16
*/
import React from 'react';

import { 
	Avatar 
} from 'antd';

import './style.css'

const VideoCard = (props) => {
	const video = props.video
	return (
		<div>
		<img src={video.coverUrl} style={{
			width: '95%',
			height: '180px',
		}} alt="video_image"/>
		<div  style={{
				margin: '10px 20px 10px',
				}}>
					<h4 style={{
      					marginLeft: '15px',
      					overflow: 'hidden',
      					whiteSpace: 'nowrap',
      					textOverflow: 'ellipsis',
					}}>{video.title}</h4>
		</div>
		<div>
			<Avatar size={48} icon="user" src={video.authorAvatar} style={{
				float: 'left'
			}}/>
			<div>
				<div style={{
					marginTop: '10px',
					marginLeft: '80px'
				}}>
				{video.authorName}
				</div>
				<div style={{
					marginTop: '5px',
					marginLeft: '70px'
				}}>
				<h4>{video.createTime}</h4>
				</div>
			</div>
		</div>
	</div>
	)
}

export default VideoCard;