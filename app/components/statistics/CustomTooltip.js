import React from 'react';
import { render } from 'react-dom';


export default class CustomTooltip extends React.Component {
    render() {
        const {active} = this.props
        if (active) {
            const {payload, label} = this.props
            return (
                <div className="custom-tooltip">
                    <p style={{ fontWeight: '600', fontSize: '18px' }}>{label}</p>
                    <p><span>Total: </span><span>{payload[0].value}</span></p>
                    <EventsList items={payload[0].payload.Events}></EventsList>
                </div>
            )
        }
        return null
    }
}

const EventsList = ({items}) => {
    return (
        <div>
            {
                items.length > 0 ?
                    items.map(item => {
                        return (
                            <div className="stats_event_list_item" key={item.Id}>
                                <p><span style={{ marginRight: '4px', color: '#8884d8' }}>EventId:</span><span>{item.Id}</span></p>
                                <p><span style={{ marginRight: '14px', color: '#8884d8' }}>Count:</span><span>{item.Count}</span></p>
                            </div>
                        )
                    })
                    :
                    null
            }
        </div>
    )
}