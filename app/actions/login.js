import http from './tools/http'
import config from '../config'

import { message } from 'antd'

const urls = {
    login: config.apiRoot + ":5000/gateway/auth/login"
}

export const login = (data) => (dispatch, getState) => {
    dispatch({
        type: "BEGIN_LOADING"
    })
    http.api(urls.login).post(data, { "Content-Type": "application/json" },(res)=>res.text())
        .then(res => {
            if (!res) {
                message.error('login fail!')
            }
            dispatch({
                type: "GET_LOGIN_STATUS_SUCCESS",
                payload: {
                    data: res,
                    is_login: true
                }
            })

            dispatch({
                type: "END_LOADING"
            })
        })
}