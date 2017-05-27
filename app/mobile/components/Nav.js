import React from 'react'
import { render } from "react-dom"
import { NavBar, Drawer, List } from 'antd-mobile';
import { Icon } from 'antd'
import { Link, hashHistory } from 'react-router'

const Item = List.Item;

export default class Nav extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        open: false,
        position: 'left',
    }

    onOpenChange = (e) => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const {open, position} = this.state;
        const title = this.props.location.pathname.substr(1)
        const sidebar = (
            <List className="sidebar-list">
                <Item><Link to="/gateway" onClick={this.onOpenChange}><Icon type="hdd" />gateway</Link></Item>
                <Item><Link to="/status" onClick={this.onOpenChange}><Icon type="sync" />status</Link></Item>
                <Item><Link to="/statistics" onClick={this.onOpenChange}><Icon type="area-chart" />statistics</Link></Item>
            </List>
        )
        return (
            <div>
                <NavBar mode="light"
                    iconName="ellipsis"
                    onLeftClick={this.onOpenChange}
                    >
                    {title}
                </NavBar>
                <div style={{ position: 'relative', height: '100%' }}
                    className="nav-sider">
                    <Drawer style={{
                        minHeight: document.documentElement.clientWidth - 200,
                        height: document.documentElement.clientHeight - 90
                    }}
                        dragHandleStyle={{ display: 'none' }}
                        sidebar={sidebar}
                        open={open}
                        position={position}
                        onOpenChange={this.onOpenChange}>
                        {this.props.children}
                    </Drawer>
                </div>
            </div>
        )
    }
}