import config from '../../config'
import format from 'string-format'
import { hashHistory } from 'react-router'



const httpRequestWrapper = (_fetch) => {
    return new Promise((reslove, reject) => {
        _fetch.then((data) => {
            if (data.success) {
                reslove(data.result, data);
            } else {
                reject(data);
            }

        }).catch(reject);

    });
}

class httpService {

    url;
    _headers;
    constructor(url) {
        this.url = url;
    }


    headers(headers) {
        this._headers = headers;
        return this;
    }

    get(query, headers) {
        let url = addUrlParam(this.url, query)
        return fetch(url, {
            headers: Object.assign({}, this._headers, headers)
            //credentials: 'include'
        })
            .then(res => {
                return res.json()
            })
            .catch(ex => {
                console.log('parsing failed', ex)
                hashHistory.push({
                    pathname: '/login'
                })
            })
    }

    put(data, headers) {
        return httpRequestWrapper(fetch(this.url, {
            method: 'PUT',
            headers: Object.assign({}, this._headers, headers),
            body: JSON.stringify(data)
        }).then(res => {
            return res.json()
        })
        );
    }

    put_nodata(headers) {
        return fetch(this.url, {
            method: 'PUT',
            headers: Object.assign({}, this._headers, headers)
            //credentials: 'include'
        })
            .then(res => {
                return res.json()
            })
    }

    post(data, headers, callbackfn) {
        return fetch(this.url, {
            method: 'POST',
            headers: Object.assign({}, this._headers, headers),
            body: JSON.stringify(data)
            //credentials: 'include'
        })
            .then(res => {
                if (callbackfn) {
                    return callbackfn(res);
                }
                return res.json()
            })
    }

    static api(url, ...params) {

        if (/^\//.test(url)) {
            url = url.replace(/^\//, '');
        }

        if (arguments.length == 2) {
            url = format(url, params)
        } else if (arguments.length == 3) {
            url = format(url, params[0], params[1])
        }

        return new httpService(url);

    }


}

export default httpService;

const addUrlParam = (url, obj) => {
    if (obj) {
        for (var i in obj) {
            url += (url.indexOf("?") == -1 ? "?" : "&");
            url += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
        }
    }

    return url;
}


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}