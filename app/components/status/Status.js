import React from 'react'
import { render } from "react-dom"
import { Switch, Button, Row, Col, Popconfirm } from 'antd'

export default class StatusList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getGatewayStatus();
    }

    toggleStatus = () => {
        this.props.toggleGatewayStatus()
    }

    refresh= () =>{
        this.props.getGatewayStatus();
    }

    render() {
        const status_info = this.props.statusInfo
        if(!status_info){
            return(<div></div>)
        }
        return (
            <div className="main-container">
                <h1>Status</h1>
                <Row>
                    <Col span={12} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <Popconfirm title="are you sure?"
                                onConfirm={this.toggleStatus}>
                                <Switch checkedChildren={'on'}
                                    unCheckedChildren={'off'}
                                    checked={status_info.isOn}
                                    style={{ marginRight: '10px' }}>
                                </Switch>
                                <span>Gateway Status</span>
                            </Popconfirm>
                        </div>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button onClick={this.refresh}>Refresh</Button>
                    </Col>
                    <Col span={24}>
                        <div style={styles.actual}>
                            <pre style={{outline: 'none'}}>{status_info.perf[0]}</pre>
                            <pre style={{outline: 'none'}}>{status_info.perf[1]}</pre>
                            <pre style={{outline: 'none'}}>{status_info.perf[2]}</pre>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}


const styles = {
    actual: {
        backgroundColor: '#eee',
        borderRadius: '6px',
        padding: '20px'
    }
}
