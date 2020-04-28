import React from 'react';

import styles from './Nav.module.css'

export default class Nav extends React.Component {

    render() {
    	const navList = this.props.navList;
        return (
            <div className={styles._nav}>
				<ul>
					{
						navList.map((item,index)=>{
							return (
								<li key={index}>
									<span onClick={this._click}>{item}</span>
								</li>
							)
						})
					}
				</ul>
			</div>
        );
    }

    _click(){
    	// console.log('nav')
    }
}