import React from 'react'
import { render } from 'react-dom'
import { Tabs, List, Badge, Button, Pagination } from 'antd-mobile'
import { Link } from 'react-router'

const TabPane = Tabs.TabPane;
const Item = List.Item;

export default class GatewayDetailMobile extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        code: 0,
        pageIndex: 1
    }

    loadData() {
        var pageSize = 1;
        var url_params = {
            bTime: this.props.start,
            eTime: this.props.end,
            eventId: this.props.eventId,
            responseCode: this.state.code,
            offset: (this.state.pageIndex - 1) * pageSize,
            limit: pageSize
        }
        this.props.getEventDetail(url_params)
    }

    pageChange = (pageNumber) => {
        this.setState({
            pageIndex: pageNumber + 1
        }, () => {
            this.loadData()
        })
    }

    selectCode = (key) => {
        this.setState({
            code: key,
            pageIndex: 1
        }, () => {
            this.loadData();
        })
    }



    componentDidMount() {
        this.loadData()
    }


    render() {
        const {start, end, eventDetail, record, isloading} = this.props
        const {pageIndex} = this.state

        const inServiceTabText = <div><span style={{ marginRight: "10px" }}>In Servic</span><Badge text={record.inService || "0"}></Badge></div>
        const successTabText = <div><span style={{ marginRight: "10px" }}>Success</span><Badge text={record.success || "0"}></Badge></div>
        const failTabText = <div><span style={{ marginRight: "10px" }}>Fail</span><Badge text={record.fail || "0"}></Badge></div>
        return (
            <div>
                <Tabs defaultActiveKey="0"
                    onChange={this.selectCode}>
                    <TabPane tab={inServiceTabText} key="0">
                        <div >
                            <Details items={eventDetail}
                                total={record.inService}
                                pageChange={this.pageChange}
                                currentIndex={pageIndex}></Details>
                        </div>
                    </TabPane>
                    <TabPane tab={successTabText} key="200">
                        <div>
                            <Details items={eventDetail}
                                total={record.success}
                                pageChange={this.pageChange}
                                currentIndex={pageIndex}></Details>
                        </div>
                    </TabPane>
                    <TabPane tab={failTabText} key="500">
                        <div>
                            <Details items={eventDetail}
                                total={record.fail}
                                pageChange={this.pageChange}
                                currentIndex={pageIndex}></Details>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const Details = ({items, total, pageChange, currentIndex}) => {
    const locale = {
        prevText: 'Prev',
        nextText: 'Next',
    };
    return (
        <div>
            {
                items.length == 0 ?
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{ color: "#ccc" }}>No Data</h1>
                    </div>
                    :
                    <div>
                        {
                            items.map(item => {
                                return <DetailsList
                                    item={item}
                                    key={item.Id}></DetailsList>
                            })
                        }
                        <div style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                            <Pagination total={total}
                                current={currentIndex - 1}
                                locale={locale}
                                onChange={pageChange} />
                        </div>

                    </div>
            }
        </div>
    )
}

const DetailsList = ({item}) => {
    return (
        <div className="detailsList">
            <List>
                <Item extra={item.Id}>Id</Item>
                <Item extra={item.EventId}>EventId</Item>
                <Item extra={item.ResponseCode}>Code</Item>
                <Item extra={item.Method}>Method</Item>
                <Item extra={item.CreateTimeUtc}>CreatTime</Item>
                <Item extra={item.ResponseTimeUtc}>ResponseTime</Item>
                <Item extra={item.Url}>Url</Item>
                <Item><Link to="/gateway/postData">PostData</Link></Item>
                <Item><Link to="/gateway/responseContent">ResponseContent</Link></Item>
            </List>
        </div>
    )
}