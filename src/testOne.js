// control 组件写的一个失败的案例，为以后学习

// //子组件 信息显示操作
// export default class Controls extends React.Component {
//     // 绑定点击事件，清除已完成事件
//     handlerClick() {
//         this.props.clearDoWorks();
//     }
//     // 操作选择可视的事件
//     handlerControl(e) {
//         const show = e.target.name;
//         console.log(show);
//         this.props.whichShow(show);
//     }
    
//     // 判断存在内容显示全部可操作
//     render() {

//         return (
//             <div className="addsContent1">
//                 <span>{this.props.worksNoGoneCount}item left</span>
//                 <div>
//                     <button className="buttons" name="all" onClick={this.handlerControl.bind(this)}>All</button>
//                     <button className="buttons" name="active" onClick={this.handlerControl.bind(this)}>Active</button>
//                     <button className="buttons" name="completed" onClick={this.handlerControl.bind(this)}>Completed</button>
//                 </div>
//                 <div><button onClick={this.handlerClick.bind(this)} className="buttons">Clear completed</button></div>
//             </div>
//         );
//     }
// }

// 这个使用了状态改变展示完成还是未完成，但是没有保留下原有的信息状态
// class Workspace extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         works: [],
//         show: 'all',
//         hasGone: false,
//       };
//     }
  
//     // 空格按钮触发获取框中事件
//     //e.nativeEvent获取原生的事件对象
//     handleEnterKey = (e) => {
//       if (e.nativeEvent.keyCode === 13) {
//         if (!e.target.value) return false;
//         let newWork = {
//           value: e.target.value,
//           isCheck: false
//         }
//         this.handleChange(newWork)
//         e.target.value = '';
//       }
//     }
//     // 将事件存储到数组，并判断是否已存在该事件
//     handleChange(newWork) {
//       const works = this.state.works;
//       if (!works.length) {
//         works.push(newWork);
//       }
//       else if (works.length > 0) {
//         for (let i = 0; i < works.length; i++) {
//           if (works[i].value === newWork.value) {
//             alert("该任务已经存在")
//             return works;
//           }
//         }
//         works.push(newWork);
//       }
//       this.setState({
//         works: works,
//       });
//     }
  
  
//     // 删除当前的任务
//     deleteWorks(index) {
//       const works = this.state.works;
//       works.splice(index, 1);
//       this.setState({
//         works: works,
//       })
//     }
  
//     // 清除所有已完成的任务
//     clearDoWorks() {
//       let works = this.state.works.filter(works => works.isCheck === false);
//       this.setState({
//         works: works,
//         hasGone: false
//       });
//     }
  
//     // 当按到全选按钮框，改变全选与全不选的状态
//     handlerAllState(event) {
//       this.changeState(null, event.target.checked, true);
//     }
  
//     // 改变当前状态,如果点击全选按钮执行if语句，如果点击单选按钮执行else语句
//     changeState(index, isCheck, hasGone = false) {
//       const works = this.state.works;
//       if (hasGone) {
//         works.map((works) => {
//           works.isCheck = isCheck;
//           return works;
//         })
  
//         this.setState({
//           works: works,
//           hasGone: isCheck,
//         })
//       } else {
//         const works = this.state.works;
//         works[index].isCheck = isCheck;
//         let hasGone = false;
//         if (works.every((works) => works.isCheck)) {
//           hasGone = true;
//         }
  
//         this.setState({
//           works: works,
//           hasGone
//         });
//       }
//     }
  
//     /* 查看全部的工作 
//        使用的是更改展示状态
//     */
//     whichShow(show) {
//       const works = this.state.works;
//       let todo;
//       if (show === 'all') {
//         todo = works;
//       } else if (show === 'active') {
//         todo = works.filter(works => !works.isCheck);
//       } else {
//         todo = works.filter(works => works.isCheck);
//       }
  
//       this.setState({
//         works: todo
//       });
//     }
  
  
//     render() {
//       // 算有多少个是未完成的项目 
//       const props = {
//         worksNoGoneCount: (this.state.works && this.state.works.filter((works) => !works.isCheck)).length || 0
//       };
  
//       return (
//         <div>
//           <div id="root">
//             <div className="alls">
//               <EnterAllChecks works={this.state.works} hasGone={this.state.hasGone} handlerAllState={this.handlerAllState.bind(this)} />
//               <input type="text" className="inputs" onKeyDown={this.handleEnterKey.bind(this)} placeholder="What needs to be done?" />
//             </div>
//           </div>
//           <div id="adds">
//             <ItemMain ref="showOrNone" works={this.state.works} hasGone={this.state.hasGone} deleteWorks={this.deleteWorks.bind(this)} changeState={this.changeState.bind(this)} />
//           </div>
//           <div id="controls">
//             {this.state.works.length > 0 ? <Controls {...props} clearDoWorks={this.clearDoWorks.bind(this)} changeState={this.changeState.bind(this)} whichShow={this.whichShow.bind(this)} /> : null}
//           </div>
//         </div>
//       );
//     }
//   }
  
//   ReactDOM.render(
//     <Workspace />,
//     document.getElementById("inputFrame")
//   )






// 这个是使用dom结点操作展示完成还是未完成的失败用例，要学会使用状态
// class Workspace extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       works: [],
//       hasGone: false,
//     };
//   }

//   // 空格按钮触发获取框中事件
//   //e.nativeEvent获取原生的事件对象
//   handleEnterKey = (e) => {
//     if (e.nativeEvent.keyCode === 13) {
//       if (!e.target.value) return false;
//       let newWork = {
//         value: e.target.value,
//         isCheck: false
//       }
//       this.handleChange(newWork)
//       e.target.value = '';
//     }
//   }
//   // 将事件存储到数组，并判断是否已存在该事件
//   handleChange(newWork) {
//     const works = this.state.works;
//     if (!works.length) {
//       works.push(newWork);
//     }
//     else if (works.length > 0) {
//       for (let i = 0; i < works.length; i++) {
//         if (works[i].value === newWork.value) {
//           alert("该任务已经存在")
//           return works;
//         }
//       }
//       works.push(newWork);
//     }
//     this.setState({
//       works: works,
//       allWork: works
//     });
//   }


//   // 删除当前的任务
//   deleteWorks(index) {
//     this.state.works.splice(index, 1);
//     this.setState({
//       works: this.state.works,
//     })
//   }

//   // 清除所有已完成的任务
//   clearDoWorks() {
//     let works = this.state.works.filter(works => works.isCheck === false);
//     this.setState({
//       works: works,
//       hasGone: false
//     });
//   }

//   // 当按到全选按钮框，改变全选与全不选的状态
//   handlerAllState(event) {
//     this.changeState(null, event.target.checked, true);
//   }

//   // 改变当前状态,如果点击全选按钮执行if语句，如果点击单选按钮执行else语句
//   changeState(index, isCheck, hasGone = false) {
//     if (hasGone) {
//       this.state.works.map((works) => {
//         works.isCheck = isCheck;
//         return works;
//       })

//       this.setState({
//         works: this.state.works,
//         hasGone: isCheck,
//       })
//     } else {
//       this.state.works[index].isCheck = isCheck;
//       let hasGone = false;
//       if (this.state.works.every((works) => works.isCheck)) {
//         hasGone = true;
//       }

//       this.setState({
//         works: this.state.works,
//         hasGone
//       });
//     }
//   }

//   /* 查看全部的工作 
//      使用的方法是ref添加到循环添加事件的父组件ul ：ItemMain
//      然后找到父组件下的所有子节点：li，里面添加了自定义属性data-index
//      进行判断该li所添加的被选择状态
//   */
//   showAllWorks() {
//     const allDo = ReactDOM.findDOMNode(this.refs.showOrNone).children;
//     for (let i = 0; i < allDo.length; i++) {
//       if (allDo[i].getAttribute("data-index") === "false" || allDo[i].getAttribute("data-index") === "true") {
//         allDo[i].style.display = "block";
//       }
//     }
//   }
//   // 查看没完成的工作 
//   showNodoWorks() {
//     const noDo = ReactDOM.findDOMNode(this.refs.showOrNone).children;
//     for (let i = 0; i < noDo.length; i++) {
//       if (noDo[i].getAttribute("data-index") === "false") {
//         noDo[i].style.display = "block";
//       }
//       else {
//         noDo[i].style.display = "none";
//       }
//     }
//   }

//   // 查看完成的工作 
//   showDoWorks() {
//     const hasDo = ReactDOM.findDOMNode(this.refs.showOrNone).children;
//     for (let i = 0; i < hasDo.length; i++) {
//       if (hasDo[i].getAttribute("data-index") === "true") {
//         hasDo[i].style.display = "block";
//       }
//       else {
//         hasDo[i].style.display = "none";
//       }
//     }
//   }


//   render() {
//     // 算有多少个是未完成的项目 
//     const props = {
//       worksNoGoneCount: (this.state.works && this.state.works.filter((works) => !works.isCheck)).length || 0
//     };

//     return (
//       <div>
//         <div id="root">
//           <div className="alls">
//             <EnterAllChecks works={this.state.works} hasGone={this.state.hasGone} handlerAllState={this.handlerAllState.bind(this)} />
//             <input type="text" className="inputs" onKeyDown={this.handleEnterKey.bind(this)} placeholder="What needs to be done?" />
//           </div>
//         </div>
//         <div id="adds">
//           <ItemMain ref="showOrNone" works={this.state.works} hasGone={this.state.hasGone} deleteWorks={this.deleteWorks.bind(this)} changeState={this.changeState.bind(this)} />
//         </div>
//         <div id="controls">
//           {this.state.works.length > 0 ? <Controls {...props} clearDoWorks={this.clearDoWorks.bind(this)} changeState={this.changeState.bind(this)} showAllWorks={this.showAllWorks.bind(this)} showNodoWorks={this.showNodoWorks.bind(this)} showDoWorks={this.showDoWorks.bind(this)} /> : null}
//         </div>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Workspace />,
//   document.getElementById("inputFrame")
// )