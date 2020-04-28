/*
* @Author: 王宸
* @Date:   2020-04-14 15:37:05
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-21 12:50:02
*/

import React, {useState} from 'react';
import { 
	Comment, 
	Icon, 
	Tooltip, 
	Avatar, 
	Collapse,
	Input,
	Button  
} from 'antd';

import moment from 'moment';

const { Panel } = Collapse;

const { TextArea } = Input;

import { connect } from 'react-redux';

import { 
  userCommentLevel2Add,
  userCommentLevel2Req,
  userCommentPut,
} from '@store/user/actionCreators'

const UserComment = (props) => {

	const super_comment = props.super_comment
	const index = super_comment.super_index
	const level2CommentList = props.level2CommentList

	return (
		<div>
		  <ExampleComment 
		  	commentLevel2Req={props.commentLevel2Req}
		  	commentLevel2Add={props.commentLevel2Add} 
		  	commentActionPut={props.commentActionPut}
		  	comment={super_comment.comment}  
		  	index={super_comment.super_index}
		  >
			{
				level2CommentList.map((i,index) => (
					<ExampleComment 
						commentLevel2Req={props.commentLevel2Req} 
						commentLevel2Add={props.commentLevel2Add}
						commentActionPut={props.commentActionPut} 
						comment={i} 
						key={index} 
						super_index={super_comment.super_index}
					/>
				))
			}

		  </ExampleComment>
		</div>
	)
};

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentLevel2Req(user_comment){
          const action = userCommentLevel2Req(user_comment);
          dispatch(action);
        },
        commentLevel2Add(user_comment){
          const action = userCommentLevel2Add(user_comment);
          dispatch(action);
        },
        commentActionPut(user_comment){
          const action = userCommentPut(user_comment);
          dispatch(action);
        }
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (UserComment);


const ExampleComment = (props) => {

    const comment = props.comment;
	const [reply, setReply] = useState({
		isClick: false
	})

	const [textarea, setTextarea] = useState({
		style: {
				color: 'rgb(0,0,0,0.5)',
				backgroundColor: 'rgb(204,204,204)',
			},
		value: 'reply something to him or her ...',
	});

	const [callbackClick, setCallbackClick] = useState(false)
	const [panelKey, setPanelKey] = useState('1')

	const like = () => {
		props.commentActionPut({
			id: comment.id,
			action: 2,
			video_id: comment.videoId,
			ancestry_id: comment.ancestryId,
		})
	}

	const dislike = () => {
		props.commentActionPut({
			id: comment.id,
			action: 1,
			video_id: comment.videoId,
			ancestry_id: comment.ancestryId,
		})
	}

	const replyClick = () => {

		if (reply.isClick) {
			setTextarea(Object.assign({}, textarea, { 
				value: '',
		    }))
			setReply(Object.assign({}, reply, { 
				isClick: false,
		    }))
		}else{
			setTextarea(Object.assign({}, textarea, { 
				value: 'reply something to him or her ...',
		    }))
			setReply(Object.assign({}, reply, { 
				isClick: true
		    }))
		}
	}

	const changeReply = () => {

		if (panelKey === '1') {
			setPanelKey(null)
		}

		const ancestryId = comment.ancestryId
		const user_comment = {
            ancestry_id: ancestryId == null || ancestryId === '' ? comment.id : ancestryId,
            video_id: comment.videoId,
            index: props.super_index == null ? props.index : props.super_index,
		}

		props.commentLevel2Req(user_comment)
	}

	const leaveReply = () => {
		setPanelKey('1')
	}

	const textAreaChange = e => {
		setTextarea(e.target.value)
	}
	

	const replyReq = () => {
		const ancestryId = comment.ancestryId
		const user_comment = {
            ancestryId: ancestryId == null || ancestryId === '' ? comment.id : ancestryId,
            answerId: comment.id,
            videoId: comment.videoId,
            commentContent: textarea,
            index: props.super_index == null ? props.index : props.super_index,
		}

		props.commentLevel2Add(user_comment)

		// props.commentLevel1Req(comment.videoId)

		setReply({
			isClick: false
		})

		setTextarea({
			style: {
				color: 'rgb(0,0,0,0.5)',
				backgroundColor: 'rgb(204,204,204)',
			},
			value: 'reply something to him or her ...',
		})

	}

	const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={comment.action === 2 ? 'filled' : 'outlined'}
            onClick={() => like()}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{comment.likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={comment.action === 1 ? 'filled' : 'outlined'}
            onClick={() => dislike()}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{comment.dislikes}</span>
      </span>,
      <span key="comment-basic-reply-to" onClick={() => replyClick()}>Reply to</span>,
    ];


	return (

		<Comment
			actions={actions}
			author={<a>{comment.sendName}</a>}
			avatar={
			  <Avatar
			    src={comment.sendAvatarUrl}
			    alt={comment.sendName}
			  />
			}
			content={
			  <p>
				{
					comment.commentContent
				}
			  </p>
			}
			datetime={
	          <Tooltip title={moment(comment.createTime).format('YYYY-MM-DD HH:mm:ss')}>
	            <span>{moment(comment.createTime).fromNow()}</span>
	          </Tooltip>
	        }

		>

			{
				reply.isClick ?
				<div style={{
					marginBottom: '20px',
				}}>
					<TextArea 
						style={{
							width: '90%',
							marginRight: '2px'
						}} 
						placeholder={textarea.value}
						autoSize 
						onChange={e => textAreaChange(e)}
					/>
					<Button type="primary" style={{
						width: 'calc(5% - 2px)',
						padding: '1px 2px 1px',
						textTransform: 'uppercase',
					}} onClick={replyReq}>reply</Button>
				</div>
				:
				null
			}

		<div onMouseLeave={leaveReply}>
			<Collapse style={{
				backgroundColor: '#fff',
				width: '95%'
			}} onChange={changeReply} accordion>
					{
						comment.answerId == null || comment.answerId === '' ?
						<Panel style={{
							backgroundColor: '#fff'
						}} header="查看回复" key={panelKey}>
							{props.children}
					    </Panel>
					    :
					    null
					}
			</Collapse>
		</div>
		</Comment>
	)
};


