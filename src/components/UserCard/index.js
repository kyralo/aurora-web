/*
* @Author: 王宸
* @Date:   2019-12-26 11:15:26
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-20 15:47:22
*/
import React from 'react';

import { Skeleton, Switch, Card, Icon, Avatar, Collapse } from 'antd';

const { Panel } = Collapse;
const { Meta } = Card;

export default class UserCard extends React.Component {
	
	state = {
		loading: false,
	};

	render() {
		const { loading } = this.state;
		return (
			<div>
				<Card style={{ 
					width: 'inherit',
					marginTop: 20 
				}} loading={loading}>
		          <Meta
		            avatar={
		              <Avatar src={this.props.avatarUrl} />
		            }
		            title={this.props.name}
		            description={
				      	this.props.sign === ''?
				      	'nothing about him or her'
				      	:
				      	this.props.sign
				      }
		          />

		          <Collapse style={{backgroundColor: '#fff'}} bordered={false} defaultActiveKey={['0']}>
  				    <Panel header={this.props.sex == '男'? 'more about him':'more about her'} key="1" style={{
  				    	marginTop: '10px',
  				    	border: 'none',
  				    	marginLeft: '10px',
  				    	backgroundColor: '#fff',
  				    }}>
						<div  style={{ paddingLeft: 24 }}>
						  <span>性别: </span>
						  {
						  	this.props.sex
						  }
						</div>

						<div style={{ paddingLeft: 24 }}>
						 <span>邮箱: </span>
	  				      {
					      	this.props.mail === ''?
					      	''
					      	:
					      	this.props.mail
					      }
						</div>
				    </Panel>
				  </Collapse>
		        </Card>
			</div>
		);
	}
}

