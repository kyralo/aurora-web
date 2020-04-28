/*
* @Author: 王宸
* @Date:   2020-04-14 15:37:05
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-15 09:48:29
*/

import React, {useState} from 'react';
import { Comment, Icon, Tooltip, Avatar, Collapse} from 'antd';
import moment from 'moment';

const { Panel } = Collapse;

const callback = key => {
	console.log(key);
}

const ExampleComment = (props) => {

	const [state, setState] = useState({
		likes: 0,
	    dislikes: 0,
	    action: null,
	});

	const like = () => {
		if (state.action === 'liked') {
			return
		}

		let likes = state.likes + 1
		let dislikes = state.dislikes
		if (state.action === 'disliked') {
			dislikes = dislikes - 1
		}

		let action = 'liked'
		setState({
			likes: likes,
			dislikes: dislikes,
			action: action,
		});
	};

	const dislike = () => {
		if (state.action === 'disliked') {
			return
		}

		let likes = state.likes
		if (state.action === 'liked') {
			likes = likes - 1
		}
		let dislikes = state.dislikes + 1
		let action = 'disliked'
		setState({
			likes: likes,
			dislikes: dislikes,
			action: action,
		});
	};

	const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={state.action === 'liked' ? 'filled' : 'outlined'}
            onClick={() => like()}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{state.likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={state.action === 'disliked' ? 'filled' : 'outlined'}
            onClick={() => dislike()}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{state.dislikes}</span>
      </span>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];

	return (

		<Comment
			actions={actions}
			author={<a>Han Solo</a>}
			avatar={
			  <Avatar
			    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
			    alt="Han Solo"
			  />
			}
			content={
			  <p>
			    We supply a series of design principles, practical patterns and high quality design
			    resources (Sketch and Axure).
			  </p>
			}
			datetime={
	          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
	            <span>{moment().fromNow()}</span>
	          </Tooltip>
	        }

		>
			<Collapse style={{
				backgroundColor: '#fff',
				width: '95%'
			}} defaultActiveKey={['1']} onChange={callback}>
				{
					props.children?
					<Panel style={{
						backgroundColor: '#fff'
					}} header="查看回复" key="1">
						{props.children}
				    </Panel>	
				    :
				    null		    
				}
			</Collapse>
		</Comment>
	)
};

const DemoComment = (props) => {

	return (
		<div>
		  <ExampleComment>
		    <ExampleComment/>
		    <ExampleComment/>
		  </ExampleComment>
		</div>
	)
};

export default DemoComment;
