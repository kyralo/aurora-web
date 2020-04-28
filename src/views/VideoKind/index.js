/*
* @Author: 王宸
* @Date:   2019-12-30 22:42:10
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-24 10:11:21
*/
import React from 'react';
import { 
	Row, 
	Col, 
	Slider,
	Avatar,
	Radio
} from 'antd';

import {
  Route,
  Link,
  withRouter
} from "react-router-dom";

import './style.css'

import VideoTag from '@comp/VideoTag'
import NotFound from '@comp/NotFound'
import VideoCard from '@comp/VideoCard'

import {
	videoKindChange,
	kindVideoListChange
} from '@store/video/actionCreators'

import { connect } from 'react-redux';

import axios from '@utils/axios'

import {
  message,
} from 'antd';

class VideoKin extends React.Component {

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
		let promiseVideo =  axios({
			method: "get",
			url: "/video"
	    })
	    promiseVideo
	        .then( response => {
	            let video_list = response

				if (video_list) {
	                const action =  kindVideoListChange(video_list)
	                this.props.dispatch(action);
				}
	        }).catch( error => {
	            
	        })
			
			let promiseKind =  axios({
				method: "get",
				url: "/video_kind"
		    })
		    promiseKind
		        .then( response => {
		            let video_kind = response

					if (video_kind) {
		                const action =  videoKindChange(video_kind)
		                this.props.dispatch(action);
					}
		        }).catch( error => {
		            
		        })
	}


	kindVideoGet(e){
	let kind_id = e.target.value
	let promiseKind =  axios({
			method: "get",
			url: "/video/kind/" + kind_id,
	    })
	    promiseKind
	        .then( response => {
	            let video_list = response
				if (video_list) {
	                const action =  kindVideoListChange(video_list)
	                this.props.dispatch(action);
				}
	        }).catch( error => {
	            
	        })
	}

  allKindVideoGet(){
	let promiseVideo =  axios({
		method: "get",
		url: "/video"
    })
    promiseVideo
        .then( response => {
            let video_list = response

			if (video_list) {
                const action =  kindVideoListChange(video_list)
                this.props.dispatch(action);
			}
        }).catch( error => {
            
        })
  }

  render() {

    const { gutterKey, vgutterKey, colCountKey } = this.state;
    const cols = [];
    const moreCols = [];
    const colCount = this.colCounts[colCountKey];
    let colCode = '';

    const video_kind = this.props.video_kind;

	const video_list = this.props.video_kind_videos.video_list;
	if (video_list.length == 0 || video_list.length == 0) {
		return(
			<div>
				<div>
				    <h1>视频分类</h1>
				    <div style={{
				    	marginTop: '5px',
				    	marginBottom: '2px',
				    }}>
				    		
				      <Radio.Group defaultValue="all" buttonStyle="solid">
				      	<Radio.Button value="all" key="all" onClick={this.allKindVideoGet.bind(this)}>全部</Radio.Button>
				        {
				        	video_kind.length == 0 ?
				        	null
				        	:
				        	video_kind.map( i => (
					        	<Radio.Button value={i.id} key={i.id} onClick={e=>this.kindVideoGet(e)}>{i.name}</Radio.Button>
				        	))
				        }
				      </Radio.Group>
				    	
				    </div>
				    <hr/>
				</div>
				<NotFound />
			</div>
		);
	}
	
    for (let i = 0; i <video_list.length; i++) {

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
			    <h1>视频分类</h1>
			    <div style={{
			    	marginTop: '5px',
			    	marginBottom: '2px',
			    }}>
			    		
			      <Radio.Group defaultValue="all" buttonStyle="solid">
			      	<Radio.Button value="all" key="all" onClick={this.allKindVideoGet.bind(this)}>全部</Radio.Button>
			        {
			        	video_kind.map( i => (
				        	<Radio.Button value={i.id} key={i.id} onClick={e=>this.kindVideoGet(e)}>{i.name}</Radio.Button>
			        	))
			        }
			      </Radio.Group>
			    	
			    </div>
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

const videokind =  withRouter(VideoKin);

const mapStateToProps = (state) => {
    return {
        ...state.video
    }
};

export default connect(mapStateToProps, null)(videokind);