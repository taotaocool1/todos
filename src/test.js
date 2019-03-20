import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class EnterSet extends React.Component { 
        
        // 鼠标移入
        handlerMouseOver(){
          ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "inline";
        }

        // 鼠标移出
        handlerMouseOut(){
          ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
        }

        
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
          // return(
          //   <div className="divWidth">
          //     {
          //       this.props.works.map((item,index)=>{
                  
          //         return(
          //           // <EnterSet key={index}  index={index} />
                    
          //           <div className="addsContent" key={index} index={index}>
          //           <input className="checkboxs" type="checkbox" checked={item.isCheck} data-index={index} onChange={this.handlerChange.bind(this)}/>
          //           <span style={doneStyle}>{item.value}</span>
          //           <span ref="deleteBtn" className="closes" data-index={index}  onClick={this.deleteOne.bind(this)}>X</span>
          //         </div> 
          //         );
          //       })
          //     }
          //   </div>
          // );
          return(
                 <div className="addsContent" style={{'display': 'inline'}} data-index={this.props.isCheck} onMouseOver={this.handlerMouseOver.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
                   <input className="checkboxs" type="checkbox" checked={this.props.isCheck} onChange={this.handlerChange.bind(this)}/>
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
               <EnterSet key={index} {...item}  index={index}  {...this.props}/>
            );
          })
        }
        {/* <div id="controls">
              {this.state.works.length>0?<Controls hasGone={this.state.hasGone} clearDoWorks={this.clearDoWorks.bind(this)} {...props} changeState={this.changeState.bind(this)} showAllWorks={this.showAllWorks.bind(this)} showNodoWorks={this.showNodoWorks.bind(this)} showDoWorks={this.showDoWorks.bind(this)}/>:null}
            </div>  */}
      </div>
      
    );
  }
}

//footer 操作
class Controls extends React.Component { 
  
  // 绑定点击事件，清除已完成
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
      works 保存的工作信息
      hasGone 保存的是是否工作完成
*/
class Workspace extends React.Component{
    constructor(props){
        super(props);
        this.state={
            works:[],
            hasGone:false,
            doWork:[],
            NoDoWork:[],
            allWork:[],
        }; 
    }

    // 空格按钮触发获取框中事件
    handleEnterKey = (e) => {
        if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
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
      let works = this.state.works.filter(works => !works.isCheck);
      this.setState({
        works: works,
        allWork:works,
        hasGone: false
      });
  }

    // 判断是否所有任务的状态都完成
    allChecked(){
      let hasGone = false;
      if(this.state.works.every((works)=> works.isCheck)){
        hasGone = true;
      }
      
      this.setState({
         works: this.state.works,
         allWork:this.state.works,
         
         hasGone});
  }
  
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
        this.allChecked();
    }  
    }
    
    showAllWorks(){
      // const allWork = this.state.allWork;
      // this.setState({
      //   works: allWork,
      // });
      const aa = document.getElementsByClassName("addsContent");
      for(var i=0;i<aa.length;i++){
        if(aa[i].getAttribute("data-index")==="false"||aa[i].getAttribute("data-index")==="true"){
              aa[i].style.display="block";
        }
      }
    }

    showNodoWorks(){
      // const doWork = this.state.doWork;
      // doWork.splice(0,doWork.length);
      // this.state.works.map((item,index)=>{
          
      //     if(item.isCheck===false){
      //       doWork.push(item);
            
      //     }else{

      //       return doWork;
      //   }
      //   })
      //   this.setState({
      //     works: doWork,
      // });
      // console.log(this.state.doWork)
      
      // const doWork = this.state.doWork;
      // this.state.works.map((item,index)=>{
      //   if(item.isCheck===false&&!doWork.length){
      //       doWork.push(item);
      //   }
      //   else if(item.isCheck===false){
      //     for(let i=0;i<doWork.length;i++){
      //         if(item.value===doWork[i].value){
      //           return doWork;
      //         }
      //     }
      //     doWork.push(item);
      // }})
      // console.log(this.state.doWork)
      // this.setState({
      //   works: doWork,
      // });
      const aa = document.getElementsByClassName("addsContent");
      for(var i=0;i<aa.length;i++){
        if(aa[i].getAttribute("data-index")==="false"){
              aa[i].style.display="block";
        }else{
          aa[i].style.display="none";
        }
      }
    }
    showDoWorks(){
      const aa = document.getElementsByClassName("addsContent");
      for(var i=0;i<aa.length;i++){
        if(aa[i].getAttribute("data-index")==="true"){
              aa[i].style.display="block";
        }else{
          aa[i].style.display="none";
        }
      }

      // const NoDoWork = this.state.NoDoWork;
      // NoDoWork.splice(0,NoDoWork.length);
      // this.state.works.map((item,index)=>{
          
      //     if(item.isCheck===true){
      //       NoDoWork.push(item);
            
      //     }else{

      //       return NoDoWork;
      //   }
      //   })
      //   this.setState({
      //     works: NoDoWork,
      // });

    //   const NoDoWork = this.state.NoDoWork;
    //   this.state.works.map((item,index)=>{
    //     if(item.isCheck===true&&!NoDoWork.length){
    //       NoDoWork.push(item);
    //     }
    //     else if(item.isCheck===true){
    //       for(let i=0;i<NoDoWork.length;i++){
    //           if(item.value===NoDoWork[i].value){
    //             return NoDoWork;
    //           }
    //       }
    //       NoDoWork.push(item);
    //   }})
    //  this.setState({
    //     works: NoDoWork,
    //   });
    }

    render(){
        // 算有多少个是未完成的项目 
        var props = {
          worksNoGoneCount: (this.state.works && this.state.works.filter((works)=>!works.isCheck)).length || 0
        };
        return(
            <div>
            <div id="root">
                <div className="alls">
                {this.state.works.length>0?<label className="labels"><input checked={this.state.hasGone} onChange={this.handlerAllState.bind(this)} type="checkbox" style={{'display': 'none'}}/><span className="allsFont">{<span>&#9745;</span>}</span></label>:null}
                  <input type="text" className="inputs"  onKeyDown={this.handleEnterKey.bind(this)} placeholder="What needs to be done?"/>
                </div>
            </div>
            <div id="adds">
              <ItemMain works={this.state.works}  hasGone={this.state.hasGone}  deleteWorks={this.deleteWorks.bind(this)} changeState={this.changeState.bind(this)} />
            </div>
            <div id="controls">
              {this.state.works.length>0?<Controls hasGone={this.state.hasGone} clearDoWorks={this.clearDoWorks.bind(this)} {...props} changeState={this.changeState.bind(this)} showAllWorks={this.showAllWorks.bind(this)} showNodoWorks={this.showNodoWorks.bind(this)} showDoWorks={this.showDoWorks.bind(this)}/>:null}
              {/* <Controls hasGone={this.state.hasGone} clearDoWorks={this.clearDoWorks.bind(this)} {...props} changeState={this.changeState.bind(this)} showAllWorks={this.showAllWorks.bind(this)} showNodoWorks={this.showNodoWorks.bind(this)} showDoWorks={this.showDoWorks.bind(this)}/> */}
            </div>  
          </div>
        );
    }
}

ReactDOM.render(
    <Workspace />,
    document.getElementById("inputFrame")
)