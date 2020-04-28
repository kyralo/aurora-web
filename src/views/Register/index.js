/*
* @Author: 王宸
* @Date:   2019-12-28 15:51:04
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-22 08:44:49
*/
import React, {
  useState,
  useEffect,
}  from 'react';

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';


import { connect } from 'react-redux';

import {
  registerReq,
  codeReq
} from '@store/login/actionCreators'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const RegistrationForm = (props) => {

  const [state, setState] = useState({
    confirmDirty: false,
    autoCompleteResult: [],
  })

  const [count, setCount] = useState(60);
  const [liked, setLiked] = useState(true);
  const [isSend,setIsSend] = useState(false);
  const [mail,setMail] = useState('');

  useEffect(() => {
      let timer = 0;
      if (isSend && count != 0) {
      timer = setInterval(() => {
        // 这时候的count由于闭包的原因，一直是0，所以这里不能用setCount(count-1)
        setCount(n => {
          if (n == 1) {
            setIsSend(false)
            setLiked(true)
            clearInterval(timer)
          }
          return n - 1
        });
      }, 1000)
      }
      return () => {
        // 组件销毁时，清除定时器
        setCount(60)
        clearInterval(timer)
      };
  }, [isSend]);

  const handleClick = () => {
    if (!liked) {
      return;
    }
    
    if (!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(mail)) {
      alert('Your e-mail is not support!')
      return
    }

    props.register({
      mail: mail
    })

    setIsSend(true)
    setLiked(false)
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        if (!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(values.email)) {
          alert('Your e-mail is not support!')
          return
        }

        let user = {
          mail: values.email,
          name: values.nickname,
          password: values.password,
          code: values.code,
        }
        props.register(user);

      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setState({ confirmDirty: state.confirmDirty || !!value });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const { getFieldDecorator } = props.form;
  const { autoCompleteResult } = state;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div>
        <Form {...formItemLayout} onSubmit={handleSubmit} style={{
          width: '50%',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          }}>
          
        
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input onChange={e => {setMail(e.target.value)}}/>)}
        </Form.Item>
         <Form.Item
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label={
              <span>
                Code&nbsp;
                <Tooltip title="Please write your email code we sent to so that we can verify your email?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'Please input your Code!' }],
            })(
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}>
                <Input
                prefix={<Icon type="lock" style={{ 
                  color: 'rgba(0,0,0,.25)' 
                }} />}
                type="password"
                placeholder="Code"
                style={{
                  width: '65%',
                  height: '32px',
                }}
              />

            <div style={{
                width: '35%',
              }}>
          <Button onClick={() => handleClick()} type="primary">
            {
              liked
                ? '获取验证码'
                : `${count} 秒后重发`
            }
          </Button>
        </div>
            </div>
            )}
        </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
    </div>
  )
}

const Register = Form.create()(RegistrationForm);


const mapDispatchToProps = (dispatch) => {
    return {
        register(user) {
            const action = registerReq(user);
            dispatch(action);
        },
        codeGet(mail){
          const action = codeReq(mail);
          dispatch(action)
        }
    }
};

 export default connect(null, mapDispatchToProps)(Register);
