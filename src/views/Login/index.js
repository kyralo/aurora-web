/*
* @Author: 王宸
* @Date:   2019-12-27 20:59:11
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-22 07:18:37
*/
import React, {
	useState
}  from 'react';
import { connect } from 'react-redux';

import {
	loginReq
} from '@store/login/actionCreators'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import {
  Link
} from "react-router-dom";


const NormalLoginForm = (props) => {

	const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				if (!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(values.mail)) {
					alert('Your e-mail is not support!')
					return
				}

				let user = {
					email: values.mail,
					password: values.password,
				}
				props.login(user);
			}
		});
	};

	const { getFieldDecorator } = props.form;
    return (
		<div>
		  <Form onSubmit={e => handleSubmit(e)} className="login-form" style={{
	      	maxWidth: '300px',
	      	position: 'absolute',
	      	left: '50%',
	      	top: '50%',
	      	transform: 'translate(-50%, -50%)',
	      }}>
	        <Form.Item>
	          {getFieldDecorator('mail', {
	            rules: [{ required: true, message: 'Please input your e-mail!' }],
	          })(
	            <Input
	              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
	              placeholder="E-mail"
	            />,
	          )}
	        </Form.Item>
	        <Form.Item>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: 'Please input your Password!' }],
	          })(
	            <Input
	              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
	              type="password"
	              placeholder="Password"
	            />,
	          )}
	        </Form.Item>
	        <Form.Item>
	          {getFieldDecorator('remember', {
	            valuePropName: 'checked',
	            initialValue: true,
	          })(<Checkbox>Remember me</Checkbox>)}
	          <a className="login-form-forgot" href="" style={{
	          	float: 'right'
	          }}>
	            Forgot password
	          </a>
	          <Button type="primary" htmlType="submit" className="login-form-button" style={{
	          	 width: '100%'
	          }}>
	            Login
	          </Button>
	          Or <Link to="/register">register now!</Link>
	        </Form.Item>
	      </Form>
		</div>
    );
}

const Login = Form.create()(NormalLoginForm);

const mapDispatchToProps = (dispatch) => {
    return {
        login(user) {
            const action = loginReq(user);
            dispatch(action);
        },
    }
};

 export default connect(null, mapDispatchToProps)(Login);