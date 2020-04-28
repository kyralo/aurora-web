/*
* @Author: 王宸
* @Date:   2020-04-14 00:59:25
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-14 01:04:44
*/
import React from 'react';
import Dplayer from "react-dplayer";

const options = {
	                video: {
						url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
					},
					screenshot: 'true'
				};

const VideoPlayer = (props) => {
  return (
    <Dplayer options={props.options}/>
  )
}

export default VideoPlayer;