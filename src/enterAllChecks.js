import React from 'react';

// 子组件 添加全选框
export default class EnterAllChecks extends React.Component {
  handlerAll(e) {
    this.props.handlerAllState(e);
  }
  render() {
    const worksLength = this.props.works.length ? { "visibility": "visible" } : { "visibility": "hidden" };
    return (
      <label className="labels" style={worksLength}>
        <input checked={this.props.hasGone} onChange={this.handlerAll.bind(this)} type="checkbox" style={{ 'display': 'none' }} />
        <span className="allsFont">{<span>&#9745;</span>}</span>
      </label>
    );
  }
}