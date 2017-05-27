import React from 'react'
import { render } from 'react-dom'
import GatewayMobileCon from '../containers/gatewayMobile/GatewayMobileCon'

import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

export default class Gateway extends React.Component {
    render() {
        return (
            <div>
                <LocaleProvider locale={enUS}><GatewayMobileCon></GatewayMobileCon></LocaleProvider>
            </div>
        )
    }
}