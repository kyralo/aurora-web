/*
* @Author: 王宸
* @Date:   2020-04-14 11:55:07
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-28 16:21:30
*/
import React from 'react';
import { 
	Row, 
	Col, 
	Slider,
	Avatar 
} from 'antd';

import {
  Route,
  Link
} from "react-router-dom";

import './style.css'

import {
	userInfoChange,
} from '@store/user/actionCreators'

import {
	recommendVideoListChange
} from '@store/video/actionCreators'

import { connect } from 'react-redux';

import axios from '@utils/axios'

import NotFound from '@comp/NotFound'
import VideoCard from '@comp/VideoCard'

import store from '@redux'

import {
  message,
} from 'antd';

class VideoRecommend extends React.Component {

		
  gutters = {};

  vgutters = {};

  colCounts = {};

  constructor() {
    super();
    this.state = {
      gutterKey: 0,
      vgutterKey: 5,
      colCountKey: 2,
    };
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      this.gutters[i] = value;
    });
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      this.vgutters[i] = value;
    });
    [2, 3, 4, 6, 8, 12].forEach((value, i) => {
      this.colCounts[i] = value;
    });
  }

  componentDidMount(){
	let promise =  axios({
		method: "get",
		url: "/video/recommend"
    })
    promise
        .then( response => {
            let video_list = response
			if (video_list) {
                const action =  recommendVideoListChange(video_list)
                store.dispatch(action);
			}
        }).catch( error => {
            message.error("还没有任何作品上传!~");
        })

	
    let token =  window.localStorage.getItem('Authorization')
    if (token && token !== 'null') {
        let userPromise = axios({
	    	method: "get",
	    	url: "/user",
	        headers: { 
	            'Authorization': token,
	        },
	    })
	    userPromise
	        .then(response => {
				const action = userInfoChange(response)
				store.dispatch(action);
	        }).catch( error => {
	            window.localStorage.removeItem('Authorization')
	        })
    }

       
}

  render() {

	const video_list = this.props.video_recommend_videos.video_list;
	if (video_list.length == 0) {
		return(
			<div>
				<div>
				    <h1>推荐视频</h1>
				    <hr/>
				</div>
				<NotFound/>
			</div>
		);
	}

    const { gutterKey, vgutterKey, colCountKey } = this.state;
    const cols = [];
    const moreCols = [];
    const colCount = this.colCounts[colCountKey];
    let colCode = '';
    
	
    for (let i = 0; i < video_list.length; i++) {

		cols.push(
			<Col key={video_list[i].id} span={24 / colCount}>
			  <div>
				<Link to={`/aurora/video/${video_list[i].id}`} >
					<VideoCard video={video_list[i]}/>
				</Link>
			  </div>
			</Col>,
		);


		colCode += `  <Col span={${24 / colCount}} />\n`;
    }

	for (var i = 0; i < cols.length; i+=colCount) {
		moreCols.push(cols.slice(i, i+4))
	}

    return (
		<div>
			<div>
			    <h1>推荐视频</h1>
			    <hr/>
			</div>

			<div style={{
				marginTop: '20px'
			}}>
				{
					moreCols.map((i,index) => (
						<Row key={index} gutter={[this.gutters[gutterKey], this.vgutters[vgutterKey]]}>{i}</Row>
					))
				}
			</div>
		</div>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        ...state.video
    }
};


export default connect(mapStateToProps, null)(VideoRecommend);
