import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import { DatePicker, Collapse, BackTop, Switch, Table } from 'antd'

import GatewayDetail from './GatewayDetail'

const Panel = Collapse.Panel

const now = moment().format("YYYY-M-D")


export default class Gateway extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: 'EventId',
                dataIndex: "eventId"
            },
            {
                title: "In Service",
                dataIndex: "inService"
            },
            {
                title: "Success",
                dataIndex: "success"
            },
            {
                title: "Fail",
                dataIndex: "fail"
            }
        ]
    }

    state = {
        startValue: now,
        endValue: now,
        dateFormat: "YYYY-M-D",
        expandedRowKeys: ''
    }


    componentDidMount() {
        var url_param = {
            bTime: this.state.startValue,
            eTime: this.state.endValue
        }
        this.props.getEvents(url_param)
    }

    disabledStarDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value.format(this.state.dateFormat)
        }, () => {
            var url_param = {
                bTime: this.state.startValue,
                eTime: this.state.endValue
            };
            console.log(url_param)
            this.props.getEvents(url_param)
        })
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    onExpand(expanded, record) {
        console.log(record)
        this.setState({
            expandedRowKeys: record.eventId
        })
        if (!expanded) {
            this.setState({
                expandedRowKeys: ""
            })
        }
    }


    render() {
        const { startValue, endValue, expandedRowKeys} = this.state
        const {eventsIdList,
            getEventDetail,
            statusInfo,
            getGatewayStatus,
            eventDetails,
            is_loading,
            toggleGatewayStatus} = this.props
        const dateFormat = "YYYY-M-D"
        const columns = this.columns
        return (
            <div className="main-container">
                <BackTop></BackTop>
                <h1>Gateway</h1>
                <div className="date-picker" style={{ marginBottom: "20px" }}>
                    <DatePicker disabledDate={this.disabledStarDate}
                        showToday
                        format={dateFormat}
                        value={moment(startValue, dateFormat)}
                        placeholder="Start"
                        defaultValue={moment()}
                        onChange={this.onStartChange}
                        size="large"
                        style={{ marginRight: "20px", fontSize: '16px' }}
                        />
                    <DatePicker disabledDate={this.disabledEndDate}
                        showToday
                        format={dateFormat}
                        value={moment(endValue, dateFormat)}
                        placeholder="End"
                        defaultValue={moment()}
                        size="large"
                        onChange={this.onEndChange} />
                </div>
                <div className="evnets_list_table">
                        <Table columns={columns}
                            pagination={false}
                            dataSource={eventsIdList}
                            expandedRowKeys={[expandedRowKeys]}
                            onExpand={(expanded, record) => this.onExpand(expanded, record)}
                            expandedRowRender={record => {
                                return (
                                    <GatewayDetail start={startValue}
                                        end={endValue}
                                        eventId={record.eventId}
                                        getEventDetail={getEventDetail}
                                        isloading={is_loading}
                                        eventDetail={eventDetails[record.eventId] || []}
                                        record={record}
                                        ></GatewayDetail>
                                )
                            } }
                            rowKey={eventsIdList => eventsIdList.eventId}></Table>
                </div>

            </div>
        )
    }
}


const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
};