import React from 'react'
import { render } from 'react-dom'

import { Link, hashHistory } from 'react-router'

import { Form, Icon, Input, Button, Message } from 'antd';
const FormItem = Form.Item;

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log(values)
                this.props.login(values)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form onSubmit={this.handleSubmit}
                    className="login-form-mobile">
                    <FormItem>
                        {
                            getFieldDecorator('user', {
                                rules: [{ required: true, message: 'Please input your username!' }]
                            })(
                                <Input placeholder="Username"
                                    size="large"
                                    className="login_input_mobile"></Input>
                                )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }]
                            })(
                                <Input type='password'
                                    placeholder="Password"
                                    className="login_input_mobile"></Input>
                                )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button-mobile" style={{backgroundColor: "#77b3d7"}}>Log in</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
