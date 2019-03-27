import React from 'react';

// 子组件 添加全选框
export default class EnterAllChecks extends React.Component {
  handlerAll(e) {
    this.props.handlerAllState(e);
  }
  render() {
    const worksLength = this.props.works.length ? { "visibility": "visible" } : { "visibility": "hidden" };
    const EnterAllChecks = this.props.hasGone ? { "color": "#737373" } : { "color": "#E6E6E6" };
    return (
      <label className="labels" style={worksLength} >
        <input checked={this.props.hasGone} onChange={this.handlerAll.bind(this)} type="checkbox" style={{ 'display': 'none' }} />
        <span className="allsFont" style={EnterAllChecks}>{<span>&#9745;</span>}</span>
      </label>
    );
  }
}