/*
* @Author: 王宸
* @Date:   2019-12-31 16:08:09
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-30 16:48:22
*/
import React, {
	useState,
	useEffect,
} from 'react';

import { connect } from 'react-redux';

import {
  Form,
  Radio,
  Typography,
  Button,
  Avatar,
  Upload, 
  Icon,
  message,
} from 'antd';

import './style.css'

import {
	userInfoReq,
	userInfoUpdate,
	userInfoChange
} from '@store/user/actionCreators'

import axios from '@utils/axios'

import store from '@redux'

const { Paragraph } = Typography;

const Info = (props) => {

	const [state, setState] = useState({
		showUpdate: false,
	    loading: false,
	    imageUrl: ''
	});

	useEffect(() => {
		props.infoReq()

		let imageUrl = props.user_info.avatarUrl

		if (imageUrl === '') {
			imageUrl = ''
		}

		const newState = Object.assign({}, state, { 
	       imageUrl
	    });

		setState({
			...newState
		});
	}, []);

	const getBase64 = (img, callback) => {
	  const reader = new FileReader();
	  reader.addEventListener('load', () => callback(reader.result));
	  reader.readAsDataURL(img);
	}


	const uploadBefore = (file, fileList) =>  {

		if (fileList.length > 1) {
			message.error('You already upload one.');
			return false
		}

		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	}

	const avatarProps = {
	  name: 'file',
	  multiple: false,
	  action: axios.defaults.baseURL+'/file_up/user/images',
	  beforeUpload: uploadBefore,
	  headers: { 
	  	'Cache-Control': 'no-store',
		'Authorization': window.localStorage.getItem('Authorization'),
	  },
	}

	const onInputNameChange = e => {
		let user_info = props.user_info
		user_info.name = e
        props.infoUpdate(user_info)
	}

	const onInputMailChange = e => {
		let user_info = props.user_info
		user_info.mail = e
        props.infoUpdate(user_info)
	}	

	const onInputSignChange = e => {
		let user_info = props.user_info
		user_info.sign = e
        props.infoUpdate(user_info)
	}

	const update = () => {
		setState({
			showUpdate: true,
		});
	}

	const updateClose = () => {
		let user_info = props.user_info
		props.infoUpdate(user_info)
		props.infoReq()
		setState({
			showUpdate: false
		});
	}

	const onSelectChange = e => {
			let sex = e.target.value === 0? '男':'女';
			let user_info = props.user_info
			user_info.sex = sex
            props.infoUpdate(user_info)
	}

	const avatarChange = info => {
        let status = info.file.status;
		if (status === 'uploading') {
			const newState = Object.assign({}, state, { 
		       loading: true
		    });
			setState({ ...newState });
		}

	    if (status === 'done') {

			getBase64(info.file.originFileObj, imageUrl => {
				const newState = Object.assign({}, state, { 
				       imageUrl
				});
				setState({
				  ...newState
				});
			});

	    	if (info.file.response !== '') {
				let avatarUrl = axios.defaults.baseURL.substr(0, axios.defaults.baseURL.length - 6) + info.file.response
		        let user_info = {
		        	avatarUrl: avatarUrl
		        }
				const action = userInfoUpdate(user_info)
				store.dispatch(action)
			}
			
			message.success(`${info.file.name} file uploaded successfully.`);

	    } else if (status === 'error') {
	      message.error(`${info.file.name} file upload failed.`);
	    }
	};

	const uploadButton = (
      <div>
        <Icon type={state.loading ? 'loading' : 'plus'} />
      </div>
    );

    const { imageUrl } = state;

	const { getFieldDecorator } = props.form;

  return (
			<div className="user_info">
				<div style={{
					maxWidth: '90%',
					margin: '0 auto',
				}}>
					<h1>个人资料</h1>
					{
						state.showUpdate
						?
						<Button type="primary"  onClick={updateClose}>更新</Button>
						:
						null
					}
					<ul>
						<li>
							<div>
								<span style={{
								    height: '96px',
								    lineHeight: '96px',
								}}>头像</span>
								<div className="_user_avatar" onClick={update}>
								    <Upload
								    	{...avatarProps}
								    	showUploadList={false}
								    	className="avatar-uploader"
								    	listType="picture-card"
								    	onChange={avatarChange} 
								    >
								      {imageUrl ? <img src={imageUrl} style={{
								      	height: '96px',
										width: '96px', 
								      }} alt="avatar" /> : uploadButton}
								    </Upload>
								</div>
								
							</div>
						</li>					
						<li>
							<div>
								<span>ID</span>
								<Paragraph copyable>
									{props.user_info.id}
								</Paragraph>
							</div>
						</li>
						<li>
							<div>
								<span>昵称</span>
								<div>
									<Paragraph editable={{ onChange: e => onInputNameChange(e) }} onClick={update}>
										{props.user_info.name}
									</Paragraph>									
								</div>
							</div>
						</li>
						<li>
							<div>
								<span>邮箱</span>
								<div>
									<Paragraph editable={{ onChange: e => onInputMailChange(e) }} onClick={update}>
										{props.user_info.mail}
									</Paragraph>									
								</div>
							</div>						
						</li>
						<li>
							
							<div>
								<span>性别</span>
								<div onClick={update}>
									 <Radio.Group value={props.user_info.sex === '男'? 0:1}>
								        <Radio onChange={onSelectChange} value={0}>男</Radio>
								        <Radio  onChange={onSelectChange} value={1}>女</Radio>
								      </Radio.Group>
								</div>
							</div>							
						</li>
						<li>
							<div>
								<span>个性签名</span>
								<div>
									<Paragraph editable={{ onChange: e => onInputSignChange(e) }} onClick={update}>
										{props.user_info.sign}
									</Paragraph>
								</div>
							</div>							
						</li>
						<li>
							<div>
								<span>账号状态</span>
								<div>{props.user_info.fettle == 0 ? '正常' : '封禁'}</div>
							</div>							
						</li>
						<li>
							<div>
								<span>账号创建时间</span>
								<div>{props.user_info.createTime}</div>
							</div>							
						</li>
					</ul>
				</div>
			</div>
  )
}


const UserInfo = Form.create({ name: 'info' })(Info);

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        infoReq() {
            const action = userInfoReq();
            dispatch(action);
        },
		infoUpdate(user_info) {
            const action = userInfoUpdate(user_info);
            dispatch(action);
        },
        infoChange(user_info) {
        	const action = userInfoChange(user_info);
        	dispatch(action);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);