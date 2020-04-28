/*
* @Author: 王宸
* @Date:   2020-04-21 13:40:11
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-21 14:03:52
*/
import React from 'react';
import './style.css'

const Loading = (props) => {
  return (
    <div style={{
		// margin: '0 auto',
	    position: 'relative',
		left: '50%',
		top: '50%',
	    transform: 'translate(-50%,-50%)',
		width: '60px'
    }}>
        <div className="sk-swing">
	      <div className="sk-swing-dot"></div>
	      <div className="sk-swing-dot"></div>
	    </div>
    </div>
  )
}

export default Loading;