let initialState = {
    is_loading: false
}

const loadingState = (state = initialState, action) => {
    switch (action.type) {
        case "BEGIN_LOADING":
            return {
                is_loading: true
            }

        case "END_LOADING":
            return {
                is_loading: false
            }

        default:
            return state
    }
}

export default loadingState