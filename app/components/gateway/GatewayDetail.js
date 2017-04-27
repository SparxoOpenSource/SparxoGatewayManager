import React from 'react'
import { render } from "react-dom"
import { Tabs, Pagination, Spin, Table, Button, Modal } from 'antd'


const TabPane = Tabs.TabPane


export default class GatewayDetail extends React.Component {
    state = {
        pageIndex: 1,
        code: 0,
        eventDetail: ""
    }
    constructor(props) {
        super(props)

    }

    loadData() {
        var pageSize = 5;
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
    selectCode = (key) => {
        this.setState({
            code: key,
            pageIndex: 1
        }, () => {
            this.loadData();
        })
    }

    pageChange = (pageNumber) => {
        this.setState({
            pageIndex: pageNumber
        }, () => {
            this.loadData()
        })

    }
    componentDidMount() {
        this.loadData()
    }

    openDetail(record, type) {

        if (type == 'PostData') {
            var myJSON = JSON.parse(record.PostData);
            Modal.info({
                title: 'PostData',
                content: (
                    <div className="detail_content">
                        <pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(myJSON) }}></pre>
                    </div>
                ),
                width: '80%',
                onOk() { },
            });
        }
        if (type == "ResponseContent") {
            try {
                var obj = eval('(' + record.ResponseContent + ')');
                var myJSON = JSON.parse(record.ResponseContent);
                Modal.info({
                    title: 'ResponseContent',
                    content: (
                        <div className="detail_content">
                            <pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(myJSON) }}></pre>
                        </div>
                    ),
                    width: '80%',
                    onOk() { },
                });
            }
            catch (e) {
                Modal.info({
                    title: 'ResponseContent',
                    content: (
                        <div className="detail_content">
                            <div dangerouslySetInnerHTML={{__html: record.ResponseContent}}></div>
                        </div>
                    ),
                    width: '80%',
                    onOk() { },
                });
            }
        }
    }

    render() {
        const {start, end, eventDetail, record, isloading} = this.props
        const {pageIndex} = this.state
        return (
            <div className="card-container">
                <Spin title="loading..." spinning={isloading}>
                    <Tabs type="card"
                        onChange={this.selectCode}>
                        <TabPane tab="In Service" key="0">
                            <Details items={eventDetail}
                                currentIndex={pageIndex}
                                total={record.inService}
                                onChange={this.selectCode}
                                pageChange={this.pageChange}
                                openDetail={this.openDetail}
                                ></Details>
                        </TabPane>
                        <TabPane tab="Success" key="200">
                            <Details items={eventDetail}
                                currentIndex={pageIndex}
                                total={record.success}
                                onChange={this.selectCode}
                                pageChange={this.pageChange}
                                openDetail={this.openDetail}
                                ></Details>
                        </TabPane>
                        <TabPane tab="Fail" key="500">
                            <Details items={eventDetail}
                                currentIndex={pageIndex}
                                total={record.fail}
                                onChange={this.selectCode}
                                pageChange={this.pageChange}
                                openDetail={this.openDetail}
                                ></Details>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        )
    }
}


const Details = ({items, total, pageChange, currentIndex, openDetail}) => {
    const columns = [
        {
            title: 'Id',
            dataIndex: "Id"
        },
        {
            title: 'EventId',
            dataIndex: 'EventId'
        },
        {
            title: 'ResponseCode',
            dataIndex: 'ResponseCode'
        },
        {
            title: 'Method',
            dataIndex: 'Method'
        },
        {
            title: 'CreateTime',
            dataIndex: 'CreateTimeUtc'
        },
        {
            title: 'ResponseTime',
            dataIndex: 'ResponseTimeUtc'
        },
        {
            title: 'PostData',
            render: (text, record, index) => {
                return (
                    <Button type="primary"
                        size="small"
                        onClick={() => openDetail(record, 'PostData')}>Detail</Button>
                )
            }
        },
        {
            title: 'ResponseContent',
            render: (text, record, index) => {
                return (
                    <Button type="primary"
                        size="small"
                        onClick={() => openDetail(record, 'ResponseContent')}>Detail</Button>
                )
            }
        },
        {
            title: 'Url',
            dataIndex: 'Url'
        }
    ]
    return (
        <div>
            {
                total == 0 ? <p>NO DATA</p>
                    :
                    <div className="evnets_detail_table">
                        <Table pagination={false}
                            columns={columns}
                            dataSource={items}
                            size="small"
                            style={{ marginBottom: '10px' }}
                            rowKey={record => record.Id}
                            bordered></Table>
                        < Pagination size='small'
                            total={total}
                            pageSize={5}
                            current={currentIndex}
                            onChange={pageChange}></Pagination>
                    </div>
            }
        </div>
    )
}





function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 4).replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;").replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;");
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;");
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}



const codeStyle = {
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: '6px',
    wordWrap: "break-word",
    fontSize: '12px'
}