import http from './tools/http'
import config from '../config'


const urls = {
    statistics: config.apiRoot + ":5000/gateway/queue/count_by_day"
}

const headers = { "content-type": "application/json" };

export const loadStat = (params) =>(dispatch, getState) =>{
    dispatch({
        type: "BEGIN_LOADING"
    })
    http.api(urls.statistics).get(params,{})
        .then(data=>{
            dispatch({
                type: "GET_STAT_SUCCESS",
                payload: {
                    data: data,
                    bTime: params.bTime,
                    eTime: params.eTime
                }
            })

            dispatch({
                type: "END_LOADING"
            })
        })
}