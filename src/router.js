import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import OtherPage from './otherPage.js';
import Workspace from './workSpace.js'

export default class BasicRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Workspace} />
                    <Route path="/home" component={Workspace} />
                    <Route path="/otherPage" component={OtherPage} />

                </Switch>
            </BrowserRouter>
        );
    }
} 
