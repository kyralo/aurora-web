/*
* @Author: 王宸
* @Date:   2019-12-26 15:46:46
* @Last Modified by:   王宸
* @Last Modified time: 2019-12-26 15:48:23
*/
import React from 'react';
import { Carousel } from 'antd';

import './style.css'


export default class index extends React.Component {

	render() {
		return (
			<div>
				<Carousel autoplay>
					<div>
					  <h3>1</h3>
					</div>
					<div>
					  <h3>2</h3>
					</div>
					<div>
					  <h3>3</h3>
					</div>
					<div>
					  <h3>4</h3>
					</div>
				</Carousel>
			</div>
		);
	}
}
