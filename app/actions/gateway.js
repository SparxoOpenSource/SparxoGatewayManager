import http from './tools/http'
import config from '../config'

const urls = {
    gateway: config.apiRoot + ":5000/gateway/queue/progress",
    gateway_detail: config.apiRoot + ":5000/gateway/queue",
    gateway_status: config.apiRoot + ":5000/gateway/status",
    toggle_gateway_status: config.apiRoot + ":5000/gateway/status/online"
}

const headers = { "content-type": "application/json" };

export const getEvents = (params) => (dispatch, getState) => {
    dispatch({
        type: "SHOW_PROGRESS"
    })
    http.api(urls.gateway).get(params, {})
        .then(data => {
            dispatch({
                type: "GET_EVENTS_SUCCESS",
                payload: {
                    data: data
                }
            })

            dispatch({
                type: "HIDE_PROGRESS"
            })
        })
}

export const getEventDetail = (params) => (dispatch, getState) => {
    dispatch({
        type: "BEGIN_LOADING"
    })
    http.api(urls.gateway_detail).get(params, {})
        .then(data => {
            dispatch({
                type: "GET_EVENT_DETAIL_SUCCESS",
                payload: {
                    id: params.eventId,
                    data: data
                }
            })

            dispatch({
                type: "END_LOADING"
            })
        })
}

export const getGatewayStatus = () => (dispatch, getState) => {
    http.api(urls.gateway_status).get({}, {})
        .then(data => {
            dispatch({
                type: "GET_GATEWAY_STATUS_SUCCESS",
                payload: {
                    data: data
                }
            })
        })
}

export const toggleGatewayStatus = () => (dispatch, getState) => {
    http.api(urls.toggle_gateway_status).put_nodata({})
        .then(data => {
            dispatch({
                type: "TOGGLE_STATUS_SUCCESS"
            })
        })
}
