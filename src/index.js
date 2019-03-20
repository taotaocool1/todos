import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 子组件 添加全选框
class EnterAllChecks extends React.Component{
  handlerAll(e){
    this.props.handlerAllState(e);
  }
  render(){
  const worksLength = this.props.works.length?{"visibility":"visible"}:{"visibility":"hidden"};
  return(
  <label className="labels" style={worksLength}>
  <input checked={this.props.hasGone} onChange={this.handlerAll.bind(this)} type="checkbox" style={{'display': 'none'}}/>
  <span className="allsFont">{<span>&#9745;</span>}</span>
  </label>
  );
  }
}

// 子组件 添加事件
class EnterSet extends React.Component { 
        // 鼠标移入
        handlerMouseOver(){
          ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "inline";
        }
        // 鼠标移出
        handlerMouseOut(){
          ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
        }
        // 删除指定的信息
        deleteOne(){
          this.props.deleteWorks(this.props.index);
        }
        // 处理任务是否完成状态
        handlerChange(){
         const isCheck = !this.props.isCheck;
         const index = this.props.index;
         this.props.changeState(index,isCheck);
        }
        // 判断存在内容显示全部勾选图标以及下拉div
        render(){
          const doneStyle = this.props.isCheck ? {textDecoration: 'line-through'} : {textDecoration: 'none'};
          return(
                 <div className="addsContent"  style={{'display': 'inline'}} data-index={this.props.isCheck} onMouseOver={this.handlerMouseOver.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
                   <input id="checkboxs" className="checkboxs" type="checkbox" checked={this.props.isCheck} onChange={this.handlerChange.bind(this)}/>
                   <label for="checkboxs" className="changeCheck"></label>
                   <span style={doneStyle}>{this.props.value}</span>
                   <span ref="deleteBtn" className="closes" style={{'display': 'none'}}  onClick={this.deleteOne.bind(this)}>X</span>
                 </div>      
           )
        }
}

//为什么循环组件要单独拿出来
class ItemMain extends React.Component{
  render(){
    return(
      <div className="divWidth">
        {
          this.props.works.map((item,index)=>{
            return(
               <EnterSet key={index} {...item}  index={index} {...this.props} />
            );
          })
        }
      </div>
      
    );
  }
}

//子组件 信息显示操作
class Controls extends React.Component { 
  
  // 绑定点击事件，清除已完成事件
   handlerClick(){
     this.props.clearDoWorks();
   } 

   handlerAll(){
     this.props.showAllWorks();
   }
   handlerActive(){
    this.props.showNodoWorks();
   }
   handlerCompleted(){
    this.props.showDoWorks();
   }
  // 判断存在内容显示全部可操作
  render(){
    return(
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

/*
      父级模块
      works 保存的工作信息
      hasGone 保存的是是否工作完成
*/
class Workspace extends React.Component{
    constructor(props){
        super(props);
        this.state={
            works:[],
            hasGone:false,
        }; 
    }

    // 空格按钮触发获取框中事件
    //e.nativeEvent获取原生的事件对像
    handleEnterKey = (e) => {
        if(e.nativeEvent.keyCode === 13){ 
              if(!e.target.value)return false;
              let newWork={
                value:e.target.value,
                isCheck:false
              }
              this.handleChange(newWork)
              e.target.value='';  
        }
    }
    // 将事件存储到数组
    handleChange(newWork) {
        const works = this.state.works;
        if(!works.length){
          works.push(newWork);
        }
        else if(works.length>0){
          for(let i=0;i<works.length;i++){
            if(works[i].value===newWork.value){
              alert("该任务已经存在")
              return works;
            } 
          }
          works.push(newWork); 
        }
        this.setState({
           works:works,
           allWork:works
        });
        }

    
    // 删除当前的任务
    deleteWorks(index){
      this.state.works.splice(index,1);
      this.setState({
        works:this.state.works,
        allWork:this.state.works
      })
    }
    
     // 清除所有已完成的任务
    clearDoWorks(){
      let works = this.state.works.filter(works => works.isCheck===false);
      this.setState({
        works: works,
        hasGone: false
      });
  }

    // 判断是否所有任务的状态都完成
  //   allChecked(){
  //     let hasGone = false;
  //     if(this.state.works.every((works)=> works.isCheck)){
  //       hasGone = true;
  //     }
      
  //     this.setState({
  //        works: this.state.works,     
  //        hasGone});
  // }
  
    // 处理全选与全不选的状态
    handlerAllState(event){
    this.changeState(null, event.target.checked, true);
  }
    // 改变当前状态
    changeState(index,isCheck,hasGone=false){
      if(hasGone){
        this.state.works.map((works) => {
          works.isCheck = isCheck;
            return works;
        })
        
        this.setState({
            works: this.state.works,
            hasGone: isCheck,   
        })
    }else{
        this.state.works[index].isCheck = isCheck;
        let hasGone = false;
      if(this.state.works.every((works)=> works.isCheck)){
        hasGone = true;
      }
      
      this.setState({
         works: this.state.works,     
         hasGone});
        // this.allChecked();
    }  
    }
    // 查看所有工作
    showAllWorks(){
      const aa = document.getElementsByClassName("addsContent");
      for(var i=0;i<aa.length;i++){
        if(aa[i].getAttribute("data-index")==="false"||aa[i].getAttribute("data-index")==="true"){
              aa[i].style.display="block";
        }
      }
    }
    //查看没完成的工作 
    showNodoWorks(){
      const aa = document.getElementsByClassName("addsContent");
      for(var i=0;i<aa.length;i++){
        if(aa[i].getAttribute("data-index")==="false"){
              aa[i].style.display="block";
        }else{
          aa[i].style.display="none";
        }
      }
    }
    // 查看全部完成的工作
    showDoWorks(){
      const aa = document.getElementsByClassName("addsContent");
      for(var i=0;i<aa.length;i++){
        if(aa[i].getAttribute("data-index")==="true"){
              aa[i].style.display="block";
        }else{
          aa[i].style.display="none";
        }
      }
    }

    render(){
        // 算有多少个是未完成的项目 
        const props = {
          worksNoGoneCount: (this.state.works && this.state.works.filter((works)=>!works.isCheck)).length || 0
        };
        return(
            <div>
            <div id="root">
                <div className="alls">
                <EnterAllChecks works={this.state.works} hasGone={this.state.hasGone} handlerAllState={this.handlerAllState.bind(this)}/>
                  <input type="text" className="inputs"  onKeyDown={this.handleEnterKey.bind(this)} placeholder="What needs to be done?"/>
                </div>
            </div>
            <div id="adds">
              <ItemMain works={this.state.works}  hasGone={this.state.hasGone}  deleteWorks={this.deleteWorks.bind(this)} changeState={this.changeState.bind(this)} />
            </div>
            <div id="controls">
              {this.state.works.length>0?<Controls {...props} clearDoWorks={this.clearDoWorks.bind(this)}  changeState={this.changeState.bind(this)} showAllWorks={this.showAllWorks.bind(this)} showNodoWorks={this.showNodoWorks.bind(this)} showDoWorks={this.showDoWorks.bind(this)}/>:null}
            </div>  
          </div>
        );
    }
}

ReactDOM.render(
    <Workspace />,
    document.getElementById("inputFrame")
)