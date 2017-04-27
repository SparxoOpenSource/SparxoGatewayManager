import React from 'react'
import { render } from 'react-dom'
import StatisticsCon from '../containers/statistics/StatisticsCon'

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

export default class Statistics extends React.Component {
    render() {
        return (
            <div>
                <LocaleProvider locale={enUS}><StatisticsCon></StatisticsCon></LocaleProvider>
            </div>
        )
    }
}