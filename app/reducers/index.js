import {combineReducers} from 'redux'
import progressBar from './progressBar'
import gateway from './gateway'
import loadingState from './loadingState'
import status from './status'
import statistics from './statistics'
import login from './login'

const reducer = combineReducers({
    progressBar,
    gateway,
    loadingState,
    status,
    statistics,
    login
})

export default reducer