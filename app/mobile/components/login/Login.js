import React from 'react';
import { render } from 'react-dom'
import LoginForm from './LoginForm'
import { Form } from 'antd'

import { hashHistory } from 'react-router'


export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }


    login = (values) => {
        console.log(values)
        this.props.login(values)
    }

    componentDidUpdate() {
        if (this.props.is_login) {
            sessionStorage.is_login = true;
            sessionStorage.token = this.props.token;
            hashHistory.push({
                pathname: '/home'
            })
        }
    }

    render() {
        const WrappedLoginForm = Form.create()(LoginForm)
        const {login, is_login} = this.props
        return (
            <div className="login-container-mobile">
                <div className='login-wapper-mobile'>
                    <div className="login-logo-mobile">
                        <img src="../../../img/new_logo.png" alt=""/>    
                    </div>
                    <WrappedLoginForm login={this.login}></WrappedLoginForm>
                </div>

            </div>
        )
    }
}
