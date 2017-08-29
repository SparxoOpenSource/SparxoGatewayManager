import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, browserHistory, Redirect } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { browserPlatform } from './config'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers/index'
import './less/myless.less'
import './less/mobileLess.less'

import NavCon from './containers/NavCon'
import Gateway from './routes/Gateway'
import Status from './routes/Status'
import Statistics from './routes/Statistics'
import Login from './routes/Login'

import LoginMobile from './mobile/routes/Login'
import NavMobile from './mobile/components/Nav'
import GatewayMobile from './mobile/routes/GatewayMobile'
import PostDetailsCon from './mobile/containers/gatewayMobile/PostDetailsCon'
import StatusMobile from './mobile/routes/StatusMobile'
import StatisticsMobile from './mobile/routes/StatisticsMobile'


const middleware = [thunk]
if (process.env.NODE_ENV !== "development") {
    console.log(process.env.NODE_ENV)
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

const test = (ua, platform) => {
    ua = ua.toLowerCase();
    platform = (platform ? platform.toLowerCase() : '');

    // chrome is included in the edge UA, so need to check for edge first,
    // before checking if it's chrome.
    var UA = ua.match(/(edge)[\s\/:]([\w\d\.]+)/);
    if (!UA) {
        UA = ua.match(/(opera|ie|firefox|chrome|trident|crios|version)[\s\/:]([\w\d\.]+)?.*?(safari|(?:rv[\s\/:]|version[\s\/:])([\w\d\.]+)|$)/) || [null, 'unknown', 0];
    }

    if (UA[1] == 'trident') {
        UA[1] = 'ie';
        if (UA[4]) UA[2] = UA[4];
    } else if (UA[1] == 'crios') {
        UA[1] = 'chrome';
    }

    platform = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || ua.match(/mac|win|linux/) || ['other'])[0];
    if (platform == 'win') platform = 'windows';

    return {
        extend: Function.prototype.extend,
        name: (UA[1] == 'version') ? UA[3] : UA[1],
        version: parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]),
        platform: platform
    };
};

const Browser = test(navigator.userAgent, navigator.platform);

if (Browser.platform === "windows") {
    render((
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/login" component={Login}></Route>
                <Route path="/" component={Login}></Route>
                <Route path="/home" component={NavCon} onEnter={(nextState, replace, callback) => {
                    if (!sessionStorage.is_login) {
                        replace(`/`)
                    }
                    callback();
                } }>
                    <IndexRoute component={Gateway}></IndexRoute>
                    <Route path="/gateway" component={Gateway}></Route>
                    <Route path="/status" component={Status}></Route>
                    <Route path="/statistics" component={Statistics}></Route>
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('content'))
} else {
    render((
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/login" component={LoginMobile}></Route>
                <Route path="/" component={LoginMobile}></Route>
                <Route path="/home" component={NavMobile} onEnter={(nextState, replace, callback) => {
                    if (!sessionStorage.is_login) {
                        replace(`/`)
                    }
                    callback();
                }}>
                    <IndexRoute component={GatewayMobile}></IndexRoute>
                    <Route path="/gateway" component={GatewayMobile}></Route>
                    <Route path="/gateway/postData" component={PostDetailsCon}></Route>
                    <Route path="/gateway/responseContent" component={PostDetailsCon}></Route>
                    <Route path="/status" component={StatusMobile}></Route>
                    <Route path="/statistics" component={StatisticsMobile}></Route>
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('content'))
}



