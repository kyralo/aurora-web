import React from 'react';
import styles from './Button.module.css'


export default class Button extends React.Component {

    render() {
        const name = this.props.name;
        return (
            <div className={styles._button}>
				<span onClick={this._click}>{name}</span>
			</div>
        );
    }

    _click() {
        // console.log('hello')
    }
}