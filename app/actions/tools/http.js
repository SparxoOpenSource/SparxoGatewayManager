import config from '../../config'
import format from 'string-format'



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
            headers: Object.assign({}, this._headers, headers),
            credentials: 'include'
        })
            .then(res => {
                return res.json()
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
            headers: Object.assign({}, this._headers, headers),
            credentials: 'include'
        })
            .then(res => {
                return res.json()
            })
    }

    post(data, headers) {
        return fetch(this.url, {
            method: 'POST',
            headers: Object.assign({}, this._headers, headers),
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(res => {
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