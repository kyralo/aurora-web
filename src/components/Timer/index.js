/*
* @Author: 王宸
* @Date:   2020-04-21 15:34:37
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-21 17:30:27
*/


import React, {
	useState,
	useEffect,
} from 'react';
import {
  Button
} from 'antd';

const Timer = (props) => {

	const [count, setCount] = useState(60);
	const [liked, setLiked] = useState(true);
	const [isSend,setIsSend] = useState(false);

	useEffect(() => {
	    let timer = 0;
	    if (isSend && count != 0) {
			timer = setInterval(() => {
				// 这时候的count由于闭包的原因，一直是0，所以这里不能用setCount(count-1)

				setCount(n => {
					console.log(n)
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
		setIsSend(true)
		setLiked(false)
	};

	return (
		<div>
		  <Button onClick={() => handleClick()} type="primary">
		    {
		      liked
		        ? '获取验证码'
		        : `${count} 秒后重发`
		    }
		  </Button>
		</div>
	)
}

export default Timer;