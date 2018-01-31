import React, { Component } from 'react';
import cookie from 'react-cookies';

export default class Header extends Component {
    logout() {
        cookie.remove('session', { path: '/' });
        window.location.href = '/';
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light headerShadow">
                    {/* <a className="navbar-brand" href="#">Navbar w/ text</a> */}
                    <img src="/src/assets/images/logo.png" width="100" height="35" alt="ems jaishu" />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <div className="navbar btn-group ml-auto">
                            <button type="button" className="btn btn-outline-dark btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle" aria-hidden="true"></i> John Doe</button>
                            <div className="dropdown-menu dropdown-menu-right drp-dwn">
                                {/* <button className="dropdown-item" type="button" data-toggle='modal' data-target="#changePwd" data-backdrop="static" ><i className="fa fa-lock" aria-hidden="true"></i> Change Password <span></span></button> */}
                                <button className="dropdown-item btn-sm" type="button" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                            </div>
                        </div>

                    </div>
                </nav>
            </header>
        );
    }
}