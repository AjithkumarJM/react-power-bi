import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {login} from './../actions';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            loginError: false
        };
    }

    generateInput(field){
        return(
            <div className="form-group">
                <input 
                    className="form-control-sm"
                    type={field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                />
                <span className="error">{field.meta.touched? field.meta.error:''}</span>
            </div>
        )
    }
    
    loggin(values) {
        // this.props.login(values, (response)=>{
            // cookie.save('session', response.data, {path: '/'});
            cookie.save('session', {path: '/'});
            // cookie.save('session', true, {path: '/'});
            // this.setState({loginError: false});
            window.location.reload();
        // }, (error)=> {
        //     if (error) {
        //         this.setState({loginError: true});
        //     }
        // });
    }
    renderLoginError() {
        if (this.state.loginError) {
            return (
                <p className="text-danger login-error">
                    Invalid username or password
                    <i className="fa fa-times-circle-o pull-right" onClick={()=>{this.setState({loginError:false});}}></i>
                </p>
            );
        }
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <section className="login">
                <div className="container-fluid">
                    <div className="row image-wrap"></div> 
                    <div className="row">
                        <div className="col-12 col-md-6 text-center">
                            <img className="login-logo" src="src/assets/images/logo.png"/>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="col-12 col-md-6 offset-md-3">
                                <div className="card-block">
                                    <h4>Login here...</h4>
                                    <form onSubmit={handleSubmit(this.loggin.bind(this))}>
                                        <Field
                                            placeholder="Email or Username"
                                            name="user_name"
                                            type="text"
                                            component={this.generateInput}
                                        />
                                        <Field
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                            component={this.generateInput}
                                        />
                                        <button type="submit" className="btn btn-sm btn-ems-primary">Sign In</button>
                                    </form>
                                    {this.renderLoginError()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.UserName)
        errors.UserName = "Enter the username first";
    if (!values.Password)
        errors.Password = "Enter the password first";
    return errors;
}

export default reduxForm({
    validate,
    form: 'logInForm'
})(connect(null, {login})(Login));