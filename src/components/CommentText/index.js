/*
* @Author: 王宸
* @Date:   2020-04-15 10:09:50
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-20 17:19:30
*/
import React, {useState} from 'react';

import { 
  Avatar,
} from 'antd';

import './style.css'

const CommentText = (props) => {

	const [state, setState] = useState({
		isClick: false,
		style: {
			subDiv: {
				height: '66.6%'
			},
			span: {
			  bottom: '0',
			}
		}
	});

	const [buttonSubmit, setButtonSubmit] = useState({
		style: {
				backgroundColor: 'rgb(204,204,204)',
			},
	});

	const [textarea, setTextarea] = useState({
		style: {
				color: 'rgb(0,0,0,0.5)'
			},
		value: 'say something you like ...',
	});

	const textClick = () => {
		setState({
			isClick: true,
			style: {
				subDiv: {
					height: '18.3%'
				},
				span: {
				  bottom: '48.3%',
				}
			}
		});

		let value = textarea.value

		if (value || value === 'say something you like ...') {
			value = ''
		}

		setTextarea(
			Object.assign({}, textarea, { 
         			style: {
						color: 'rgb(0,0,0)'
					},
					value: value
		    })
		)
	}

	const textBlur = () => {
		if (!state.isClick) {
			return
		}
		setState({
			isClick: false,
			style: {
				subDiv: {
					height: '66.6%'
				},
				span: {
				  bottom: '0',
				}
			}
		})
	}

	const textareaChange = e => {

		let value = e.target.value

		setTextarea(
			Object.assign({}, textarea, { 
				value: value
		    })
		)

		value === ''? setButtonSubmit({
			style: {
				backgroundColor: 'rgb(204,204,204)',
				color: 'rgb(0,0,0)'
			},
		}) : setButtonSubmit({
			style: {
				backgroundColor: 'rgb(255,0,0)',
				color: 'rgb(255,255,255)'
			},
		})

	}

	const buttonCancelClick = () => {
		setTextarea(
			Object.assign({}, textarea, { 
				style: {
					color: 'rgb(0,0,0,0.5)'
				},
				value: 'say something you like ...'
		    })
		)
		
		textBlur()

	}

	const buttonSublmitClick = () => {
		let value = textarea.value
		if (value === '' || value === 'say something you like ...') {
			return
		}

		const user_comment ={
			video_id: props.video_id,
			comment_content: value
		}

		props.commentUpdate(user_comment)

		setTextarea(
			Object.assign({}, textarea, { 
				style: {
					color: 'rgb(0,0,0,0.5)'
				},
				value: 'say something you like ...'
		    })
		)

		textBlur()

		setButtonSubmit({
			style: {
				backgroundColor: 'rgb(204,204,204)',
				color: 'rgb(0,0,0)'
			},
		})

	}


  	return (
	    <div className="_comment" style={{
            width: '100%',
            minHeight: '100%',
            // borderBottom: '1px dotted #000',
            marginTop: '10px',
            marginBottom: '40px',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingRight: '0px',
            display: 'flex'
          }}>
            <div>
              <Avatar
                src={props.user_info.avatarUrl}
                alt={props.user_info.name}
                size={64}
              />
            </div>

            <div style={{
            	marginLeft: '20px',
            	width: 'calc(95% - 64px)',
            }} className="_comment_text">
				
				<div style={state.style.subDiv}></div>
				
				<div style={{
					height: '33.3%',
				}} onClick={() => textClick()}>
					<textarea style={textarea.style} value={textarea.value} onChange={e => textareaChange(e)}/>
					<span style={state.style.span}></span>
				</div>
				{
					state.isClick? 
					<div style={{
						marginTop: '10px',
						float: 'right'
					}}>
						<button style={{
						  backgroundColor: 'rgb(240,240,240)',
						}} onClick={() => buttonCancelClick()}>Cancel</button>
						<button onClick={() => buttonSublmitClick()} style={buttonSubmit.style}>Submit</button>
					</div>
					:
					null
				}
            </div>
	</div>
  )
}

export default CommentText;