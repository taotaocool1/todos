import React from 'react';
// 子组件 添加事件
export default class EnterSet extends React.Component {
  // 鼠标移入
  handlerMouseOver() {
    this.refs.deleteBtn.style.display = "inline";
  }
  // 鼠标移出
  handlerMouseOut() {
    this.refs.deleteBtn.style.display = "none";
  }
  // 删除指定的信息
  deleteOne() {
    this.props.deleteWorks(this.props.index);
  }
  // 处理任务是否完成状态
  handlerChange() {
    const isCheck = !this.props.isCheck;
    const index = this.props.index;
    this.props.changeState(index, isCheck);
  }
  // 判断存在内容显示全部勾选图标以及下拉div data-index 是自定义属性
  render() {

    const showCheck = this.props.isCheck ? { display: 'block' } : { display: 'none' };

    const doneStyle = this.props.isCheck ? { textDecoration: 'line-through', color: '#E6E6E6' } : { textDecoration: 'none' };


    return (
      <li className="addsContent" data-index={this.props.isCheck} onMouseOver={this.handlerMouseOver.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
        <span>
          <label className="changeCheck">
            {<span style={showCheck} className="checkIcon">&#10003;</span>}
            <input id="checkboxs1" className="checkboxs" type="checkbox" checked={this.props.isCheck} onChange={this.handlerChange.bind(this)} />
          </label>
        </span>
        {/*  */}
        <span style={doneStyle} >{this.props.value}</span>
        <span ref="deleteBtn" className="closes" style={{ 'display': 'none' }} onClick={this.deleteOne.bind(this)}>X</span>
      </li>
    )
  }
}