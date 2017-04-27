import React from 'react'
import { render } from 'react-dom'
import GatewayCon from '../containers/gateway/GatewayCon'

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

export default class Gateway extends React.Component {
    render() {
        return (
            <div>
                <LocaleProvider locale={enUS}><GatewayCon></GatewayCon></LocaleProvider>
            </div>
        )
    }
}