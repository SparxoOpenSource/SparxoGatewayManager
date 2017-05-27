import React from 'react'
import { render } from 'react-dom'
import StatusMobileCon from '../containers/statusMobile/StatusMobileCon'

import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

export default class Gateway extends React.Component {
    render() {
        return (
            <div style={{height:"100%"}}>
                <LocaleProvider locale={enUS}><StatusMobileCon></StatusMobileCon></LocaleProvider>
            </div>
        )
    }
}