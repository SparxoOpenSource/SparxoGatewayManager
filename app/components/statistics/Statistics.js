import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { DatePicker, Spin } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import CustomTooltip from './CustomTooltip'

export default class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: moment().subtract(7, 'days').format("YYYY-M-D"),
            endValue: moment().format("YYYY-M-D"),
            dateFormat: "YYYY-M-D",
        };
    }

    componentDidMount() {
        var url_param = {
            bTime: this.state.startValue,
            eTime: this.state.endValue
        }
        this.props.loadStat(url_param)
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
            this.props.loadStat(url_param)
        })
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    render() {
        const { startValue, endValue, dateFormat} = this.state
        const {items, is_loading} = this.props

        return (
            <div className="main-container">
                <h1>Statistics</h1>
                <div className="date-picker" style={{ marginBottom: "20px" }}>
                    <DatePicker disabledDate={this.disabledStarDate}
                        showToday
                        format={dateFormat}
                        value={moment(startValue, dateFormat)}
                        placeholder="Start"
                        defaultValue={moment()}
                        onChange={this.onStartChange}
                        size="large"
                        style={{ marginRight: "20px" }}
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
                <div>
                    <Spin spinning={is_loading}>
                        <ResponsiveContainer width='100%' height={400}>
                            <LineChart data={items}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="Date" />
                                <CartesianGrid strokeDasharray="3 3" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line type="monotone" dataKey="Count" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Spin>
                </div>
            </div>
        )
    }
}

