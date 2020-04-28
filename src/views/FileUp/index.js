/*
* @Author: 王宸
* @Date:   2019-12-31 22:06:50
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-27 12:29:08
*/
import React from 'react';

import { 
	Upload, 
	Icon, 
	message,
	Button,
	Input,
	Radio,
} from 'antd';

import { connect } from 'react-redux';

import axios from '@utils/axios'

import { videoKindChange } from '@store/video/actionCreators'

import { uploadChange } from '@store/fileup/actionCreators'

import './style.css'

import store from '@redux'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
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

const videoUploadBefore = (file, fileList) => {

	if (fileList.length > 1) {
		message.error('You already upload one.');
		return false
	}

	if (file.type !== 'video/mp4') {
		message.error('You can only upload MP4 file!');
		return false
	}

	if (file.size/1024/1024 > 300) {
		message.error('MP4 must smaller than 300MB!');
		return false
	}
}

const token = window.localStorage.getItem('Authorization')

const videoProps = {
  name: 'file',
  multiple: false,
  action: axios.defaults.baseURL+'/file_up/user/videos',
  beforeUpload: videoUploadBefore,
  headers: { 
  	'Cache-Control': 'no-store',
	'Authorization': token,
  },
  onChange(info) {

		const status = info.file.status;
	    if (status === 'done') {
			if (info.file.response !== '') {
				let video_url = axios.defaults.baseURL.substr(0, axios.defaults.baseURL.length - 6) + info.file.response
				let payload = {
					videoUrl: video_url 
				}

				const action = uploadChange(payload);
				store.dispatch(action);
			}
	      message.success(`${info.file.name} file uploaded successfully.`);
	    } else if (status === 'error') {
	      message.error(`${info.file.name} file upload failed.`);
	    }
  },
};

const coverProps = {
  name: 'file',
  multiple: false,
  action: axios.defaults.baseURL+'/file_up/video/image',
  headers: { 
  	'Cache-Control': 'no-store',
	'Authorization': token,
  }
}
		       

const { TextArea } = Input;

class FileUp extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
		let status = info.file.status;
		if (status === 'uploading') {
		  this.setState({ loading: true });
		}
		if (status === 'done') {
			let payload = {
				coverUrl: axios.defaults.baseURL.substr(0, axios.defaults.baseURL.length - 6) + info.file.response
			}

			let action = uploadChange(payload);
			this.props.dispatch(action);

			getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
				  imageUrl,
				  loading: false,
				}),
			);
		} else if (status === 'error') {
		  message.error(`${info.file.name} file upload failed.`);
		}
    };

 
  	componentDidMount(){

		let promise =  axios({
			method: "get",
			url: "/video_kind"
	    })
	    promise
	        .then( response => {
	            let video_kind = response

				if (video_kind) {
	                const action =  videoKindChange(video_kind)
	                this.props.dispatch(action);
				}
	        }).catch( error => {
	            
	        })

		let payload = {
			introduction: ''
		}
		const action = uploadChange(payload);
		this.props.dispatch(action);
	}


	kindSelect = e => {
	    this.setState({
	      value: e.target.value,
	    });
		let payload = {
			kindId: e.target.value
		}
		const action = uploadChange(payload);
		this.props.dispatch(action);
	}


	inputTitleChange(e){
		let payload = {
			title: e.target.value
		}
		const action = uploadChange(payload);
		this.props.dispatch(action);
	}

	inputIntroductionChange(e){
		let payload = {
			introduction: e.target.value
		}
		const action = uploadChange(payload);
		this.props.dispatch(action);
	}

	addNewVideo = () => {
		let upload = this.props.upload
		let promise =  axios({
			method: "post",
			url: "/video",
			data: upload,
			headers: { 
				'Authorization': window.sessionStorage.getItem('Authorization'),
			},
	    })
	    promise
	        .then( response => {
	            message.success('Your video released success!');
	        }).catch( error => {
	            message.success('Your video released failed!');
	        })
	}

    
	render() {

	const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const video_kind = this.props.video_kind;
	return (
		<div className="user_video_fileup">
			<div className='user_video_fileup_cover'>
			  <span>Cover</span>
		      <Upload 
		       showUploadList={false}
		       beforeUpload={beforeUpload}
		       className="avatar-uploader"
		       listType="picture-card"
		       onChange={this.handleChange}
		       {...coverProps}
		       >
		        {imageUrl ? <img src={imageUrl} alt="cover" style={{ width: '100%' }} /> : uploadButton}
		      </Upload>
			</div>
			<div className='user_video_fileup_video'>
			  <span>Video</span>
			  <div>
			    <Upload {...videoProps}>
			      <Button style={{
		          	width: '500px'
		          }}>
			        <Icon type="upload" /> Upload
			      </Button>
			    </Upload>
			  </div>
			</div>
			<div className='user_video_fileup_title'>
			  <span>Title</span>
			  <div><Input onChange={this.inputTitleChange.bind(this)}  ref="title" placeholder="Your Video Title" style={{
		          	width: '500px'
		          }}/></div>
			</div>

			<div className='user_video_fileup_title'>
			  <span>kind</span>
			  <div>
  			      <Radio.Group buttonStyle="solid"  onChange={this.kindSelect}  value={this.state.value}>
			        {
			        	video_kind.map( i => (
				        	<Radio.Button value={i.id} key={i.id} style={{
				        		marginRight: '10px'
				        	}}>{i.name}</Radio.Button>
			        	))
			        }
			      </Radio.Group>
		       </div>
			</div>

			<div className='user_video_fileup_intro'>
		      <span>Introduction</span>
		      <div>
		      	<TextArea
		          value={this.props.upload.introduction}
		          onChange={this.inputIntroductionChange.bind(this)}
		          placeholder="Controlled autosize"
		          autoSize={{ minRows: 6, maxRows: 10 }}
		          style={{
		          	width: '500px'
		          }}
		        />
		      </div>
			</div>

			<Button type="primary" htmlType="submit" style={{
				left: '50%',
				marginLeft: '-50px'
			}} onClick={this.addNewVideo.bind(this)}>
    			Submit
  			</Button>
		</div>
	);
	}
}


const mapStateToProps = (state) => {
    return {
        ...state.video,
        ...state.fileup
    }
};

export default connect(mapStateToProps, null)(FileUp);