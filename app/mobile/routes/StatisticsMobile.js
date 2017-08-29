import React from 'react'
import { render } from 'react-dom'
import StatisticsMobileCon from '../containers/statisticsMobile/StatisticsMobileCon'

import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

export default class Gateway extends React.Component {
    render() {
        return (
            <div style={{ height: "100%", backgroundColor: "#fff" }}>
                <LocaleProvider locale={enUS}><StatisticsMobileCon></StatisticsMobileCon></LocaleProvider>
            </div>
        )
    }
}