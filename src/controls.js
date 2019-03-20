import React from 'react';

//子组件 信息显示操作
export default class Controls extends React.Component {
    // 绑定点击事件，清除已完成事件
    handlerClick() {
        this.props.clearDoWorks();
    }
    // 操作选择可视的事件
    handlerAll() {
        this.props.showAllWorks();
    }
    handlerActive() {
        this.props.showNodoWorks();
    }
    handlerCompleted() {
        this.props.showDoWorks();
    }
    // 判断存在内容显示全部可操作
    render() {

        return (
            <div className="addsContent1">
                <span>{this.props.worksNoGoneCount}item left</span>
                <div>
                    <button className="buttons" onClick={this.handlerAll.bind(this)}>All</button>
                    <button className="buttons" onClick={this.handlerActive.bind(this)}>Active</button>
                    <button className="buttons" onClick={this.handlerCompleted.bind(this)}>Completed</button>
                </div>
                <div><button onClick={this.handlerClick.bind(this)} className="buttons">Clear completed</button></div>
            </div>
        );
    }
}
