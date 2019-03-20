import React from 'react';
import EnterSet from './enterSet.js';

//循环添加事件的组件
export default class ItemMain extends React.Component {
  render() {
    return (
      <ul className="divWidth">
        {
          this.props.works.map((item, index) => {
            return (
              <EnterSet key={index} {...item} index={index} {...this.props} />
            );
          })
        }
      </ul>

    );
  }
}