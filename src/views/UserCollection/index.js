/*
* @Author: 王宸
* @Date:   2019-12-30 22:42:10
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-26 20:58:16
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
	userCollectionListChange
} from '@store/user/actionCreators'

import { connect } from 'react-redux';

import axios from '@utils/axios'

import NotFound from '@comp/NotFound'
import VideoCard from '@comp/VideoCard'

class UserCollection extends React.Component {

	
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
		url: "/user_collection",
		headers: { 
			'Authorization': window.localStorage.getItem('Authorization'),
		},
    })
    promise
        .then( response => {
            let user_collection_list = response
			if (user_collection_list) {
                const action = userCollectionListChange(user_collection_list)
                this.props.dispatch(action)
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
    const user_collection_list = this.props.user_collection_list;
    
	if (user_collection_list.length == 0) {
		return(
			<div>
				<div>
				    <h1>收藏视频</h1>
				    <hr/>
				</div>
				<NotFound/>
			</div>
		);
	}
	
    for (let i = 0; i <user_collection_list.length; i++) {

		cols.push(
			<Col key={user_collection_list[i].id} span={24 / colCount}>
			  <div>
				<Link to={`/aurora/video/${user_collection_list[i].id}`} >
					<VideoCard video={user_collection_list[i]}/>
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
			    <h1>收藏视频</h1>
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
        ...state.user
    }
};

export default connect(mapStateToProps, null)(UserCollection);