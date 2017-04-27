import React from 'react'
import { render } from 'react-dom'
import StatusCon from '../containers/status/StatusCon'

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

export default class Status extends React.Component {
    render() {
        return (
            <div>
                <LocaleProvider locale={enUS}><StatusCon></StatusCon></LocaleProvider>
            </div>
        )
    }
}