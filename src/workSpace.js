import React from 'react';
import EnterAllChecks from './indexComponent/enterAllChecks.js';
import ItemMain from './indexComponent/itemMain.js';
import Controls from './indexComponent/controls.js';
import SidePage from './sidePage.js'
import axios from 'axios';
import { Link } from 'react-router-dom'
/*
      父级模块
      works 保存的工作信息
      hasGone 保存的是全部工作完成情况，也就是全选框的状态
      show 展示要显示的工作信息
      chooseShow 当前选择的是展示哪种完成状态的工作：有全部状态显示（all）、完成状态显示（active）、未完成状态（completed）显示三种
      getWidth:获取当前窗口宽度
*/
export default class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            works: [],
            show: [],
            hasGone: false,
            chooseShow: 'all',
            getWidth: window.innerWidth
        };
    }

    // 使用axios.all，同时发起多个请求，将请求的内容拼接
    componentDidMount() {
        //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        const _this = this;
        axios.all([axios.get('http://localhost:3000/myJson/works.json?'),
        axios.get('http://localhost:3000/myJson/secondWorks.json')])
            .then(axios.spread(function (response, response1) {
                console.log(response.data)
                console.log(response1.data)
                let todo = (response.data).concat(response1.data);
                console.log(todo)
                _this.setState({
                    works: todo,
                    show: todo,
                });
            }))
            .catch(function (error) {
                console.log(error);
            })
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变

    }
    //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱 
    // 当执行路由跳转，跳到otherPage时候就会执行了
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    // 监听窗口大小改变
    handleResize = e => {
        this.setState({
            getWidth: e.target.innerWidth
        })
    }

    // 空格按钮触发获取框中事件
    //e.nativeEvent获取原生的事件对象
    handleEnterKey = (e) => {
        if (e.nativeEvent.keyCode === 13) {
            if (!e.target.value) return false;
            let newWork = {
                value: e.target.value,
                isCheck: false
            }
            this.handleChange(newWork)
            e.target.value = '';
        }
    }
    // 将事件存储到数组，并判断是否已存在该事件
    handleChange(newWork) {
        const works = this.state.works;
        if (!works.length) {
            works.push(newWork);
        }
        else if (works.length > 0) {
            for (let i = 0; i < works.length; i++) {
                if (works[i].value === newWork.value) {
                    alert("该任务已经存在")
                    return works;
                }
            }
            works.push(newWork);
        }
        this.setState({
            works: works,
            show: works
        });
    }


    // 删除当前的任务
    deleteWorks(index) {
        const works = this.state.works;
        works.splice(index, 1);
        this.setState({
            works: works,
            show: works
        })
    }

    // 清除所有已完成的任务
    clearDoWorks() {
        let works = this.state.works.filter(works => works.isCheck === false);
        this.setState({
            works: works,
            show: works,
            hasGone: false
        });
    }

    // 当按到全选按钮框，改变全选与全不选的状态
    handlerAllState(event) {
        this.changeState(null, event.target.checked, true);
    }

    // 改变当前状态,如果点击全选按钮执行if语句，如果点击单选按钮执行else语句
    changeState(index, isCheck, hasGone = false) {
        const works = this.state.works;
        if (hasGone) {
            works.map((works) => {
                works.isCheck = isCheck;
                return works;
            })

            this.setState({
                works: works,
                show: works,
                hasGone: isCheck,
            })
        } else {
            const works = this.state.works;
            works[index].isCheck = isCheck;
            let hasGone = false;
            if (works.every((works) => works.isCheck)) {
                hasGone = true;
            }

            this.setState({
                works: works,
                show: works,
                hasGone
            });
        }
    }

    /* 查看工作 
       判断点击是哪个按钮，show状态就存入符合信息的work展示出来
    */
    whichShow(shows) {
        const works = this.state.works;
        let todo;
        if (shows === 'all') {
            todo = works;
        } else if (shows === 'active') {
            todo = works.filter(works => !works.isCheck);
        } else {
            todo = works.filter(works => works.isCheck);
        }

        this.setState({
            show: todo,
            chooseShow: shows,
        });
    }


    render() {
        // 算有多少个是未完成的项目 
        const props = {
            worksNoGoneCount: (this.state.works && this.state.works.filter((works) => !works.isCheck)).length || 0
        };
        const giveValue = ['hello world！', '你好'];

        return (
            <React.Fragment>
                <div>
                    {this.state.getWidth > '1080' ? < SidePage /> : ''}
                </div>
                <div className="topFont">
                    <span className="todos">todos</span>
                </div>
                <div id="inputFrame">
                    <div id="root">
                        <div className="alls">
                            <EnterAllChecks works={this.state.works} hasGone={this.state.hasGone} handlerAllState={this.handlerAllState.bind(this)} />
                            <input type="text" className="inputs" onKeyDown={this.handleEnterKey.bind(this)} placeholder="What needs to be done?" />
                        </div>
                    </div>
                    <div id="adds">
                        <ItemMain show={this.state.show} hasGone={this.state.hasGone} deleteWorks={this.deleteWorks.bind(this)} changeState={this.changeState.bind(this)} />
                    </div>
                    <div id="controls">
                        {this.state.works.length > 0 ? <Controls {...props} chooseShow={this.state.chooseShow} works={this.state.works} clearDoWorks={this.clearDoWorks.bind(this)} changeState={this.changeState.bind(this)} whichShow={this.whichShow.bind(this)} /> : null}
                    </div>
                </div>
                <div className="foot">
                    <span className="footFont">Double-click to edit a todo</span>
                    <span className="footFont">Created by petehunt</span>
                    <span className="footFont">Part of TodoMVC</span>
                    <span className="footFont"><Link to={{ pathname: '/otherPage', query: { values: giveValue[0] } }}>测试跳转页面router</Link></span>
                    <span></span>
                    <span className="footFont"><Link to={{ pathname: '/home' }}>测试todos页面侧边栏页面更换</Link></span>
                    <span className="footFont"><Link to={{ pathname: '/home/seconds' }}>测试todos页面侧边栏页面更换</Link></span>
                </div>
            </React.Fragment>
        );
    }
}