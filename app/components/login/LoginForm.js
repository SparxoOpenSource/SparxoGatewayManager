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
                    className="login-form">
                    <FormItem>
                        {
                            getFieldDecorator('user', {
                                rules: [{ required: true, message: 'Please input your username!' }]
                            })(
                                <Input prefix={<Icon type='user' style={{ fontSize: 13 }}></Icon>}
                                    placeholder="Username"
                                    size="large"></Input>
                                )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }]
                            })(
                                <Input prefix={<Icon type='lock' style={{ fontSize: 13 }}></Icon>}
                                    type='password'
                                    placeholder="Password"></Input>
                                )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
