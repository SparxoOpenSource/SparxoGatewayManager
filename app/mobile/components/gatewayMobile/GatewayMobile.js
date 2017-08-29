import React from 'react'
import { render } from 'react-dom'
import { DatePicker, List, Accordion, Badge } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import GatewayDetailMobile from './GatewayDetailMobile'

const gmtNow = moment().utcOffset(0);
const now = moment().format("YYYY-M-D");

class Gateway extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        startValue: gmtNow,
        endValue: gmtNow,
        dateFormat: "YYYY-M-D",
    }

    selectDate = (field, date) => {
        this.setState({
            [field]: date
        }, () => {
            var url_param = {
                bTime: this.state.startValue.format(this.state.dateFormat),
                eTime: this.state.endValue.format(this.state.dateFormat)
            }
            this.props.getEvents(url_param)
        })

    }

    onStartChange = (value) => {
        this.selectDate('startValue', value);
    }

    onEndChange = (value) => {
        this.selectDate('endValue', value);
    }

    selectEvent = (key) => {
        //选择相同的的pannel时 会出现undefind
    }

    componentDidMount() {
        var url_param = {
            bTime: this.state.startValue.format(this.state.dateFormat),
            eTime: this.state.endValue.format(this.state.dateFormat)
        }
        this.props.getEvents(url_param)
    }


    render() {
        const { eventsIdList, eventDetails, is_loading, getEventDetail } = this.props
        const {startValue, endValue, dateFormat} = this.state
        return (
            <div>
                <List
                    className="date-picker-list"
                    style={{ backgroundColor: 'white' }}
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
                {
                    eventsIdList.length == 0 ?
                        <div style={{ textAlign: "center" }}>
                            <h1 style={{ marginTop: "3rem", color: "#ccc" }}>No Data</h1>
                        </div>
                        :
                        <div style={{
                            backgroundColor: "#fff",
                            padding: "40px 20px"
                        }}>
                            <div className="eventsList">
                                <h3 style={{ marginBottom: "40px" }}>Event List</h3>
                                <Accordion accordion onChange={this.selectEvent}>
                                    {
                                        eventsIdList.map(item => {
                                            return <Accordion.Panel header={item.eventId} key={item.eventId}>
                                                <GatewayDetailMobile start={startValue.format(dateFormat)}
                                                    end={endValue.format(dateFormat)}
                                                    eventId={item.eventId}
                                                    getEventDetail={getEventDetail}
                                                    isloading={is_loading}
                                                    eventDetail={eventDetails[item.eventId] || []}
                                                    record={item}></GatewayDetailMobile>
                                            </Accordion.Panel>
                                        })
                                    }
                                </Accordion>
                            </div>
                        </div>
                }
            </div>
        )
    }
}


export default createForm()(Gateway);


