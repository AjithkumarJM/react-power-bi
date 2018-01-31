import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import cookie from 'react-cookies';
import Dashboard from './dashboard'
import Header from './header';
import Login from './login';

export default class App extends Component {

    componentWillMount() {
        this.state = { isSession: cookie.load('session') }
    }

    renderMenu() {
        return (
            <Route exact path='/' component={Dashboard} />
        )
    }

    render() {
        if (this.state.isSession) {
            return (
                <div>
                    <BrowserRouter>
                        <div>
                            <Header />
                            <div className='topBodyWrap'>
                                <div className='equalPadding'>
                                    <div className=''>
                                        {this.renderMenu()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BrowserRouter>
                </div>
            );
        } else
            return (
                <div>
                    <Login />
                </div>
            );
    }
}