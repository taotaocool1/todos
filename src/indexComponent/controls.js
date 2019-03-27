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
        const needDelete = this.props.works.filter(works => works.isCheck).length ? { "visibility": "visible" } : { "visibility": "hidden" };
        const all = this.props.chooseShow === 'all' ? { border: '1px solid #EFD5D5' } : { borderColor: '#ffffff' };
        const active = this.props.chooseShow === 'active' ? { border: '1px solid #EFD5D5' } : { borderColor: '#ffffff' };
        const completed = this.props.chooseShow === 'completed' ? { border: '1px solid #EFD5D5' } : { borderColor: '#ffffff' };
        return (
            <div className="addsControl">
                <span>{this.props.worksNoGoneCount}item left</span>
                <div>
                    <button className="buttons" style={all} name="all" onClick={this.handlerControl.bind(this)}>All</button>
                    <button className="buttons" style={active} name="active" onClick={this.handlerControl.bind(this)}>Active</button>
                    <button className="buttons" style={completed} name="completed" onClick={this.handlerControl.bind(this)}>Completed</button>
                </div>
                <div><button onClick={this.handlerClick.bind(this)} className="buttons" style={needDelete}>Clear completed</button></div>
            </div>
        );
    }
}
