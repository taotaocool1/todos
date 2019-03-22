import React from 'react';

//子组件 信息显示操作
export default class Controls extends React.Component {
    // 绑定点击事件，清除已完成事件
    handlerClick() {
        this.props.clearDoWorks();
    }
    // 操作选择点击的按钮的事件
    handlerControl(e) {
        const shows = e.target.name;
        this.props.whichShow(shows);
    }

    // 判断存在内容显示全部可操作
    render() {

        return (
            <div className="addsContent1">
                <span>{this.props.worksNoGoneCount}item left</span>
                <div>
                    <button className="buttons" name="all" onClick={this.handlerControl.bind(this)}>All</button>
                    <button className="buttons" name="active" onClick={this.handlerControl.bind(this)}>Active</button>
                    <button className="buttons" name="completed" onClick={this.handlerControl.bind(this)}>Completed</button>
                </div>
                <div><button onClick={this.handlerClick.bind(this)} className="buttons">Clear completed</button></div>
            </div>
        );
    }
}
