import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class EnterSet extends React.Component { 
        
        // 判断存在内容显示全部勾选图标以及下拉div
        render(){
          const works = this.props.works;
          return(
           works.map((item,index)=>{
           return(
                <div className="divWidth" key={index}>
                 <div className="addsContent">
                   <input className="checkboxs" type="checkbox" />
                   <span>{item}</span>
                   <span className="closes">X</span>
                 </div>
                </div> 
           );})
          )
        }
}

class Controls extends React.Component { 
        
  // 判断存在内容显示全部勾选图标以及下拉div
  render(){
    const num = this.props.changeNumber;
   
    return(
      
      <div className="addsContent">
      <span>{num}item left</span>
      <div>
        <button className="buttons">All</button>
        <button className="buttons">Active</button>
        <button className="buttons">Completed</button>
      </div>
      <div><button className="buttons">Clear completed</button></div>
    </div>
      
    );
    
  }
}

/*
      works 保存的工作信息
      changeNumber 保存的第几个工作信息
      hasGone 保存的是是否工作完成
*/
class Workspace extends React.Component{
    constructor(props){
        super(props);
        this.state={
            works:[],
            changeNumber:0,
            hasGone:false,
        };
        this.handleEnterKey = this.handleEnterKey.bind(this);
        
    }

    
    handleEnterKey = (e) => {
        if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
              this.handleChange(e)
              e.target.value='';  
        }
    }
    
    handleChange(e) {
        const works = this.state.works;
        works.push(e.target.value);
        this.setState({
           works:works,
           changeNumber:works.length,
           hasGone:false,
        });
        }

    render(){
        
        return(
            <div>
            <div id="root">
                <div className="alls">
                  <span className="allsFont">{<span>&#9745;</span>}</span>
                  <input type="text" className="inputs"  onKeyDown={this.handleEnterKey} placeholder="What needs to be done?"/>
                </div>
            </div>
            <div id="adds">
              <EnterSet works={this.state.works}/>
            </div>
            <div id="controls">
              <Controls changeNumber={this.state.changeNumber}/>
            </div>  
          </div>
        );
    }
}

ReactDOM.render(
    <Workspace />,
    document.getElementById("inputFrame")
)