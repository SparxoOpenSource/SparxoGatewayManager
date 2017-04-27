import React from 'react'
import { render } from 'react-dom'
import { Link, hashHistory } from 'react-router'


import { Row, Col, Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu;

export default class Nav extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const defaultSelectedKeys = this.props.location.pathname.substr(1)
        return (
            <div className="page-wrapper">
                <header id="header">
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={6}>
                            <a className="logo">
                                <img src="../img/new_logo.png" />
                                <span>GateWay Manage</span>
                            </a>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={18}>
                            <div className="login_info">
                                <span>admin</span>
                                <span style={{ marginLeft: "10px" }}>welcome!</span>
                            </div>
                        </Col>
                    </Row>
                </header>
                <div className="main-wrapper" >
                    <Row>
                        <Col xs={24} sm={24} md={6} lg={4}>
                            <div className="sidebar">
                                <Menu mode="inline" defaultSelectedKeys={[defaultSelectedKeys]} style={{ fontWeight: '500' }}>
                                    <Menu.Item key="gateway"><Link to="/gateway"><Icon type="hdd" />gateway</Link></Menu.Item>
                                    <Menu.Item key="status"><Link to="/status"><Icon type="sync" />status</Link></Menu.Item>
                                    <Menu.Item key="statistics"><Link to="/statistics"><Icon type="area-chart" />statistics</Link></Menu.Item>
                                </Menu>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={20}>
                            {this.props.children}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}