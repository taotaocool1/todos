import React from 'react';
import { Route } from 'react-router-dom'
export default class SidePage extends React.Component {
    render() {
        return (
            <div className="sideBackground">
                <span>
                    <Route path='/' exact component={Firsts} />
                    <Route path='/home' exact component={Firsts} />
                    <Route path='/home/seconds' component={Seconds} />
                </span>

            </div>
        );
    }
}
class Firsts extends React.Component {
    render() {
        return (
            <span style={{ fontSize: '70px' }}>
                这是第一个内容
         </span>
        );
    }
}
class Seconds extends React.Component {
    render() {
        return (
            <span style={{ fontSize: '70px', color: 'red' }}>
                这是第二个内容
         </span>
        );
    }
}