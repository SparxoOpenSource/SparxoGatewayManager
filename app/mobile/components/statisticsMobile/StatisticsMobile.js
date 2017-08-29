import React from 'react'
import { render } from 'react-dom'
import moment from 'moment';
import { DatePicker, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Item = List.Item;

const gmtNow = moment().utcOffset(0);
const now = moment().format("YYYY-M-D");

class StatisticsMobile extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        startValue: gmtNow,
        endValue: gmtNow,
        dateFormat: "YYYY-M-D",
        activeIndex: 0,
    }

    componentDidMount() {
        var url_param = {
            bTime: this.state.startValue.format(this.state.dateFormat),
            eTime: this.state.endValue.format(this.state.dateFormat)
        }
        this.props.loadStat(url_param)
    }

    selectDate = (field, date) => {
        this.setState({
            [field]: date
        }, () => {
            var url_param = {
                bTime: this.state.startValue.format(this.state.dateFormat),
                eTime: this.state.endValue.format(this.state.dateFormat)
            }
            this.props.loadStat(url_param)
        })

    }

    onStartChange = (value) => {
        this.selectDate('startValue', value);
    }

    onEndChange = (value) => {
        this.selectDate('endValue', value);
    }

    handleClick = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }

    render() {
        const {startValue, endValue, dateFormat, activeIndex} = this.state;
        const {items, is_loading} = this.props
        const activeItem = items[activeIndex];
        return (
            <div>
                <List
                    className="date-picker-list"
                    style={{ backgroundColor: 'white', marginBottom: "0.9rem" }}
                    >
                    <DatePicker
                        mode="date"
                        title="Choose Date"
                        maxDate={endValue}
                        onChange={this.onStartChange}
                        value={this.state.startValue}
                        >
                        <List.Item arrow="horizontal">Begain Date</List.Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        title="Choose Date"
                        minDate={startValue}
                        onChange={this.onEndChange}
                        value={this.state.endValue}
                        >
                        <List.Item arrow="horizontal">End Date</List.Item>
                    </DatePicker>
                </List>
                <div>
                    <ResponsiveContainer width='100%' height={400} style={{ margin: "40px 20px" }}>
                        <BarChart data={items}>
                            <Bar dataKey='Count' onClick={this.handleClick}>
                                {
                                    items.map((entry, index) => (
                                        <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <ActiveItem item={activeItem}></ActiveItem>
                </div>
            </div>
        )
    }
}

const ActiveItem = ({item}) => {
    if (!item || item.Count == 0) {
        return (<div></div>)
    }
    return (
        <div style={{ marginTop: "0.9rem" }}>
            <List className="detailsList">
                <Item extra={item.Count}>Total</Item>
                {
                    item.Events.map((event, index) => {
                        return (
                            <div key={index}>
                                <Item extra={event.Id}>EventId</Item>
                                <Item extra={event.Count}>Count</Item>
                            </div>

                        )
                    })
                }
            </List>
        </div>
    )
}

export default createForm()(StatisticsMobile);