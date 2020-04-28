/*
* @Author: 王宸
* @Date:   2020-04-21 15:14:50
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-21 15:17:45
*/
import React from 'react';

const DemoLogin = (props) => 
//获取验证码
	getCode = async theme => {
    	//我这边是获取了客户信息，从中取到客户的手机号和邮箱，若客户绑定了手机号，就通过手机号验证，若没有绑定手机号，就通过邮箱验证码验证
        const { data } = this.props.information.data
        //这个是获取当前语言
        let lang = getLocalStorage('defaultLanguage')
        //得到语言Id
        let langId = lang === 'Chinese' ? 'zh' : lang === 'English' ? 'en' : lang === 'Japanese' ? 'ja' : ''
       //把手机号和语言id传入后台，获取验证码
        await this.props.sendCode({ mobileOrEmail: data.mobile ? data.mobile : data.email, langId: langId })
       //因为发送验证码后台返回比较慢，所以我这边加了一个延时调用，这个方法主要是查看验证码发送的状态
        setInterval(() => 
            this.getSendCodeStatus(theme)
        }, 300)
    }
    //倒计时
    countDown() {
        const { count } = this.state
        if (count === 1) {//当为0的时候，liked设置为true，button按钮显示内容为 获取验证码
            this.setState({
                count: 60,
                liked: true,
            })
        } else {
            this.setState({
                count: count - 1,
                liked: false,
            })
            setTimeout(() => this.countDown(), 1000)//每一秒调用一次
        }
    }
    //发送验证码是否成功
    getSendCodeStatus = async theme => {
        const phoneNumberStatus = this.props.phoneNumberStatus.data
        if (phoneNumberStatus.success === false) {//若发送失败，提示客户信息发送失败，不进行倒计时
            sendCodeError(theme)
        } else {
            sendCodeSuccess(theme)//若发送成功，liked设为false，意味着发送验证码的按钮将被会禁用
            this.setState({
                authCode: '',
                email: '',
                liked: false,
            })
            this.countDown()//调用倒计时
        }
    }

  return (
     <div>
       <p className={littleTitle}>手机号</p>
      <Input className={apiMobileInput} disabled value={this.props.phoneNumber} />
        <p className={littleTitle}>获取验证码</p>
           <Input
              className={apiInput}
               addonAfter={
                  <button
                    //判断如果点击了获取验证码，就让button按钮上显示 *秒后重发送 并且button设置为disabled
                    disabled={this.props.liked ? false : true}
                    onClick={() => this.getCode(theme)}//点击此按钮获取验证码
                     className={verificationCode}>{this.state.liked ? 获取验证码:（60）秒后重发}
                   </button>} />
         </div>
  )
}

export default DemoLogin;