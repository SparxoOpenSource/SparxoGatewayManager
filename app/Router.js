import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, browserHistory, Redirect } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers/index'
import './less/myless.less'

import NavCon from './containers/NavCon'
import Gateway from './routes/Gateway'
import Status from './routes/Status'
import Statistics from './routes/Statistics'
import Login from './routes/Login'



const middleware = [thunk]
if (process.env.NODE_ENV !== "development") {
    console.log(process.env.NODE_ENV)
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

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