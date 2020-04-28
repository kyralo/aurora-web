import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

export default class VideoTag extends React.Component {
  state = { checked: false };

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    return (
      <CheckableTag {...this.props} closable='true' checked={this.state.checked} onChange={this.handleChange} />
    );
  }
}