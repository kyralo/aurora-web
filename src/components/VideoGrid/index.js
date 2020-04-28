/*
* @Author: 王宸
* @Date:   2019-12-30 22:42:10
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-14 10:19:55
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
	videoListChange
} from '@store/video/actionCreators'

import { connect } from 'react-redux';

import axios from '@utils/axios'

class VideoGrid extends React.Component {

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
		url: "/video"
    })
    promise
        .then( response => {
            let video_list = response

			if (video_list) {
                const action =  videoListChange(video_list)
                console.log(action)
                this.props.dispatch(action);
			}
        }).catch( error => {
            console.log(error)
        })
	}

  render() {
    const { gutterKey, vgutterKey, colCountKey } = this.state;
    const cols = [];
    const moreCols = [];
    const colCount = this.colCounts[colCountKey];
    let colCode = '';
    const video_list = this.props.video_list;
	
    for (let i = 0; i <video_list.length; i++) {

		cols.push(
			<Col key={video_list[i].id} span={24 / colCount}>
			  <div>
				<Link to={`/aurora/video/${video_list[i].id}`} >
			      	<div className="home_video">
			      		<img src={video_list[i].coverUrl} style={{
			      			maxWidth: '257px',
			      			minHeight: '145px',
			      		}} alt="video_image"/>
							<div className="home_video_title"  style={{
			      					marginTop: '10px',
			          				marginLeft: '60px'
			          			}}>
			          				<h4 style={{
			          					marginLeft: '15px'
			          				}}>{video_list[i].title}</h4>
			  			</div>
			      		<div className="home_video_info">
			      			<Avatar size={48} icon="user" src={video_list[i].authorAvatar} style={{
			      				float: 'left'
			      			}}/>
			      			<div>
			      				<div className="home_video_author"  style={{
			      					marginTop: '10px',
			          				marginLeft: '80px'
			          			}}>
									{video_list[i].authorName}
			          			</div>
			      				<div className="home_video_time"  style={{
			      					marginTop: '5px',
			          				marginLeft: '70px'
			          			}}>
									<h4>{video_list[i].createTime}</h4>
			          			</div>
			      			</div>
			      		</div>
			      	</div>
				</Link>
			  </div>
			</Col>,
		);


		colCode += `  <Col span={${24 / colCount}} />\n`;
    }
	
	console.log(cols)
	for (var i = 0; i < cols.length; i+=colCount) {
		moreCols.push(cols.slice(i, i+4))
	}
	console.log(moreCols)

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

export default connect(mapStateToProps, null)(VideoGrid);