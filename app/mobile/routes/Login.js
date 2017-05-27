import React from 'react';
import {render} from "react-dom"

import LoginCon from '../containers/login/LoginCon'

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

export default class Login extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <LocaleProvider locale={enUS}><LoginCon></LoginCon></LocaleProvider>
        )
    }
}