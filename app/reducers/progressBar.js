import NProgress from 'nprogress'
import '../less/Nprogress.css'

const progressBar = (state = NProgress, action) => {
    switch (action.type) {
        case "SHOW_PROGRESS":
            return state.start()
        case "HIDE_PROGRESS":
            return state.done()
        default:
            return state
    }
}

export default progressBar;