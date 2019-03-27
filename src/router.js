import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import SidePage from './sidePage.js';
import Workspace from './workSpace.js'
export default class BasicRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Workspace} />
                    <Route exact path="/sidePage" component={SidePage} />
                </Switch>
            </BrowserRouter>
        );
    }
} 
